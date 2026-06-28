# Event Retriever

**Predict event intent before they RSVP.**

Event Retriever is an Event Intent Engine that resolves a person’s public identity across social and event platforms, stitches that signal into an attendance graph, and surfaces who is likely to show up — plus what to talk about when they do.

---

## How it works

### 1. Resolve the company

Enter a company domain. Event Retriever pulls firmographics, product context, and leadership roster through **Orange Slice** — LinkedIn company enrichment, website scrape, and AI summarization — then ranks each contact by **decision-maker likelihood** based on title, seniority, and role.

### 2. Pick a person

Select someone on the team. Event Retriever routes you into an intent scan with whatever social handles are already known (LinkedIn, X, and more).

### 3. Predict event intent

Feed in the remaining profile links. The engine ingests public signal from five sources in parallel and builds a unified identity graph:

| Source | What we pull |
|--------|----------------|
| **LinkedIn** | Role, company, headline, geo signals, speaking history, professional event mentions |
| **X** | Posts, replies, event hashtags, founder/community activity, RSVP-adjacent social proof |
| **Instagram** | Bio, location tags, event photos, passion topics, lifestyle/geo anchors |
| **Luma** | Registered events, past attendance, host/speaker roles, upcoming calendar (90-day window) |
| **Partiful** | RSVP history, hosted events, social guest lists, recurring event circles |

Each handle resolves to a canonical node. Cross-platform edges are stitched when the same person appears across sources — co-attendance clusters, shared event URLs, handle overlap, and geo consistency raise confidence on every edge.

The result is a single profile view:

- **Attendance propensity** — probability this person registers for or shows up at your event
- **Identity graph stats** — nodes, social edges, event edges, and data sources in the graph
- **Event history** — 30+ verified and inferred past events with role, source, and verification flag
- **Upcoming registrations** — confirmed events in the next 90 days
- **Talking points** — passion-ranked conversation starters sourced from Instagram, X, and LinkedIn snippets

---

## Data pipeline

Event Retriever runs a multi-stage fetch sequence on every scan:

1. **Normalize inputs** — URLs and handles are parsed into platform-specific identifiers (`linkedin.com/in/...`, `@handle`, Luma user slugs, Partiful profile IDs).
2. **Parallel ingestion** — Each platform adapter pulls public profile metadata, event participation, and activity signals. Adapters run concurrently to minimize latency.
3. **Entity resolution** — Handles are matched against a golden identity graph. LinkedIn URL slug, X handle, Instagram username, and event-platform IDs are fused into one person record.
4. **Graph construction** — Event nodes link to people nodes with weighted edges (attended, spoke, hosted, registered). Co-attendance across Luma and Partiful strengthens cluster confidence.
5. **Intent scoring** — Recency, frequency, role seniority at past events, geographic proximity, and upcoming calendar density roll into an attendance propensity score.
6. **Passion extraction** — High-signal posts and bios are ranked into talking points with source attribution and passion scores.

All of this runs behind a seven-second fetch window — the same retrieval pass whether you’re scanning a CEO or a founding engineer.

---

## Company intelligence (Orange Slice)

For company lookup, Event Retriever uses the **Orange Slice** API to:

- Enrich the company from LinkedIn B2B data (name, headcount, location, description, logo)
- Scrape the company website for live product positioning
- Generate a plain-language company summary via structured AI extraction
- Map employees and score decision-maker likelihood by role

GamerPlug resolves to a full founding-team roster with photos, titles, and intent-scan deep links.

---

## Example flow

1. Look up **Gamerplug.com**
2. Review the team — Stephan Nicklow (CEO, 94% decision maker), Hunter Klehm (CVO), Ion Petropoulos and Abed Hamami (Co-Founding Eng)
3. Click **Stephan Nicklow** — LinkedIn and X pre-fill automatically
4. Add Instagram, Luma, and Partiful profile links
5. Run **Initiate Intent Scan**
6. Review attendance propensity, graph topology, event history, upcoming registrations, and talking points

---

## Tech stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **Orange Slice** — company enrichment & B2B graph
- **Lucide React** — UI icons

---

## Getting started

```bash
git clone https://github.com/StephanosHelpsJohn/fetchAI.git
cd fetchAI
npm install
```

Create `.env.local`:

```bash
ORANGESLICE_API_KEY=your_orange_slice_api_key
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── api/company-lookup/   # Orange Slice company enrichment route
│   └── page.tsx
├── components/
│   ├── AppFlow.tsx           # Company → team → intent → dashboard
│   ├── CompanyLookupPage.tsx
│   ├── CompanyTeamView.tsx
│   ├── IntentScanView.tsx
│   ├── Dashboard.tsx         # Identity graph & event intelligence
│   ├── FetchLoadingScene.tsx
│   └── PixelRetriever.tsx    # Golden Retriever mascot
├── lib/
│   ├── company-lookup.ts       # Orange Slice integration
│   ├── gamerplug-team.ts       # Team roster & decision-maker scores
│   └── mock-data.ts            # Identity graph & intent resolution
└── types/
    ├── company.ts
    └── profile.ts
```

---

## License

Private demo — [StephanosHelpsJohn/fetchAI](https://github.com/StephanosHelpsJohn/fetchAI)
