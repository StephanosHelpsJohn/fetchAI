export const COMPANY_LOADING_DURATION_MS = 7000;

export const COMPANY_LOADING_STEPS = [
  "Initializing company domain resolution...",
  "Querying Orange Slice B2B graph for firmographics...",
  "Sniffing out LinkedIn company nodes and headcount...",
  "Scraping product signals from gamerplug.app...",
  "Mapping leadership roster and founding team...",
  "Scoring decision-maker likelihood per role...",
  "Ball retrieved! Packaging team intelligence...",
  "Syncing company narrative with enrichment data...",
  "Ready to surface target contacts.",
] as const;
