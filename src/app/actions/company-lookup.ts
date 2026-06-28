"use server";

import packageJson from "../../../package.json";
import { lookupCompany } from "@/lib/company-lookup";
import {
  GAMERPLUG_LOOKUP_RESULT,
  isGamerPlugQuery,
} from "@/lib/gamerplug-team";
import type { CompanyLookupResult } from "@/types/company";

function getApiKey(): string | undefined {
  return (
    process.env.ORANGESLICE_API_KEY ??
    (packageJson as { orangesliceApiKey?: string }).orangesliceApiKey
  );
}

export async function lookupCompanyAction(
  query: string,
): Promise<CompanyLookupResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Company query is required.");
  }

  if (isGamerPlugQuery(trimmed)) {
    try {
      const apiKey = getApiKey();
      if (apiKey) {
        return await lookupCompany(trimmed, apiKey);
      }
    } catch {
      // Orange Slice unavailable — fall back to curated GamerPlug data
    }
    return GAMERPLUG_LOOKUP_RESULT;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Orange Slice API key is not configured.");
  }

  return lookupCompany(trimmed, apiKey);
}
