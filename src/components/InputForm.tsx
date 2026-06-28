"use client";

import {
  Briefcase,
  Camera,
  AtSign,
  Calendar,
  PartyPopper,
  Search,
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
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn Profile URL",
    placeholder: "linkedin.com/in/username",
    icon: <Briefcase className="h-4 w-4 text-sky-600" />,
  },
  {
    key: "instagram",
    label: "Instagram Handle",
    placeholder: "@username",
    icon: <Camera className="h-4 w-4 text-orange-500" />,
  },
  {
    key: "twitter",
    label: "X (Twitter) Handle",
    placeholder: "@username",
    icon: <AtSign className="h-4 w-4 text-sky-500" />,
  },
  {
    key: "luma",
    label: "Luma Profile Link",
    placeholder: "lu.ma/username",
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
  },
  {
    key: "partiful",
    label: "Partiful Profile Link",
    placeholder: "partiful.com/@username",
    icon: <PartyPopper className="h-4 w-4 text-pink-500" />,
  },
];

export function InputForm({
  inputs,
  onChange,
  onSubmit,
  disabled,
}: InputFormProps) {
  const hasInput = Object.values(inputs).some((v) => v.trim().length > 0);

  return (
    <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 shadow-lg shadow-sky-100/50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          The Golden Retriever&apos;s Porch
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Drop your social handles — our mascot will sniff out your event
          footprint.
        </p>
      </div>

      <div className="space-y-4">
        {FIELDS.map(({ key, label, placeholder, icon }) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              {icon}
              {label}
            </label>
            <input
              id={key}
              type="text"
              value={inputs[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-cream px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !hasInput}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Search className="h-4 w-4" />
        Sniff Out Digital Footprint &amp; Predict Intent!
      </button>
    </div>
  );
}
