import type { Profile, SocialInputs } from "@/types/profile";

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
    ],
    matched_handles: [
      "@stephan_example",
      "linkedin.com/in/stephan-example",
    ],
    full_name: "Stephan Nicklow",
    current_role: "CEO & Founder",
    company: "GamerPlug",
    primary_city: "Austin, Texas",
    city_confidence:
      "96% (Based on recurring geo-tagged posts and local business filings)",
    attendance_propensity: 94,
    past_speaking_events: [
      {
        event: "SXSW Gaming Panel",
        date: "March 2025",
        role: "Panelist",
        topic: "The Future of Esports Infrastructure",
      },
      {
        event: "Austin Tech Mixer",
        date: "January 2026",
        role: "Keynote",
        topic: "Scaling Webhook Architectures",
      },
    ],
    upcoming_speaking_events: [
      {
        event: "GDC (Game Developers Conference)",
        date: "March 2027",
        role: "Featured Speaker",
        location: "San Francisco, CA",
      },
    ],
    confirmed_registrations: [
      {
        event: "Databricks Data + AI Summit",
        date: "June 2026",
        status:
          "Registered (Ticket Verified via Public Luma Attendee Graph)",
        location: "San Diego, CA",
      },
      {
        event: "Austin Flag Football Charity Tournament",
        date: "July 2026",
        status: "Host / Organizer (Partiful Event)",
        location: "Austin, TX",
      },
    ],
  },
  {
    triggers: [
      "sarah-chen",
      "sarahchen",
      "sarah_chen",
      "sarahchenvc",
    ],
    matched_handles: [
      "@sarah_chen",
      "linkedin.com/in/sarah-chen",
      "lu.ma/sarahchen",
    ],
    full_name: "Sarah Chen",
    current_role: "Partner",
    company: "Horizon Ventures",
    primary_city: "San Francisco, CA",
    city_confidence:
      "91% (Cross-referenced Luma check-ins and LinkedIn location history)",
    attendance_propensity: 88,
    past_speaking_events: [
      {
        event: "TechCrunch Disrupt",
        date: "September 2025",
        role: "Fireside Chat",
        topic: "AI-Native Consumer Apps",
      },
      {
        event: "SaaStr Annual",
        date: "May 2025",
        role: "Panelist",
        topic: "Series B Growth in a Tight Market",
      },
    ],
    upcoming_speaking_events: [
      {
        event: "Web Summit",
        date: "November 2026",
        role: "Keynote",
        location: "Lisbon, Portugal",
      },
    ],
    confirmed_registrations: [
      {
        event: "YC Demo Day (W26 Batch)",
        date: "March 2026",
        status: "Confirmed Attendee (Luma RSVP)",
        location: "San Francisco, CA",
      },
      {
        event: "Founders Running Club — SF",
        date: "April 2026",
        status: "Recurring Host (Partiful)",
        location: "San Francisco, CA",
      },
    ],
  },
  {
    triggers: [
      "marcus-rivera",
      "marcusrivera",
      "marcus_rivera",
      "mrivera",
    ],
    matched_handles: [
      "@marcus_rivera",
      "partiful.com/@marcusrivera",
    ],
    full_name: "Marcus Rivera",
    current_role: "Head of Community",
    company: "EventStack",
    primary_city: "Brooklyn, NY",
    city_confidence:
      "89% (Inferred from Partiful event history and X geo-tags)",
    attendance_propensity: 91,
    past_speaking_events: [
      {
        event: "Community-Led Growth Summit",
        date: "October 2025",
        role: "Workshop Lead",
        topic: "Building IRL Event Flywheels",
      },
    ],
    upcoming_speaking_events: [
      {
        event: "CMX Summit",
        date: "August 2026",
        role: "Featured Speaker",
        location: "New York, NY",
      },
    ],
    confirmed_registrations: [
      {
        event: "NYC Product Mixer",
        date: "May 2026",
        status: "Co-Organizer (Partiful Verified)",
        location: "Brooklyn, NY",
      },
      {
        event: "Stripe Sessions",
        date: "June 2026",
        status: "Registered (Public Luma Graph)",
        location: "San Francisco, CA",
      },
    ],
  },
];

const FALLBACK_PROFILE: Omit<Profile, "matched_handles"> = {
  full_name: "Demo User",
  current_role: "VP of Engineering",
  company: "TechCorp",
  primary_city: "San Francisco, CA",
  city_confidence: "82% (Inferred from X check-ins)",
  attendance_propensity: 67,
  past_speaking_events: [
    {
      event: "Local Tech Meetup",
      date: "2025",
      role: "Speaker",
      topic: "AI Automation",
    },
  ],
  upcoming_speaking_events: [],
  confirmed_registrations: [
    {
      event: "TechCrunch Disrupt",
      date: "2026",
      status: "Highly Probable (Public RSVP)",
      location: "San Francisco, CA",
    },
  ],
};

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

  const matched = [
    inputs.linkedin && normalize(inputs.linkedin),
    inputs.instagram && `@${extractHandle(inputs.instagram)}`,
    inputs.twitter && `@${extractHandle(inputs.twitter)}`,
    inputs.luma && normalize(inputs.luma),
    inputs.partiful && normalize(inputs.partiful),
  ].filter(Boolean) as string[];

  return {
    ...FALLBACK_PROFILE,
    full_name: displayName || FALLBACK_PROFILE.full_name,
    matched_handles: matched.length > 0 ? matched : ["@demo_user"],
    attendance_propensity: 55 + (handle.length % 35),
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

export const LOADING_STEPS = [
  "Sniffing public social graphs...",
  "Following the scent to Luma & Partiful schemas...",
  "Retrieved: Building the identity graph...",
  "Tallying attendance propensity score...",
] as const;
