"use client";

import { Cpu, ArrowLeft } from "lucide-react";
import { InputForm } from "./InputForm";
import { PixelRetriever } from "./PixelRetriever";
import { BackgroundDecor } from "./BackgroundDecor";
import type { SocialInputs } from "@/types/profile";

interface IntentScanViewProps {
  inputs: SocialInputs;
  selectedName?: string;
  onChange: (field: keyof SocialInputs, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
}

export function IntentScanView({
  inputs,
  selectedName,
  onChange,
  onSubmit,
  onBack,
  disabled,
}: IntentScanViewProps) {
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
              Team
            </button>
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
                <Cpu className="h-3 w-3" />
                Neural Mock
              </span>
              <span className="flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 font-mono text-[10px] text-violet-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-20">
          <div className="mb-12 text-center animate-fade-up lg:mb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/80">
              // Step 3 · {selectedName ? `Scanning ${selectedName}` : "Initialize scan sequence"}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Predict Event Intent
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
              Feed social handles into the engine. Our puppy parses public graphs
              across LinkedIn, X, Luma &amp; Partiful — then surfaces attendance
              probability.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div
              className="flex flex-col items-center lg:w-[44%] animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="holo-stage animate-pulse-neon relative rounded-2xl px-10 py-10">
                <PixelRetriever variant="happy" size="lg" showPlatform />

                <div className="absolute -right-1 top-4 max-w-[150px] rounded-xl border border-cyan-400/20 bg-[#080c1c]/90 px-3 py-2 text-xs text-slate-300 shadow-lg backdrop-blur-md sm:-right-4">
                  <span className="font-mono text-[10px] text-cyan-400">
                    PUPPY.AI
                  </span>
                  <p className="mt-0.5 leading-snug">
                    Ready to fetch your event data! 🎾
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["@sarah_chen", "@marcus_rivera"].map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => onChange("twitter", hint)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    Try {hint}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full lg:w-[52%] animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <InputForm
                inputs={inputs}
                onChange={onChange}
                onSubmit={onSubmit}
                disabled={disabled}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
