export interface SpeakingEvent {
  event: string;
  date: string;
  role: string;
  topic?: string;
  location?: string;
  url?: string;
}

export interface Registration {
  event: string;
  date: string;
  status: string;
  location: string;
  url?: string;
}

export interface AttendedEvent {
  event: string;
  date: string;
  location: string;
  role: "Attendee" | "Speaker" | "Panelist" | "Host" | "Organizer" | "VIP";
  source: "Luma" | "Partiful" | "LinkedIn" | "Meetup" | "X";
  verified: boolean;
  url?: string;
}

export interface TalkingPoint {
  topic: string;
  source: "Instagram" | "X" | "LinkedIn";
  snippet: string;
  passion_score: number;
}

export interface SocialProfile {
  platform: "LinkedIn" | "Instagram" | "X" | "Luma" | "Partiful";
  handle: string;
  url: string;
}

export interface Profile {
  full_name: string;
  current_role: string;
  company: string;
  primary_city: string;
  city_confidence: string;
  profile_photo?: string;
  attended_events: AttendedEvent[];
  past_speaking_events: SpeakingEvent[];
  upcoming_speaking_events: SpeakingEvent[];
  confirmed_registrations: Registration[];
  /** Registered events within the next 90 days */
  upcoming_registrations: Registration[];
  talking_points: TalkingPoint[];
  social_profiles: SocialProfile[];
  matched_handles?: string[];
  attendance_propensity?: number;
  graph_stats?: {
    total_nodes: number;
    social_edges: number;
    event_edges: number;
    data_sources: number;
  };
}

export interface SocialInputs {
  linkedin: string;
  instagram: string;
  twitter: string;
  luma: string;
  partiful: string;
}
