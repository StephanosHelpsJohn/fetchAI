import type { SocialInputs } from "./profile";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  decisionMakerLikelihood: number;
  linkedinUrl?: string;
  twitterUrl?: string;
  prefillInputs?: Partial<SocialInputs>;
}

export interface CompanyInfo {
  name: string;
  domain: string;
  description: string;
  tagline?: string;
  employeeCount?: number | null;
  location?: string;
  linkedinUrl?: string;
  logo?: string | null;
}

export interface CompanyLookupResult {
  company: CompanyInfo;
  team: TeamMember[];
  source: "orangeslice" | "curated";
}
