import { withApiKey, services } from "orangeslice";
import type { CompanyLookupResult, TeamMember } from "@/types/company";
import {
  GAMERPLUG_CURATED,
  GAMERPLUG_TEAM,
  isGamerPlugQuery,
} from "./gamerplug-team";

interface EnrichedCompany {
  name?: string | null;
  slug?: string | null;
  domain?: string | null;
  description?: string | null;
  industry?: string | null;
  employee_count?: number | null;
  locality?: string | null;
  region?: string | null;
  country_code?: string | null;
  linkedin_url?: string | null;
  logo?: string | null;
}

export function normalizeCompanyQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

function formatLocation(
  enrich: EnrichedCompany | null,
  fallback?: string,
): string | undefined {
  if (!enrich?.locality && !enrich?.region) return fallback;
  if (
    enrich.locality &&
    enrich.region &&
    enrich.locality.includes(enrich.region)
  ) {
    return enrich.locality;
  }
  const joined = [enrich.locality, enrich.region].filter(Boolean).join(", ");
  return joined || fallback;
}

function scoreDecisionMaker(title: string | null | undefined): number {
  const normalized = (title ?? "").toLowerCase();
  if (/(ceo|chief executive|founder|co-founder|president|owner)/.test(normalized)) {
    return 92;
  }
  if (/(cvo|coo|cfo|cmo|cro|chief|vp|vice president|head of)/.test(normalized)) {
    return 72;
  }
  if (/(director|partner|principal)/.test(normalized)) {
    return 58;
  }
  if (/(engineer|developer|designer|manager)/.test(normalized)) {
    return 46;
  }
  return 38;
}

function mapApiEmployee(employee: {
  lp_formatted_name: string | null;
  lp_first_name: string | null;
  lp_last_name: string | null;
  lp_title: string | null;
  lp_public_profile_url: string | null;
}): TeamMember {
  const name =
    employee.lp_formatted_name ??
    [employee.lp_first_name, employee.lp_last_name].filter(Boolean).join(" ") ??
    "Unknown";

  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    role: employee.lp_title ?? "Team Member",
    photoUrl: "",
    decisionMakerLikelihood: scoreDecisionMaker(employee.lp_title),
    linkedinUrl: employee.lp_public_profile_url ?? undefined,
  };
}

async function enrichGamerPlug(apiKey: string): Promise<CompanyLookupResult> {
  return withApiKey(apiKey, async () => {
    const lookupDomain = "gamerplug.app";
    const linkedinUrl = "https://www.linkedin.com/company/gamer-plug";

    const [enrichResult, scrapeResult] = await Promise.all([
      services.company.linkedin
        .enrich({ domain: lookupDomain, extended: true })
        .catch(() => null),
      services.scrape.website({ url: `https://${lookupDomain}` }).catch(() => null),
    ]);
    const enrich = enrichResult as EnrichedCompany | null;

    let aiSummary: { summary?: string; tagline?: string } | null = null;
    const markdown =
      scrapeResult?.markdown ?? scrapeResult?.data?.[0]?.markdown ?? "";
    if (markdown) {
      try {
        const ai = await services.ai.generateObject({
          prompt: `Summarize what this company does in 2-3 sentences and provide a short tagline.

Company website markdown:
${markdown.slice(0, 4000)}`,
          schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              tagline: { type: "string" },
            },
            required: ["summary", "tagline"],
          },
        });
        aiSummary = ai.object as { summary?: string; tagline?: string };
      } catch {
        aiSummary = null;
      }
    }

    const location = formatLocation(enrich, GAMERPLUG_CURATED.location);

    return {
      company: {
        name: enrich?.name ?? GAMERPLUG_CURATED.name,
        domain: lookupDomain,
        description:
          aiSummary?.summary ??
          enrich?.description ??
          GAMERPLUG_CURATED.description,
        tagline: aiSummary?.tagline ?? GAMERPLUG_CURATED.tagline,
        employeeCount: enrich?.employee_count ?? null,
        location: location || GAMERPLUG_CURATED.location,
        linkedinUrl: enrich?.linkedin_url ?? linkedinUrl,
        logo: enrich?.logo ?? null,
      },
      team: GAMERPLUG_TEAM,
      source: "orangeslice",
    };
  });
}

async function genericCompanyLookup(
  apiKey: string,
  query: string,
): Promise<CompanyLookupResult> {
  return withApiKey(apiKey, async () => {
    const domain = normalizeCompanyQuery(query);
    let enrich = (await services.company.linkedin
      .enrich({ domain })
      .catch(() => null)) as EnrichedCompany | null;

    if (!enrich) {
      const linkedinUrl = await services.company.linkedin
        .findUrl({ companyName: query, website: domain })
        .catch(() => null);
      if (linkedinUrl) {
        enrich = (await services.company.linkedin
          .enrich({ url: linkedinUrl })
          .catch(() => null)) as EnrichedCompany | null;
      }
    }

    const linkedinUrl =
      enrich?.linkedin_url ??
      (enrich?.slug
        ? `https://www.linkedin.com/company/${enrich.slug}`
        : undefined);

    let team: TeamMember[] = [];
    if (linkedinUrl) {
      const employees = await services.company
        .getEmployeesFromLinkedin({ linkedinUrl, limit: 12 })
        .catch(() => ({ employees: [] }));
      team = employees.employees.map(mapApiEmployee);
    }

    const location = formatLocation(enrich);

    return {
      company: {
        name: enrich?.name ?? query,
        domain: enrich?.domain ?? domain,
        description:
          enrich?.description ??
          `Company profile resolved for ${query}. Select a team member to predict event intent.`,
        tagline: enrich?.industry ?? undefined,
        employeeCount: enrich?.employee_count ?? null,
        location: location || undefined,
        linkedinUrl,
        logo: enrich?.logo ?? null,
      },
      team,
      source: "orangeslice",
    };
  });
}

export async function lookupCompany(
  query: string,
  apiKey: string,
): Promise<CompanyLookupResult> {
  if (isGamerPlugQuery(query)) {
    return enrichGamerPlug(apiKey);
  }

  return genericCompanyLookup(apiKey, query);
}
