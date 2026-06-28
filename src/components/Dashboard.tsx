"use client";

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
} from "lucide-react";
import { PixelRetriever } from "./PixelRetriever";
import type { Profile } from "@/types/profile";

interface DashboardProps {
  profile: Profile;
  onReset: () => void;
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
    </div>
  );
}

function EventCard({
  title,
  date,
  subtitle,
  badge,
}: {
  title: string;
  date: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-slate-800">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{date}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          )}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

export function Dashboard({ profile, onReset }: DashboardProps) {
  const propensity = profile.attendance_propensity ?? 72;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sky-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <PixelRetriever variant="idle" size="sm" />
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Event Retriever
              </h1>
              <p className="text-xs text-slate-500">Intent Engine Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            New Search
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Identity hero */}
        <div className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-orange-500">
                Identity Graph Retrieved
              </p>
              <h2 className="mt-1 text-3xl font-bold text-slate-800">
                {profile.full_name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-sky-500" />
                  {profile.current_role}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-sky-500" />
                  {profile.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-500" />
                  {profile.primary_city}
                </span>
              </div>
              {profile.matched_handles && profile.matched_handles.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link2 className="h-3.5 w-3.5 text-slate-400" />
                  {profile.matched_handles.map((handle) => (
                    <span
                      key={handle}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                    >
                      {handle}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-sky-50 to-orange-50 p-6 md:min-w-[180px]">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <p className="mt-2 text-xs font-medium uppercase text-slate-500">
                Attendance Propensity
              </p>
              <p className="text-4xl font-bold text-orange-500">{propensity}%</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-orange-400"
                  style={{ width: `${propensity}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-sky-50 px-4 py-3">
            <p className="text-xs font-medium text-sky-700">
              City Confidence
            </p>
            <p className="mt-0.5 text-sm text-slate-700">
              {profile.city_confidence}
            </p>
          </div>
        </div>

        {/* Event sections */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section>
            <SectionHeader
              icon={<Mic2 className="h-4 w-4 text-purple-500" />}
              title="Past Speaking Events"
            />
            <div className="space-y-3">
              {profile.past_speaking_events.length > 0 ? (
                profile.past_speaking_events.map((evt) => (
                  <EventCard
                    key={`${evt.event}-${evt.date}`}
                    title={evt.event}
                    date={evt.date}
                    subtitle={evt.topic ? `${evt.role} · ${evt.topic}` : evt.role}
                    badge={evt.role}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-400">No past events found.</p>
              )}
            </div>
          </section>

          <section>
            <SectionHeader
              icon={<CalendarCheck className="h-4 w-4 text-green-500" />}
              title="Upcoming Speaking"
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
                  />
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No upcoming speaking gigs detected.
                </p>
              )}
            </div>
          </section>

          <section>
            <SectionHeader
              icon={<Ticket className="h-4 w-4 text-orange-500" />}
              title="Confirmed Registrations"
            />
            <div className="space-y-3">
              {profile.confirmed_registrations.map((reg) => (
                <EventCard
                  key={`${reg.event}-${reg.date}`}
                  title={reg.event}
                  date={reg.date}
                  subtitle={reg.location}
                  badge={reg.status.split("(")[0].trim()}
                />
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-10 flex items-center justify-center gap-2 pb-8 text-xs text-slate-400">
          <PixelRetriever variant="idle" size="sm" />
          <span>
            Powered by Event Retriever · Mock data for demo purposes
          </span>
        </footer>
      </main>
    </div>
  );
}
