"use client";

import { useEffect, useState } from "react";
import { FetchLoadingScene } from "./FetchLoadingScene";
import { LOADING_STEPS, LOADING_DURATION_MS } from "@/lib/mock-data";

interface LoadingOverlayProps {
  active: boolean;
  onComplete: () => void;
}

const STEP_MS = LOADING_DURATION_MS / LOADING_STEPS.length;

export function LoadingOverlay({ active, onComplete }: LoadingOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setStepIndex(0);
      setProgress(0);
      return;
    }

    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / LOADING_DURATION_MS) * 100);
      setProgress(pct);
      setStepIndex(
        Math.min(LOADING_STEPS.length - 1, Math.floor(elapsed / STEP_MS)),
      );

      if (elapsed >= LOADING_DURATION_MS) {
        clearInterval(tick);
        onComplete();
      }
    }, 50);

    return () => clearInterval(tick);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050510]/90 backdrop-blur-xl">
      <div className="neo-card neo-card-glow mx-4 w-full max-w-lg animate-fade-in rounded-2xl px-8 py-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">
          // Fetch sequence active · {LOADING_DURATION_MS / 1000}s window
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/10 bg-[#080c1c] px-3 py-4">
          <FetchLoadingScene durationSec={LOADING_DURATION_MS / 1000} />
        </div>

        <h3 className="font-display mt-5 text-xl font-bold text-white">
          Puppy on retrieval duty
        </h3>

        <p
          key={stepIndex}
          className="mt-2 min-h-[2rem] animate-fade-in font-mono text-xs leading-relaxed text-slate-400"
        >
          {LOADING_STEPS[stepIndex]}
        </p>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 animate-shimmer-bg bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" />
          </div>
        </div>

        <p className="mt-3 font-mono text-[10px] text-slate-600">
          SYNC {Math.round(progress)}% · BUILDING IDENTITY GRAPH
        </p>
      </div>
    </div>
  );
}
