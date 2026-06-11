# Fintel AI

**Institutional-grade AI investment research, simplified for retail investors.**

Fintel AI is an India-first equity research platform that synthesises valuation, sentiment, and risk into a single clear verdict. It is designed for the 500M+ retail investors who deserve institutional quality research without the institutional price tag.

---

## Overview

Traditional research platforms fall into two categories: expensive professional terminals that dump raw data, or consumer apps that optimise for dopamine over decision-making. Fintel AI occupies the gap between the two. It delivers source-backed, multi-scenario investment analysis in a format that a busy investor can absorb in under sixty seconds.

The platform currently covers the NIFTY 50 universe with live NSE market data. Reports include an AI score, fair value estimate, bull/base/bear scenario modelling, a structured thesis, and source citations for every major claim.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS with custom design system |
| Typography | DM Sans, Manrope (Google Fonts) |
| Icons | Lucide React |
| Market Data | Yahoo Finance API (NSE quotes) |
| Caching | In-memory Map with TTL (report: daily, price: 5 min) |

---

## Features

### Implemented

- **Magic Search** for all NIFTY 50 stocks with alias and fuzzy matching
- **AI Report Card** with score (0-100), fair value, risk level, and confidence rating
- **Scenario Modelling** with bull, base, and bear cases including probability weights
- **60-Second Thesis** with moat, risk, and catalyst breakdown (Beginner mode)
- **Live Market Data** from NSE via Yahoo Finance, refreshed every 5 minutes
- **Dynamic Fair Value** computed from live price and modelled upside percentage
- **Top 10 Opportunities** ranked by research quality and session momentum
- **Contextual Report Chat** with rule-based Q&A scoped to the active report
- **Shareable Report Cards** exported as branded PNG images via Canvas API
- **Source Citations** on every report linking to NSE filings, company IR, and SEBI
- **Free Tier Enforcement** with 5 reports per month tracked in localStorage
- **Watchlist Interaction** with bookmark toggle on report view
- **Mobile-First Design** with full responsive breakpoints at 850px and 560px
- **SEBI Disclaimers** on every report and research page
- **How It Works Page** with research pipeline, agent methodology, and trust rules
- **Research Page** with stock search, Top 10 panel, and NIFTY 50 directory
- **Daily Report Caching** to reduce redundant computation
- **Graceful Fallback** for unsupported stocks with honest "insufficient data" messaging

### Pages

| Route | Type | Description |
|---|---|---|
| `/` | Static | Landing page with search, value proposition, and footer |
| `/research` | Static | Stock search, Top 10 opportunities, NIFTY 50 directory |
| `/how-it-works` | Static | Research pipeline, agent methodology, trust commitments |
| `/api/report` | Dynamic | POST: generates or serves cached AI report for a stock |
| `/api/chat` | Dynamic | POST: contextual Q&A against an active report |
| `/api/top-stocks` | Dynamic | GET: live-ranked Top 10 research opportunities |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
git clone https://github.com/vibhorrrrr/fintel-ai.git
cd fintel-ai
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run lint
```

---

## Project Structure

```
fintel-ai/
  app/
    api/
      chat/route.ts          # Report-scoped Q&A endpoint
      report/route.ts         # AI report generation endpoint
      top-stocks/route.ts     # Live-ranked opportunities endpoint
    how-it-works/page.tsx     # Research methodology page
    research/page.tsx         # Stock search and NIFTY 50 directory
    globals.css               # Complete design system and responsive styles
    layout.tsx                # Root layout with metadata
    page.tsx                  # Landing page and report view
  components/
    site-header.tsx           # Shared responsive navigation
  lib/
    nifty50.ts                # NIFTY 50 constituents with aliases
    research.ts               # Report generation, live pricing, sector models
    types.ts                  # TypeScript type definitions
```

---

## Architecture

```
User Search Query
      |
      v
Symbol Resolution (aliases, fuzzy match, NIFTY 50 lookup)
      |
      v
Qualitative Seed (hand-seeded or sector-derived)
      |
      v
Live Price Fetch (Yahoo Finance, 5-min cache)
      |
      v
Dynamic Enrichment (fair value, scenario targets, upside)
      |
      v
Report Delivery (daily cache, JSON response)
```

Reports are built in two layers. The qualitative layer (thesis, moat, risk, catalyst, score) is derived from hand-curated seeds for key stocks and sector-aware models for the broader NIFTY 50 universe. The quantitative layer (current price, fair value, scenario targets) is computed dynamically from live NSE market data at request time.

---

## Design Principles

1. **Clarity over completeness.** One clear insight is more useful than ten data points.
2. **Trust is the product.** Every claim is cited. Missing data stays missing, never invented.
3. **Mobile-first, always.** 85% of Indian retail investors are on phones.
4. **Research, not gambling.** No price tickers on the home screen. No trending stocks feed.
5. **Explain like your user is smart but busy.** Compressed, not dumbed down.

---

## Roadmap

The following checklist tracks remaining work from the master product context. Items are grouped by priority phase.

### Phase 1: Launch Readiness

- [ ] Authentication system (signup, login, session management)
- [ ] Pro tier payment integration (Razorpay, Rs.499/month)
- [ ] Annual pricing plan (Rs.3,999/year)
- [ ] Pricing page with tier comparison
- [ ] Expand coverage from NIFTY 50 to top 500 NSE stocks
- [ ] Replace in-memory cache with Redis (Upstash serverless)
- [ ] Replace rule-based chat with LLM-powered responses (OpenAI API)
- [ ] SSE streaming for report generation (token-by-token delivery)
- [ ] Intent parsing for question-style vs ticker-style search inputs
- [ ] Email signup and waitlist capture for Portfolio Doctor
- [ ] Delisted stock handling with historical report and badge
- [ ] Mutual fund report template (NAV, expense ratio, fund manager, peers)

### Phase 2: Depth and Engagement

- [ ] Intermediate and Pro explainability modes
- [ ] Risk Agent (beta, debt levels, sector risk, concentration risk)
- [ ] Macro Agent (sector tailwinds, RBI policy impact, FII/DII flows)
- [ ] Multi-model routing (Claude for analysis, GPT-4o for summaries, Gemini for bulk)
- [ ] Hallucination guard with confidence threshold filtering (>70% show, <70% suppress)
- [ ] Vector database integration (Pinecone) for semantic search
- [ ] Multi-asset comparison (side-by-side report analysis)
- [ ] Portfolio Doctor with manual entry (ticker + quantity)
- [ ] Portfolio Doctor CSV upload
- [ ] SWOT analysis (expandable section per report)
- [ ] Insider activity tracking (last 90 days)
- [ ] Earnings call sentiment analysis
- [ ] SEO: programmatic research pages for every NSE-listed stock
- [ ] Email newsletter: Fintel Weekly with top AI insights

### Phase 3: Virality and Growth

- [ ] AI Debate Mode (two AI personas argue bull vs bear)
- [ ] Historical Similarity Engine ("This stock looks like Infosys in 2003")
- [ ] Investment Personality Engine (quiz-based investor profiling)
- [ ] Smart Risk Meter (real-time portfolio risk gauge)
- [ ] Shareable research cards optimised for Twitter and LinkedIn
- [ ] Referral tracking and analytics
- [ ] Product Hunt launch coordination

### Phase 4: Monetisation and Expansion

- [ ] Enterprise tier with white-label and API access
- [ ] US market data and USD pricing ($19/month)
- [ ] Broker integrations for distribution partnerships
- [ ] Financial data licensing (Refinitiv/Bloomberg post-Series A)
- [ ] Metrics dashboard (acquisition, activation, retention, revenue)
- [ ] Report accuracy audit pipeline (monthly review of 50 random reports)

---

## Compliance

Fintel AI is not a SEBI-registered investment advisor. All reports carry the following disclaimer:

> Fintel AI is not a SEBI-registered investment advisor. This report is for educational purposes only and does not constitute financial advice.

Additional compliance measures:

- Probability figures are framed as "AI model outputs," not predictions
- Fair value is labelled "AI-estimated intrinsic value," not a price target
- The platform uses "Favorable," "Neutral," and "Cautious" instead of Buy/Sell/Hold
- Claims below the confidence threshold are suppressed or marked unavailable
- Data freshness timestamps are displayed on every report

---

## License

Proprietary. All rights reserved.

---

## Contributing

This repository is private. For internal contribution guidelines, refer to the team wiki.
