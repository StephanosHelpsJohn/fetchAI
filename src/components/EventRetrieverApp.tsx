"use client";

import { useCallback, useState } from "react";
import { InputForm } from "./InputForm";
import { LoadingOverlay } from "./LoadingOverlay";
import { Dashboard } from "./Dashboard";
import { PixelRetriever } from "./PixelRetriever";
import { resolveProfile } from "@/lib/mock-data";
import type { Profile, SocialInputs } from "@/types/profile";

const EMPTY_INPUTS: SocialInputs = {
  linkedin: "",
  instagram: "",
  twitter: "",
  luma: "",
  partiful: "",
};

export function EventRetrieverApp() {
  const [inputs, setInputs] = useState<SocialInputs>(EMPTY_INPUTS);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleChange = (field: keyof SocialInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    setProfile(resolveProfile(inputs));
  }, [inputs]);

  const handleReset = () => {
    setProfile(null);
    setInputs(EMPTY_INPUTS);
  };

  if (profile) {
    return <Dashboard profile={profile} onReset={handleReset} />;
  }

  return (
    <>
      <LoadingOverlay active={loading} onComplete={handleLoadingComplete} />

      <div className="min-h-screen bg-cream">
        <header className="border-b border-sky-100 bg-white/60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
            <PixelRetriever variant="idle" size="sm" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Event Retriever
              </h1>
              <p className="text-xs text-slate-500">
                Sniff out event intent from social footprints
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:py-20">
          <div className="flex flex-col items-center lg:sticky lg:top-12">
            <PixelRetriever variant="idle" size="lg" />
            <p className="mt-4 max-w-xs text-center text-sm text-slate-500">
              Meet your SNES-style detective pup — ready to follow the digital
              scent trail to your next event.
            </p>
          </div>

          <InputForm
            inputs={inputs}
            onChange={handleChange}
            onSubmit={handleSubmit}
            disabled={loading}
          />
        </main>
      </div>
    </>
  );
}
