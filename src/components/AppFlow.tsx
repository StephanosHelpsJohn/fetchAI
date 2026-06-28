"use client";

import { useCallback, useRef, useState } from "react";
import { CompanyLookupPage } from "./CompanyLookupPage";
import { CompanyTeamView } from "./CompanyTeamView";
import { IntentScanView } from "./IntentScanView";
import { LoadingOverlay } from "./LoadingOverlay";
import { Dashboard } from "./Dashboard";
import { resolveProfile } from "@/lib/mock-data";
import {
  COMPANY_LOADING_DURATION_MS,
  COMPANY_LOADING_STEPS,
} from "@/lib/company-loading";
import { LOADING_DURATION_MS, LOADING_STEPS } from "@/lib/mock-data";
import type { CompanyLookupResult, TeamMember } from "@/types/company";
import type { Profile, SocialInputs } from "@/types/profile";

const EMPTY_INPUTS: SocialInputs = {
  linkedin: "",
  instagram: "",
  twitter: "",
  luma: "",
  partiful: "",
};

type AppStep = "company" | "team" | "intent" | "dashboard";
type LoadingMode = "company" | "intent" | null;

export function AppFlow() {
  const [step, setStep] = useState<AppStep>("company");
  const [companyQuery, setCompanyQuery] = useState("");
  const [companyResult, setCompanyResult] = useState<CompanyLookupResult | null>(
    null,
  );
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inputs, setInputs] = useState<SocialInputs>(EMPTY_INPUTS);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingMode, setLoadingMode] = useState<LoadingMode>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const pendingCompanyResult = useRef<CompanyLookupResult | null>(null);
  const loadingFinished = useRef(false);
  const apiFinished = useRef(false);

  const tryAdvanceFromCompanyLoading = useCallback(() => {
    if (!loadingFinished.current || !apiFinished.current) return;

    setLoadingMode(null);

    if (pendingCompanyResult.current) {
      setCompanyResult(pendingCompanyResult.current);
      setStep("team");
      setLookupError(null);
    }
  }, []);

  const handleCompanySubmit = async () => {
    const query = companyQuery.trim();
    if (!query) return;

    setLookupError(null);
    setLoadingMode("company");
    loadingFinished.current = false;
    apiFinished.current = false;
    pendingCompanyResult.current = null;

    try {
      const response = await fetch("/api/company-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Company lookup failed.");
      }

      pendingCompanyResult.current = data as CompanyLookupResult;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Company lookup failed.";
      setLookupError(message);
      pendingCompanyResult.current = null;
    } finally {
      apiFinished.current = true;
      tryAdvanceFromCompanyLoading();
    }
  };

  const handleCompanyLoadingComplete = useCallback(() => {
    loadingFinished.current = true;
    tryAdvanceFromCompanyLoading();
  }, [tryAdvanceFromCompanyLoading]);

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    setInputs({
      ...EMPTY_INPUTS,
      linkedin: member.prefillInputs?.linkedin ?? "",
      twitter: member.prefillInputs?.twitter ?? "",
      instagram: member.prefillInputs?.instagram ?? "",
      luma: member.prefillInputs?.luma ?? "",
      partiful: member.prefillInputs?.partiful ?? "",
    });
    setStep("intent");
  };

  const handleChange = (field: keyof SocialInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleIntentSubmit = () => {
    setLoadingMode("intent");
  };

  const handleIntentLoadingComplete = useCallback(() => {
    setLoadingMode(null);
    setProfile(resolveProfile(inputs));
    setStep("dashboard");
  }, [inputs]);

  const handleDashboardReset = () => {
    setProfile(null);
    setStep("company");
    setCompanyQuery("");
    setCompanyResult(null);
    setSelectedMember(null);
    setInputs(EMPTY_INPUTS);
    setLookupError(null);
  };

  const handleBackToTeam = () => {
    setStep("team");
    setSelectedMember(null);
    setInputs(EMPTY_INPUTS);
  };

  const handleBackToCompany = () => {
    setStep("company");
    setCompanyResult(null);
    setSelectedMember(null);
    setInputs(EMPTY_INPUTS);
  };

  if (step === "dashboard" && profile) {
    return <Dashboard profile={profile} onReset={handleDashboardReset} />;
  }

  return (
    <>
      <LoadingOverlay
        active={loadingMode === "company"}
        onComplete={handleCompanyLoadingComplete}
        steps={COMPANY_LOADING_STEPS}
        durationMs={COMPANY_LOADING_DURATION_MS}
        title="Fetching company intel"
        statusLabel="ENRICHING VIA ORANGE SLICE"
      />
      <LoadingOverlay
        active={loadingMode === "intent"}
        onComplete={handleIntentLoadingComplete}
        steps={LOADING_STEPS}
        durationMs={LOADING_DURATION_MS}
      />

      {step === "company" && (
        <CompanyLookupPage
          query={companyQuery}
          onQueryChange={setCompanyQuery}
          onSubmit={handleCompanySubmit}
          disabled={loadingMode === "company"}
          error={lookupError}
        />
      )}

      {step === "team" && companyResult && (
        <CompanyTeamView
          result={companyResult}
          onSelectMember={handleSelectMember}
          onBack={handleBackToCompany}
        />
      )}

      {step === "intent" && (
        <IntentScanView
          inputs={inputs}
          selectedName={selectedMember?.name}
          onChange={handleChange}
          onSubmit={handleIntentSubmit}
          onBack={handleBackToTeam}
          disabled={loadingMode === "intent"}
        />
      )}
    </>
  );
}
