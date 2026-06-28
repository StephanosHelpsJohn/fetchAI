import type { AttendedEvent, Profile, Registration, SocialInputs, SocialProfile, TalkingPoint } from "@/types/profile";

export const STEPHANOS_DEMO_INPUTS: SocialInputs = {
  linkedin: "https://www.linkedin.com/in/stephan-nicklow-1b456514/",
  instagram: "https://www.instagram.com/stephanosesesdanceparty",
  twitter: "https://x.com/StephanNicklow",
  luma: "https://luma.com/user/usr-xDDCbEsyFadXbvA",
  partiful: "https://partiful.com/u/BY6jc77W4fWMPODSXszoZrV4Lq83",
};

const STEPHANOS_SOCIAL_PROFILES: SocialProfile[] = [
  {
    platform: "LinkedIn",
    handle: "stephan-nicklow-1b456514",
    url: "https://www.linkedin.com/in/stephan-nicklow-1b456514/",
  },
  {
    platform: "Instagram",
    handle: "@stephanosesesdanceparty",
    url: "https://www.instagram.com/stephanosesesdanceparty",
  },
  {
    platform: "X",
    handle: "@StephanNicklow",
    url: "https://x.com/StephanNicklow",
  },
  {
    platform: "Luma",
    handle: "usr-xDDCbEsyFadXbvA",
    url: "https://luma.com/user/usr-xDDCbEsyFadXbvA",
  },
  {
    platform: "Partiful",
    handle: "BY6jc77W4fWMPODSXszoZrV4Lq83",
    url: "https://partiful.com/u/BY6jc77W4fWMPODSXszoZrV4Lq83",
  },
];

const EVENT_POOL: Omit<AttendedEvent, "date">[] = [
  { event: "SXSW Interactive", location: "Austin, TX", role: "Panelist", source: "Luma", verified: true },
  { event: "SXSW Gaming Expo", location: "Austin, TX", role: "Attendee", source: "Luma", verified: true },
  { event: "TechCrunch Disrupt", location: "San Francisco, CA", role: "Speaker", source: "Luma", verified: true },
  { event: "YC Demo Day W24", location: "San Francisco, CA", role: "VIP", source: "Luma", verified: true },
  { event: "YC Demo Day S24", location: "San Francisco, CA", role: "Attendee", source: "Luma", verified: true },
  { event: "SaaStr Annual", location: "San Francisco, CA", role: "Panelist", source: "LinkedIn", verified: true },
  { event: "GDC Main Pass", location: "San Francisco, CA", role: "Attendee", source: "Luma", verified: true },
  { event: "GDC Developer Summit", location: "San Francisco, CA", role: "Speaker", source: "Luma", verified: true },
  { event: "AWS re:Invent", location: "Las Vegas, NV", role: "Attendee", source: "Luma", verified: true },
  { event: "Stripe Sessions", location: "San Francisco, CA", role: "Attendee", source: "Luma", verified: true },
  { event: "Databricks Data + AI Summit", location: "San Francisco, CA", role: "Attendee", source: "Luma", verified: true },
  { event: "NeurIPS Conference", location: "Vancouver, BC", role: "Attendee", source: "Meetup", verified: false },
  { event: "OpenAI DevDay", location: "San Francisco, CA", role: "VIP", source: "Luma", verified: true },
  { event: "Austin Tech Meetup", location: "Austin, TX", role: "Speaker", source: "Meetup", verified: true },
  { event: "Capital Factory Demo Day", location: "Austin, TX", role: "Attendee", source: "Partiful", verified: true },
  { event: "Founders Running Club", location: "Austin, TX", role: "Host", source: "Partiful", verified: true },
  { event: "Angel Squad Dinner", location: "Austin, TX", role: "Attendee", source: "Partiful", verified: true },
  { event: "Product Hunt Ship Party", location: "San Francisco, CA", role: "Attendee", source: "X", verified: false },
  { event: "Latino Startup Founders Mixer", location: "Austin, TX", role: "Organizer", source: "Partiful", verified: true },
  { event: "Web Summit", location: "Lisbon, Portugal", role: "Attendee", source: "Luma", verified: true },
  { event: "Slush Conference", location: "Helsinki, Finland", role: "Attendee", source: "LinkedIn", verified: true },
  { event: "Collision Conference", location: "Toronto, ON", role: "Panelist", source: "Luma", verified: true },
  { event: "GamesBeat Summit", location: "Los Angeles, CA", role: "Speaker", source: "Luma", verified: true },
  { event: "PAX West", location: "Seattle, WA", role: "Attendee", source: "Meetup", verified: true },
  { event: "E3 Industry Pass", location: "Los Angeles, CA", role: "Attendee", source: "LinkedIn", verified: false },
  { event: "DevOps Days Austin", location: "Austin, TX", role: "Speaker", source: "Meetup", verified: true },
  { event: "KubeCon NA", location: "Chicago, IL", role: "Attendee", source: "Luma", verified: true },
  { event: "MicroConf Starter", location: "Las Vegas, NV", role: "Attendee", source: "Luma", verified: true },
  { event: "Indie Hackers Retreat", location: "Mexico City, MX", role: "Attendee", source: "Partiful", verified: true },
  { event: "Startup Grind Global", location: "Redwood City, CA", role: "Panelist", source: "LinkedIn", verified: true },
  { event: "LA Tech Week Opening", location: "Los Angeles, CA", role: "Attendee", source: "Luma", verified: true },
  { event: "NYC Fintech Week", location: "New York, NY", role: "Attendee", source: "Luma", verified: true },
  { event: "Boston AI Summit", location: "Boston, MA", role: "Speaker", source: "Meetup", verified: true },
  { event: "Seattle Startup Week", location: "Seattle, WA", role: "Attendee", source: "Partiful", verified: true },
  { event: "Denver Startup Week", location: "Denver, CO", role: "Attendee", source: "Meetup", verified: true },
  { event: "Miami Tech Happy Hour", location: "Miami, FL", role: "Attendee", source: "Partiful", verified: false },
  { event: "Chicago Product Con", location: "Chicago, IL", role: "Panelist", source: "Luma", verified: true },
  { event: "Portland Indie Game Showcase", location: "Portland, OR", role: "Attendee", source: "Meetup", verified: true },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildAttendedTimeline(count = 32): AttendedEvent[] {
  return EVENT_POOL.slice(0, count).map((evt, i) => {
    const year = 2022 + Math.floor(i / 6);
    const month = MONTHS[i % 12];
    return {
      ...evt,
      date: `${month} ${year}`,
    };
  });
}

const STEPHAN_ATTENDED = buildAttendedTimeline(34);

const STEPHANOS_TALKING_POINTS: TalkingPoint[] = [
  {
    topic: "Making ice cream with his shirt off",
    source: "Instagram",
    snippet:
      "Recurring IG Stories & posts — homemade ice cream runs, often shirtless in the Austin heat. High engagement on every batch reveal.",
    passion_score: 97,
  },
  {
    topic: "Loves his team at GamerPlug",
    source: "LinkedIn",
    snippet:
      "Frequent LinkedIn shout-outs celebrating the GamerPlug crew — product launches, team wins, and 'couldn't do it without this squad' posts.",
    passion_score: 99,
  },
  {
    topic: "Playing flag football",
    source: "X",
    snippet:
      "X timeline heavy on flag football — league updates, trash talk, charity tournament promos. Co-organizes Austin Flag Football Charity Tournament.",
    passion_score: 94,
  },
  {
    topic: "Loves his dog, Hugh-Burt",
    source: "Instagram",
    snippet:
      "Hugh-Burt appears across Instagram feed & Stories — park days, couch hangs, and 'office morale officer' captions. Consistent top-performing content.",
    passion_score: 100,
  },
];

const FUTURE_CODE_FRONTIER_URL =
  "https://luma.com/FutureCodeFrontier?tk=NVdfRE";

const UPCOMING_90_DAYS: Registration[] = [
  {
    event: "Future Code: Rewriting the Developer Frontier",
    date: "July 2026",
    status: "Registered (Luma Ticket Verified)",
    location: "GitHub HQ, San Francisco, CA",
    url: FUTURE_CODE_FRONTIER_URL,
  },
  {
    event: "Austin Startup Crawl",
    date: "August 9, 2026",
    status: "RSVP Confirmed (Partiful)",
    location: "Austin, TX",
  },
];

interface GoldenProfile extends Profile {
  triggers: string[];
}

const GOLDEN_PROFILES: GoldenProfile[] = [
  {
    triggers: [
      "stephan-example",
      "stephan_example",
      "stephannicklow",
      "stephan-nicklow",
      "stephan-nicklow-1b456514",
      "stephanos",
      "stephanoshelpsjohn",
      "stephanosesesdanceparty",
      "stephannicklow",
      "usr-xddcbesyfadxbva",
      "by6jc77w4fwmpodsxszozr4lq83",
    ],
    social_profiles: STEPHANOS_SOCIAL_PROFILES,
    matched_handles: STEPHANOS_SOCIAL_PROFILES.map((p) => p.handle),
    full_name: "Stephanos Nicklow",
    profile_photo: "/profiles/stephanos.jpeg",
    current_role: "CEO & Founder",
    company: "GamerPlug",
    primary_city: "Austin, Texas",
    city_confidence:
      "96% (Based on recurring geo-tagged posts and local business filings)",
    attendance_propensity: 94,
    graph_stats: {
      total_nodes: 847,
      social_edges: 312,
      event_edges: 534,
      data_sources: 5,
    },
    attended_events: STEPHAN_ATTENDED,
    past_speaking_events: [
      { event: "SXSW Gaming Panel", date: "March 2025", role: "Panelist", topic: "The Future of Esports Infrastructure" },
      { event: "Austin Tech Mixer", date: "January 2026", role: "Keynote", topic: "Scaling Webhook Architectures" },
      { event: "GamesBeat Summit", date: "May 2024", role: "Speaker", topic: "Indie Game Distribution at Scale" },
      { event: "GDC Developer Summit", date: "March 2024", role: "Panelist", topic: "Live Ops for Mid-Size Studios" },
      { event: "DevOps Days Austin", date: "November 2023", role: "Speaker", topic: "Webhook-First Architectures" },
    ],
    upcoming_speaking_events: [
      { event: "GDC (Game Developers Conference)", date: "March 2027", role: "Featured Speaker", location: "San Francisco, CA" },
    ],
    upcoming_registrations: UPCOMING_90_DAYS,
    talking_points: STEPHANOS_TALKING_POINTS,
    confirmed_registrations: [
      ...UPCOMING_90_DAYS,
      {
        event: "Databricks Data + AI Summit",
        date: "June 2026",
        status: "Registered (Ticket Verified via Public Luma Attendee Graph)",
        location: "San Diego, CA",
      },
      {
        event: "Austin Flag Football Charity Tournament",
        date: "July 2026",
        status: "Host / Organizer (Partiful Event)",
        location: "Austin, TX",
      },
      {
        event: "Stripe Sessions",
        date: "September 2026",
        status: "Registered (Public Luma Graph)",
        location: "San Francisco, CA",
      },
    ],
  },
  {
    triggers: ["sarah-chen", "sarahchen", "sarah_chen", "sarahchenvc"],
    matched_handles: ["@sarah_chen", "linkedin.com/in/sarah-chen", "lu.ma/sarahchen"],
    social_profiles: [
      { platform: "LinkedIn", handle: "sarah-chen", url: "https://linkedin.com/in/sarah-chen" },
      { platform: "Instagram", handle: "@sarah_chen", url: "https://instagram.com/sarah_chen" },
      { platform: "X", handle: "@sarah_chen", url: "https://x.com/sarah_chen" },
      { platform: "Luma", handle: "sarahchen", url: "https://lu.ma/sarahchen" },
    ],
    full_name: "Sarah Chen",
    current_role: "Partner",
    company: "Horizon Ventures",
    primary_city: "San Francisco, CA",
    city_confidence: "91% (Cross-referenced Luma check-ins and LinkedIn location history)",
    attendance_propensity: 88,
    graph_stats: { total_nodes: 1204, social_edges: 489, event_edges: 715, data_sources: 5 },
    attended_events: buildAttendedTimeline(33).map((e, i) =>
      i % 5 === 0 ? { ...e, role: "Speaker" as const } : e,
    ),
    past_speaking_events: [
      { event: "TechCrunch Disrupt", date: "September 2025", role: "Fireside Chat", topic: "AI-Native Consumer Apps" },
      { event: "SaaStr Annual", date: "May 2025", role: "Panelist", topic: "Series B Growth in a Tight Market" },
      { event: "Web Summit", date: "November 2024", role: "Keynote", topic: "Venture in the AI Era" },
    ],
    upcoming_speaking_events: [
      { event: "Web Summit", date: "November 2026", role: "Keynote", location: "Lisbon, Portugal" },
    ],
    upcoming_registrations: [
      { event: "YC Demo Day (W26 Batch)", date: "July 12, 2026", status: "Confirmed Attendee (Luma RSVP)", location: "San Francisco, CA" },
      { event: "Founders Running Club — SF", date: "August 3, 2026", status: "Recurring Host (Partiful)", location: "San Francisco, CA" },
    ],
    confirmed_registrations: [
      { event: "YC Demo Day (W26 Batch)", date: "July 12, 2026", status: "Confirmed Attendee (Luma RSVP)", location: "San Francisco, CA" },
      { event: "Founders Running Club — SF", date: "August 3, 2026", status: "Recurring Host (Partiful)", location: "San Francisco, CA" },
      { event: "Sequoia Arc Orientation", date: "October 2026", status: "Invite-Only (Verified)", location: "Menlo Park, CA" },
    ],
    talking_points: [
      { topic: "AI-native consumer investing", source: "LinkedIn", snippet: "Regular thesis posts on AI-first apps and consumer behavior shifts.", passion_score: 92 },
      { topic: "Founder mentorship", source: "X", snippet: "Threads advising early-stage founders on fundraising narrative and GTM.", passion_score: 88 },
      { topic: "Running & founder wellness", source: "Instagram", snippet: "Founders Running Club content — pre-dawn runs, race recaps, team bonding.", passion_score: 85 },
    ],
  },
  {
    triggers: ["marcus-rivera", "marcusrivera", "marcus_rivera", "mrivera"],
    matched_handles: ["@marcus_rivera", "partiful.com/@marcusrivera"],
    social_profiles: [
      { platform: "LinkedIn", handle: "marcus-rivera", url: "https://linkedin.com/in/marcus-rivera" },
      { platform: "X", handle: "@marcus_rivera", url: "https://x.com/marcus_rivera" },
      { platform: "Partiful", handle: "@marcusrivera", url: "https://partiful.com/@marcusrivera" },
      { platform: "Luma", handle: "marcusrivera", url: "https://lu.ma/marcusrivera" },
    ],
    full_name: "Marcus Rivera",
    current_role: "Head of Community",
    company: "EventStack",
    primary_city: "Brooklyn, NY",
    city_confidence: "89% (Inferred from Partiful event history and X geo-tags)",
    attendance_propensity: 91,
    graph_stats: { total_nodes: 623, social_edges: 278, event_edges: 345, data_sources: 4 },
    attended_events: buildAttendedTimeline(31).map((e, i) =>
      i % 4 === 0 ? { ...e, role: "Organizer" as const, source: "Partiful" as const } : e,
    ),
    past_speaking_events: [
      { event: "Community-Led Growth Summit", date: "October 2025", role: "Workshop Lead", topic: "Building IRL Event Flywheels" },
      { event: "CMX Summit", date: "June 2024", role: "Speaker", topic: "Scaling Community Events" },
    ],
    upcoming_speaking_events: [
      { event: "CMX Summit", date: "August 2026", role: "Featured Speaker", location: "New York, NY" },
    ],
    upcoming_registrations: [
      { event: "NYC Product Mixer", date: "July 24, 2026", status: "Co-Organizer (Partiful Verified)", location: "Brooklyn, NY" },
      { event: "Stripe Sessions", date: "August 28, 2026", status: "Registered (Public Luma Graph)", location: "San Francisco, CA" },
    ],
    confirmed_registrations: [
      { event: "NYC Product Mixer", date: "July 24, 2026", status: "Co-Organizer (Partiful Verified)", location: "Brooklyn, NY" },
      { event: "Stripe Sessions", date: "August 28, 2026", status: "Registered (Public Luma Graph)", location: "San Francisco, CA" },
      { event: "Brooklyn Tech Week Closing", date: "November 2026", status: "Host (Partiful)", location: "Brooklyn, NY" },
    ],
    talking_points: [
      { topic: "IRL community building", source: "LinkedIn", snippet: "LinkedIn articles on event-led growth and community flywheels.", passion_score: 96 },
      { topic: "Brooklyn tech scene", source: "X", snippet: "Hyper-local X engagement — promoting BK meetups and founder dinners.", passion_score: 90 },
      { topic: "Event ops & Partiful", source: "Instagram", snippet: "Behind-the-scenes IG Reels from events he organizes.", passion_score: 87 },
    ],
  },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/^@/, "")
    .replace(/https?:\/\//, "")
    .replace(/^www\./, "");
}

function extractHandle(value: string): string {
  const normalized = normalize(value);
  const segments = normalized.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? normalized;
}

function collectInputTokens(inputs: SocialInputs): string[] {
  const raw = [
    inputs.linkedin,
    inputs.instagram,
    inputs.twitter,
    inputs.luma,
    inputs.partiful,
  ]
    .map(normalize)
    .filter(Boolean);

  const tokens = new Set<string>();
  for (const value of raw) {
    tokens.add(value);
    tokens.add(extractHandle(value));
    tokens.add(value.replace(/[^a-z0-9_-]/g, ""));
  }
  return [...tokens];
}

function matchesProfile(tokens: string[], triggers: string[]): boolean {
  return triggers.some((trigger) =>
    tokens.some(
      (token) =>
        token.includes(trigger) ||
        trigger.includes(token) ||
        token.replace(/[-_]/g, "") === trigger.replace(/[-_]/g, ""),
    ),
  );
}

function buildSocialProfilesFromInputs(inputs: SocialInputs): SocialProfile[] {
  const profiles: SocialProfile[] = [];
  if (inputs.linkedin.trim()) {
    profiles.push({
      platform: "LinkedIn",
      handle: extractHandle(inputs.linkedin),
      url: inputs.linkedin.startsWith("http") ? inputs.linkedin : `https://linkedin.com/in/${extractHandle(inputs.linkedin)}`,
    });
  }
  if (inputs.instagram.trim()) {
    const handle = extractHandle(inputs.instagram);
    profiles.push({
      platform: "Instagram",
      handle: handle.startsWith("@") ? handle : `@${handle}`,
      url: inputs.instagram.startsWith("http") ? inputs.instagram : `https://instagram.com/${handle}`,
    });
  }
  if (inputs.twitter.trim()) {
    const handle = extractHandle(inputs.twitter);
    profiles.push({
      platform: "X",
      handle: handle.startsWith("@") ? handle : `@${handle}`,
      url: inputs.twitter.startsWith("http") ? inputs.twitter : `https://x.com/${handle}`,
    });
  }
  if (inputs.luma.trim()) {
    profiles.push({
      platform: "Luma",
      handle: extractHandle(inputs.luma),
      url: inputs.luma.startsWith("http") ? inputs.luma : `https://lu.ma/${extractHandle(inputs.luma)}`,
    });
  }
  if (inputs.partiful.trim()) {
    profiles.push({
      platform: "Partiful",
      handle: extractHandle(inputs.partiful),
      url: inputs.partiful.startsWith("http") ? inputs.partiful : `https://partiful.com/u/${extractHandle(inputs.partiful)}`,
    });
  }
  return profiles;
}

function generateFallbackProfile(inputs: SocialInputs): Profile {
  const handle =
    extractHandle(inputs.twitter) ||
    extractHandle(inputs.instagram) ||
    extractHandle(inputs.linkedin) ||
    extractHandle(inputs.luma) ||
    extractHandle(inputs.partiful) ||
    "unknown";

  const displayName = handle
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const social_profiles = buildSocialProfilesFromInputs(inputs);

  const matched = social_profiles.length > 0
    ? social_profiles.map((p) => p.handle)
    : ["@demo_user"];

  const attended = buildAttendedTimeline(30 + (handle.length % 5));

  return {
    full_name: displayName || "Demo User",
    current_role: "VP of Engineering",
    company: "TechCorp",
    primary_city: "San Francisco, CA",
    city_confidence: "82% (Inferred from X check-ins)",
    attendance_propensity: 55 + (handle.length % 35),
    graph_stats: {
      total_nodes: 412 + handle.length * 3,
      social_edges: 156 + handle.length,
      event_edges: 256 + handle.length * 2,
      data_sources: matched.length || 1,
    },
    attended_events: attended,
    past_speaking_events: [
      { event: "Local Tech Meetup", date: "March 2025", role: "Speaker", topic: "AI Automation" },
      { event: "Bay Area DevOps Day", date: "October 2024", role: "Panelist", topic: "Platform Engineering" },
    ],
    upcoming_speaking_events: [],
    upcoming_registrations: [
      { event: "SF AI Builders Meetup", date: "July 22, 2026", status: "RSVP Confirmed (Luma)", location: "San Francisco, CA" },
      { event: "Tech Happy Hour", date: "August 14, 2026", status: "Registered (Partiful)", location: "San Francisco, CA" },
    ],
    confirmed_registrations: [
      { event: "SF AI Builders Meetup", date: "July 22, 2026", status: "RSVP Confirmed (Luma)", location: "San Francisco, CA" },
      { event: "Tech Happy Hour", date: "August 14, 2026", status: "Registered (Partiful)", location: "San Francisco, CA" },
      { event: "TechCrunch Disrupt", date: "September 2026", status: "Highly Probable (Public RSVP)", location: "San Francisco, CA" },
    ],
    matched_handles: matched,
    social_profiles,
    talking_points: [
      {
        topic: "Engineering leadership",
        source: "LinkedIn",
        snippet: "Posts about scaling teams, architecture decisions, and hiring.",
        passion_score: 78,
      },
      {
        topic: "AI & automation",
        source: "X",
        snippet: "Threads on LLM tooling, dev productivity, and workflow automation.",
        passion_score: 82,
      },
      {
        topic: "Bay Area tech scene",
        source: "Instagram",
        snippet: "Meetup photos, conference stories, and founder hangout recaps.",
        passion_score: 71,
      },
    ],
  };
}

export function resolveProfile(inputs: SocialInputs): Profile {
  const tokens = collectInputTokens(inputs);

  for (const golden of GOLDEN_PROFILES) {
    if (matchesProfile(tokens, golden.triggers)) {
      const { triggers: _, ...profile } = golden;
      return profile;
    }
  }

  return generateFallbackProfile(inputs);
}

export const LOADING_DURATION_MS = 7000;

export const LOADING_STEPS = [
  "Initializing neural fetch protocol...",
  "Sniffing public social graphs across 5 sources...",
  "Ball's in the air! Scraping Luma & Partiful schemas...",
  "Cross-referencing LinkedIn & X activity nodes...",
  "Good catch! Stitching 30+ event attendance edges...",
  "Building identity graph — resolving co-attendance clusters...",
  "Extracting passion signals from Instagram, X & LinkedIn...",
  "Scanning next 90 days for confirmed registrations...",
  "Fetching back attendance propensity score...",
] as const;
