"use client";

import {
  Briefcase,
  Camera,
  AtSign,
  Calendar,
  PartyPopper,
  Scan,
  Zap,
} from "lucide-react";
import type { SocialInputs } from "@/types/profile";

interface InputFormProps {
  inputs: SocialInputs;
  onChange: (field: keyof SocialInputs, value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const FIELDS: {
  key: keyof SocialInputs;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  tag: string;
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn Profile URL",
    placeholder: "linkedin.com/in/username",
    icon: <Briefcase className="h-3.5 w-3.5" />,
    tag: "LNKD",
  },
  {
    key: "instagram",
    label: "Instagram Handle",
    placeholder: "@username",
    icon: <Camera className="h-3.5 w-3.5" />,
    tag: "IG",
  },
  {
    key: "twitter",
    label: "X (Twitter) Handle",
    placeholder: "@username",
    icon: <AtSign className="h-3.5 w-3.5" />,
    tag: "X",
  },
  {
    key: "luma",
    label: "Luma Profile Link",
    placeholder: "lu.ma/username",
    icon: <Calendar className="h-3.5 w-3.5" />,
    tag: "LUMA",
  },
  {
    key: "partiful",
    label: "Partiful Profile Link",
    placeholder: "partiful.com/@username",
    icon: <PartyPopper className="h-3.5 w-3.5" />,
    tag: "PTF",
  },
];

export function InputForm({
  inputs,
  onChange,
  onSubmit,
  disabled,
}: InputFormProps) {
  const hasInput = Object.values(inputs).some((v) => v.trim().length > 0);
  const filledCount = Object.values(inputs).filter((v) => v.trim()).length;

  return (
    <div className="neo-card neo-card-glow relative overflow-hidden rounded-2xl p-7">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
              Input Matrix
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold text-white">
              Social Signal Sources
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              More sources = higher confidence resolution.
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-slate-400">
            <Zap className="h-3 w-3 text-cyan-400" />
            {filledCount}/5
          </div>
        </div>

        <div className="space-y-3">
          {FIELDS.map(({ key, label, placeholder, icon, tag }) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="mb-1.5 flex items-center justify-between"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-cyan-400">
                    {icon}
                  </span>
                  {label}
                </span>
                <span className="font-mono text-[9px] text-slate-600">
                  {tag}
                </span>
              </label>
              <input
                id={key}
                type="text"
                value={inputs[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="neo-input w-full rounded-lg px-3.5 py-2.5 font-mono text-sm disabled:opacity-40"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !hasInput}
          className="btn-neo font-display mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Scan className="h-4 w-4" />
          Initiate Intent Scan
        </button>
      </div>
    </div>
  );
}
