# Event Retriever

A clickable, high-fidelity frontend prototype for an **Event Intent Engine**, branded as Event Retriever. The backend is fully mocked — all data lives in the frontend.

## Features

- **The Golden Retriever's Porch** — welcoming landing page with 5 social input fields
- **SNES pixel art mascot** — friendly Golden Retriever with detective hat & event lanyard
- **Sniffing animation** — 3-second loading overlay with progress states
- **Analytics dashboard** — detailed profile view with speaking events, registrations, and attendance propensity
- **3 golden profiles** — try `@stephan_example`, `@sarah_chen`, or `@marcus_rivera` for rich data

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS v4
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Handles

| Profile | Try entering |
|---------|-------------|
| Stephan Nicklow | `@stephan_example` or `linkedin.com/in/stephan-example` |
| Sarah Chen | `@sarah_chen` or `lu.ma/sarahchen` |
| Marcus Rivera | `@marcus_rivera` or `partiful.com/@marcusrivera` |
| Fallback | Any other handle |

## Project Structure

```
src/
├── app/              # Next.js pages & layout
├── components/       # UI components (mascot, form, dashboard)
├── lib/mock-data.ts  # Hardcoded profiles & matching logic
└── types/profile.ts  # TypeScript interfaces
```
