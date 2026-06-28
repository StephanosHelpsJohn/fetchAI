"use client";

import { Building2, Search, Sparkles } from "lucide-react";
import { PixelRetriever } from "./PixelRetriever";
import { BackgroundDecor } from "./BackgroundDecor";

interface CompanyLookupPageProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function CompanyLookupPage({
  query,
  onQueryChange,
  onSubmit,
  disabled,
  error,
}: CompanyLookupPageProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) onSubmit();
  };

  return (
    <>
      <BackgroundDecor />
      <div className="relative min-h-screen">
        <header className="relative z-10 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
            <PixelRetriever variant="happy" size="sm" />
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-white">
                Event Retriever
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
                Intent Engine v0.2
              </p>
            </div>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <span className="badge-neo flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                Orange Slice
              </span>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-4xl flex-col items-center justify-center px-6 py-16">
          <div className="w-full animate-fade-up text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/80">
              // Step 1 · Company resolution
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What company do you want to look up?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
              Enter a domain or company name. Our puppy will fetch team intel via
              Orange Slice — then you pick who to scan for event intent.
            </p>
          </div>

          <div
            className="mt-10 w-full max-w-xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="holo-stage relative mb-8 flex justify-center rounded-2xl px-8 py-8">
              <PixelRetriever variant="happy" size="lg" showPlatform />
            </div>

            <form
              onSubmit={handleSubmit}
              className="neo-card neo-card-glow relative overflow-hidden rounded-2xl p-7"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

              <label
                htmlFor="company-query"
                className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70"
              >
                <Building2 className="h-3.5 w-3.5" />
                Company domain
              </label>
              <input
                id="company-query"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Company's Website"
                disabled={disabled}
                className="neo-input w-full rounded-lg px-4 py-3.5 font-mono text-sm disabled:opacity-40"
              />

              {error && (
                <p className="mt-3 font-mono text-xs text-rose-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={disabled || !query.trim()}
                className="btn-neo font-display mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Search className="h-4 w-4" />
                Fetch Company Intel
              </button>
            </form>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => onQueryChange("Gamerplug.com")}
                disabled={disabled}
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 font-mono text-xs text-cyan-300 transition hover:bg-cyan-400/20 disabled:opacity-40"
              >
                Try Gamerplug.com
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
