"use client";

import {
  ArrowLeft,
  Building2,
  ExternalLink,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import type { CompanyLookupResult, TeamMember } from "@/types/company";
import { BackgroundDecor } from "./BackgroundDecor";
import { PixelRetriever } from "./PixelRetriever";

interface CompanyTeamViewProps {
  result: CompanyLookupResult;
  onSelectMember: (member: TeamMember) => void;
  onBack: () => void;
}

function likelihoodColor(score: number): string {
  if (score >= 80) return "text-emerald-300 border-emerald-400/40 bg-emerald-400/10";
  if (score >= 60) return "text-cyan-300 border-cyan-400/40 bg-cyan-400/10";
  return "text-violet-300 border-violet-400/40 bg-violet-400/10";
}

function TeamMemberCard({
  member,
  onSelect,
}: {
  member: TeamMember;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="neo-card group w-full rounded-2xl p-4 text-left transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 ring-2 ring-cyan-400/20">
          {member.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photoUrl}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-lg text-slate-500">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-white group-hover:text-cyan-100">
            {member.name}
          </p>
          <p className="mt-0.5 text-sm text-slate-400">{member.role}</p>
          <div
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${likelihoodColor(member.decisionMakerLikelihood)}`}
          >
            <Target className="h-3 w-3" />
            {member.decisionMakerLikelihood}% decision maker
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-slate-600 group-hover:text-cyan-400/80">
        Click to predict event intent →
      </p>
    </button>
  );
}

export function CompanyTeamView({
  result,
  onSelectMember,
  onBack,
}: CompanyTeamViewProps) {
  const { company, team, source } = result;

  return (
    <>
      <BackgroundDecor />
      <div className="relative min-h-screen">
        <header className="relative z-10 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <PixelRetriever variant="happy" size="sm" />
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-white">
                {company.name}
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
                Team intelligence · {source === "orangeslice" ? "Orange Slice" : "Curated"}
              </p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-6 py-10">
          <div className="neo-card neo-card-glow mb-8 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {company.logo && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {company.name}
                  </h2>
                  {company.linkedinUrl && (
                    <a
                      href={company.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 font-mono text-[10px] text-blue-300 transition hover:border-blue-400/50"
                    >
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {company.tagline && (
                  <p className="mt-2 font-mono text-sm text-cyan-300/90">
                    {company.tagline}
                  </p>
                )}

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {company.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 font-mono text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-violet-400" />
                    {company.domain}
                  </span>
                  {company.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      {company.location}
                    </span>
                  )}
                  {company.employeeCount != null && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-emerald-400" />
                      {company.employeeCount} employees (LinkedIn)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
                // Step 2 · Select a contact
              </p>
              <h3 className="font-display mt-1 text-xl font-semibold text-white">
                Who should we scan for event intent?
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-500">
              {team.length} team members
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {team.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onSelect={() => onSelectMember(member)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
