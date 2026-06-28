import type { CompanyInfo, TeamMember } from "@/types/company";

export const GAMERPLUG_CURATED: CompanyInfo = {
  name: "GamerPlug",
  domain: "gamerplug.app",
  description:
    "GamerPlug is a gaming squad-matching platform that helps players find ideal teammates for ranked matches, tournaments, and competitive play — moving past anonymous lobbies toward meaningful, safe connections for gamers worldwide.",
  tagline: "No more randoms. Get your ideal player plugged in.",
  location: "Austin, Texas",
  linkedinUrl: "https://www.linkedin.com/company/gamer-plug",
};

export const GAMERPLUG_TEAM: TeamMember[] = [
  {
    id: "stephan-nicklow",
    name: "Stephan Nicklow",
    role: "CEO",
    photoUrl: "https://i.postimg.cc/LXh03L7V/Zoomed.jpg",
    decisionMakerLikelihood: 94,
    linkedinUrl: "https://www.linkedin.com/in/stephan-nicklow-1b456514/",
    twitterUrl: "https://x.com/StephanNicklow",
    prefillInputs: {
      linkedin: "https://www.linkedin.com/in/stephan-nicklow-1b456514/",
      twitter: "https://x.com/StephanNicklow",
    },
  },
  {
    id: "hunter-klehm",
    name: "Hunter Klehm",
    role: "CVO",
    photoUrl: "https://i.postimg.cc/gjn9PjXt/Hunter-Gaming.png",
    decisionMakerLikelihood: 76,
  },
  {
    id: "ion-petropoulos",
    name: "Ion Petropoulos",
    role: "Co-Founding Eng",
    photoUrl: "https://i.postimg.cc/wjT5NHns/1732530072107.jpg",
    decisionMakerLikelihood: 48,
    linkedinUrl: "https://www.linkedin.com/in/ionpetro",
  },
  {
    id: "abed-hamami",
    name: "Abed Hamami",
    role: "Co-Founding Eng",
    photoUrl:
      "https://ca.slack-edge.com/T0943EM1JGZ-U093AHUG8ET-8a471afb2c85-512",
    decisionMakerLikelihood: 52,
  },
];

export function isGamerPlugQuery(query: string): boolean {
  const normalized = query.trim().toLowerCase();
  return (
    normalized.includes("gamerplug") ||
    normalized.includes("gamer-plug") ||
    normalized.includes("gamer plug")
  );
}
