export interface SpeakingEvent {
  event: string;
  date: string;
  role: string;
  topic?: string;
  location?: string;
}

export interface Registration {
  event: string;
  date: string;
  status: string;
  location: string;
}

export interface Profile {
  full_name: string;
  current_role: string;
  company: string;
  primary_city: string;
  city_confidence: string;
  past_speaking_events: SpeakingEvent[];
  upcoming_speaking_events: SpeakingEvent[];
  confirmed_registrations: Registration[];
  matched_handles?: string[];
  attendance_propensity?: number;
}

export interface SocialInputs {
  linkedin: string;
  instagram: string;
  twitter: string;
  luma: string;
  partiful: string;
}
