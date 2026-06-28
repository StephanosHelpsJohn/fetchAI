"use client";

import { useEffect, useState } from "react";
import { PixelRetriever } from "./PixelRetriever";
import { LOADING_STEPS } from "@/lib/mock-data";

interface LoadingOverlayProps {
  active: boolean;
  onComplete: () => void;
}

const DURATION_MS = 3000;
const STEP_MS = DURATION_MS / LOADING_STEPS.length;

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
      const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(pct);
      setStepIndex(Math.min(LOADING_STEPS.length - 1, Math.floor(elapsed / STEP_MS)));

      if (elapsed >= DURATION_MS) {
        clearInterval(tick);
        onComplete();
      }
    }, 50);

    return () => clearInterval(tick);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream/95 backdrop-blur-sm">
      <div className="flex max-w-lg flex-col items-center px-6 text-center">
        <PixelRetriever variant="sniffing" size="lg" />

        <h3 className="mt-6 text-lg font-semibold text-slate-800">
          Hot on the trail…
        </h3>

        <p
          key={stepIndex}
          className="mt-3 min-h-[1.5rem] animate-fade-in text-sm text-slate-600"
        >
          {LOADING_STEPS[stepIndex]}
        </p>

        <div className="mt-6 h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-sky-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-orange-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-400">
          {Math.round(progress)}% retrieved
        </p>
      </div>
    </div>
  );
}
