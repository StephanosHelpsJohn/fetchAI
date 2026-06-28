"use client";

import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Building2,
  Mic2,
  CalendarCheck,
  Ticket,
  ArrowLeft,
  TrendingUp,
  Link2,
  Activity,
  Network,
  Calendar,
  CheckCircle2,
  History,
  MessageCircle,
  Camera,
  AtSign,
  ExternalLink,
} from "lucide-react";
import { PixelRetriever } from "./PixelRetriever";
import { BackgroundDecor } from "./BackgroundDecor";
import type { Profile, SocialProfile, TalkingPoint } from "@/types/profile";

interface DashboardProps {
  profile: Profile;
  onReset: () => void;
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center">
      <p className="font-display text-lg font-bold text-cyan-300">{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  count,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${accent}`}
        >
          {icon}
        </span>
        <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400">
          {title}
        </h3>
      </div>
      {count !== undefined && (
        <span className="font-mono text-[10px] text-slate-600">{count} records</span>
      )}
    </div>
  );
}

function EventCard({
  title,
  date,
  subtitle,
  badge,
  glow,
  highlight,
  url,
}: {
  title: string;
  date: string;
  subtitle?: string;
  badge?: string;
  glow: string;
  highlight?: boolean;
  url?: string;
}) {
  const className = `group neo-card relative block overflow-hidden rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05] ${
    highlight ? "border-cyan-400/30 bg-cyan-400/5 ring-1 ring-cyan-400/20" : ""
  } ${url ? "cursor-pointer hover:ring-1 hover:ring-cyan-400/30" : ""}`;

  const inner = (
    <>
      <div className={`absolute left-0 top-0 h-full w-0.5 ${glow} opacity-80`} />
      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="min-w-0">
          <p className="font-medium text-slate-200 group-hover:text-cyan-200 transition-colors">
            {title}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-slate-500">{date}</p>
          {subtitle && (
            <p className="mt-1.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}
          {url && (
            <p className="mt-2 flex items-center gap-1 font-mono text-[10px] text-cyan-400/70 opacity-0 transition-opacity group-hover:opacity-100">
              <ExternalLink className="h-3 w-3" />
              Open event page
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {badge && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
              {badge}
            </span>
          )}
          {url && (
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400/50 group-hover:text-cyan-400" />
          )}
        </div>
      </div>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function SocialProfileLink({ profile }: { profile: SocialProfile }) {
  const platformStyles: Record<SocialProfile["platform"], string> = {
    LinkedIn: "border-blue-500/30 bg-blue-500/10 text-blue-300 hover:border-blue-400/50",
    Instagram: "border-pink-500/30 bg-pink-500/10 text-pink-300 hover:border-pink-400/50",
    X: "border-sky-500/30 bg-sky-500/10 text-sky-300 hover:border-sky-400/50",
    Luma: "border-violet-500/30 bg-violet-500/10 text-violet-300 hover:border-violet-400/50",
    Partiful: "border-orange-500/30 bg-orange-500/10 text-orange-300 hover:border-orange-400/50",
  };

  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-2 rounded-lg border px-3 py-2 transition ${platformStyles[profile.platform]}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
        {profile.platform}
      </span>
      <span className="min-w-0 truncate text-xs font-medium">{profile.handle}</span>
      <ExternalLink className="ml-auto h-3 w-3 shrink-0 opacity-50 group-hover:opacity-100" />
    </a>
  );
}

function SourceIcon({ source }: { source: TalkingPoint["source"] }) {
  if (source === "Instagram") return <Camera className="h-3 w-3 text-pink-400" />;
  if (source === "X") return <AtSign className="h-3 w-3 text-sky-400" />;
  return <Briefcase className="h-3 w-3 text-blue-400" />;
}

function TalkingPointCard({ point }: { point: TalkingPoint }) {
  return (
    <div className="neo-card rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5">
              <SourceIcon source={point.source} />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
              {point.source}
            </span>
          </div>
          <p className="mt-2 font-medium text-slate-200">{point.topic}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            {point.snippet}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-lg font-bold text-amber-400/90">
            {point.passion_score}
          </p>
          <p className="font-mono text-[8px] uppercase text-slate-600">passion</p>
        </div>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500/80 to-orange-400/80"
          style={{ width: `${point.passion_score}%` }}
        />
      </div>
    </div>
  );
}

function AttendedRow({
  event,
  date,
  location,
  role,
  source,
  verified,
  url,
}: {
  event: string;
  date: string;
  location: string;
  role: string;
  source: string;
  verified: boolean;
  url?: string;
}) {
  const row = (
    <>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium ${url ? "text-cyan-300 group-hover:text-cyan-200" : "text-slate-300"}`}>
          {event}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-slate-600">
          {date} · {location}
        </p>
      </div>
      <span className="shrink-0 rounded border border-violet-500/20 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] text-violet-300">
        {role}
      </span>
      <span className="shrink-0 font-mono text-[9px] text-slate-600">{source}</span>
      {verified && (
        <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" aria-label="Verified" />
      )}
      {url && (
        <ExternalLink className="h-3 w-3 shrink-0 text-cyan-400/60 group-hover:text-cyan-400" />
      )}
    </>
  );

  const className =
    "group flex items-center gap-3 border-b border-white/5 px-3 py-2.5 text-xs transition hover:bg-white/[0.03] last:border-0";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} cursor-pointer`}
      >
        {row}
      </a>
    );
  }

  return <div className={className}>{row}</div>;
}

export function Dashboard({ profile, onReset }: DashboardProps) {
  const propensity = profile.attendance_propensity ?? 72;
  const stats = profile.graph_stats ?? {
    total_nodes: profile.attended_events.length * 12,
    social_edges: 200,
    event_edges: profile.attended_events.length * 8,
    data_sources: 5,
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundDecor />

      <header className="relative z-10 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <PixelRetriever variant="happy" size="sm" />
            <div>
              <h1 className="font-display text-lg font-bold text-white">
                Event Retriever
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60">
                Identity Graph Terminal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="btn-ghost flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            New Scan
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        {/* Identity hero */}
        <div className="neo-card neo-card-glow animate-fade-up overflow-hidden rounded-2xl p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-start">
              {profile.profile_photo && (
                <div className="relative mx-auto shrink-0 sm:mx-0">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-400/50 to-violet-500/50 blur-md" />
                  <Image
                    src={profile.profile_photo}
                    alt={profile.full_name}
                    width={224}
                    height={224}
                    className="relative h-44 w-44 rounded-3xl border-2 border-white/10 object-cover object-top sm:h-52 sm:w-52 lg:h-56 lg:w-56"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                <Activity className="h-3 w-3" />
                Identity Graph Resolved
              </p>
              <h2 className="font-display mt-2 text-4xl font-bold text-white">
                {profile.full_name}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: <Briefcase className="h-3.5 w-3.5" />, text: profile.current_role },
                  { icon: <Building2 className="h-3.5 w-3.5" />, text: profile.company },
                  { icon: <MapPin className="h-3.5 w-3.5" />, text: profile.primary_city },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                  >
                    <span className="text-cyan-400">{icon}</span>
                    {text}
                  </span>
                ))}
              </div>
              {profile.social_profiles.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    <Link2 className="h-3 w-3" />
                    Connected Profiles
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {profile.social_profiles.map((sp) => (
                      <SocialProfileLink key={sp.platform} profile={sp} />
                    ))}
                  </div>
                </div>
              )}
              </div>
            </div>

            <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/80 to-violet-950/80 p-6 lg:min-w-[210px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.15),transparent_60%)]" />
              <TrendingUp className="relative h-5 w-5 text-cyan-400" />
              <p className="relative mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                Attendance Propensity
              </p>
              <p className="font-display relative text-5xl font-bold text-neon">
                {propensity}%
              </p>
              <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-700"
                  style={{ width: `${propensity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Graph stats */}
          <div className="mt-6 rounded-xl border border-violet-400/10 bg-violet-400/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Network className="h-4 w-4 text-violet-400" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-violet-300/80">
                Graph Topology
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <StatPill label="Total Nodes" value={stats.total_nodes} />
              <StatPill label="Social Edges" value={stats.social_edges} />
              <StatPill label="Event Edges" value={stats.event_edges} />
              <StatPill label="Data Sources" value={stats.data_sources} />
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70">
              City Confidence
            </p>
            <p className="mt-1 text-sm text-slate-300">{profile.city_confidence}</p>
          </div>
        </div>

        {/* Next 90 days — prominent */}
        <section className="mt-8 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <SectionHeader
            icon={<Calendar className="h-3.5 w-3.5 text-cyan-400" />}
            title="Registered — Next 90 Days"
            count={profile.upcoming_registrations.length}
            accent="border-cyan-500/40 bg-cyan-500/15"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.upcoming_registrations.map((reg) => (
              <EventCard
                key={`upcoming-${reg.event}`}
                title={reg.event}
                date={reg.date}
                subtitle={reg.location}
                badge={reg.status.split("(")[0].trim()}
                glow="bg-cyan-400"
                highlight
                url={reg.url}
              />
            ))}
          </div>
        </section>

        {/* Talking points — social passion signals */}
        <section className="mt-8 animate-fade-up" style={{ animationDelay: "0.08s" }}>
          <SectionHeader
            icon={<MessageCircle className="h-3.5 w-3.5 text-amber-400" />}
            title="Talking Points"
            count={profile.talking_points.length}
            accent="border-amber-500/30 bg-amber-500/10"
          />
          <p className="mb-4 font-mono text-[10px] text-slate-600">
            Passion signals extracted from Instagram, X &amp; LinkedIn activity
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.talking_points.map((point) => (
              <TalkingPointCard key={point.topic} point={point} />
            ))}
          </div>
        </section>

        {/* Attended events — full identity graph */}
        <section className="mt-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <SectionHeader
            icon={<History className="h-3.5 w-3.5 text-violet-400" />}
            title="Event Attendance History"
            count={profile.attended_events.length}
            accent="border-violet-500/30 bg-violet-500/10"
          />
          <div className="neo-card overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <p className="font-mono text-[10px] text-slate-500">
                Chronological feed · verified sources marked
              </p>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                {profile.attended_events.filter((e) => e.verified).length} verified
              </span>
            </div>
            <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
              {profile.attended_events.map((evt, i) => (
                <AttendedRow key={`${evt.event}-${evt.date}-${i}`} {...evt} />
              ))}
            </div>
          </div>
        </section>

        {/* Speaking + all registrations */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <SectionHeader
              icon={<Mic2 className="h-3.5 w-3.5 text-violet-400" />}
              title="Past Speaking"
              count={profile.past_speaking_events.length}
              accent="border-violet-500/30 bg-violet-500/10"
            />
            <div className="space-y-3">
              {profile.past_speaking_events.map((evt) => (
                <EventCard
                  key={`${evt.event}-${evt.date}`}
                  title={evt.event}
                  date={evt.date}
                  subtitle={evt.topic ? `${evt.role} · ${evt.topic}` : evt.role}
                  badge={evt.role}
                  glow="bg-violet-400"
                  url={evt.url}
                />
              ))}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <SectionHeader
              icon={<CalendarCheck className="h-3.5 w-3.5 text-emerald-400" />}
              title="Upcoming Speaking"
              count={profile.upcoming_speaking_events.length}
              accent="border-emerald-500/30 bg-emerald-500/10"
            />
            <div className="space-y-3">
              {profile.upcoming_speaking_events.length > 0 ? (
                profile.upcoming_speaking_events.map((evt) => (
                  <EventCard
                    key={`${evt.event}-${evt.date}`}
                    title={evt.event}
                    date={evt.date}
                    subtitle={evt.location}
                    badge={evt.role}
                    glow="bg-emerald-400"
                    url={evt.url}
                  />
                ))
              ) : (
                <p className="text-xs text-slate-600">None detected.</p>
              )}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <SectionHeader
              icon={<Ticket className="h-3.5 w-3.5 text-amber-400" />}
              title="All Registrations"
              count={profile.confirmed_registrations.length}
              accent="border-amber-500/30 bg-amber-500/10"
            />
            <div className="space-y-3">
              {profile.confirmed_registrations.map((reg) => (
                <EventCard
                  key={`${reg.event}-${reg.date}`}
                  title={reg.event}
                  date={reg.date}
                  subtitle={reg.location}
                  badge={reg.status.split("(")[0].trim()}
                  glow="bg-amber-400"
                  url={reg.url}
                />
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-12 flex items-center justify-center gap-3 pb-8 font-mono text-[10px] text-slate-600">
          <PixelRetriever variant="happy" size="sm" />
          <span>
            Event Retriever · {profile.attended_events.length} event nodes mapped
          </span>
        </footer>
      </main>
    </div>
  );
}
