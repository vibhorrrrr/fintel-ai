# FINTEL AI — Master Product Context
**Version:** 1.0 · MVP-Ready  
**Status:** Seed Stage · India-first · Series A 2025  
**Tagline:** The Bloomberg Terminal for Every Investor.

---

## 1. NORTH STAR

> Institutional-grade AI investment research — beautifully simplified for 500M+ retail investors.

Every product decision, feature prioritization, and design choice must pass one test:  
**"Does this make a retail investor feel smarter, faster, with less effort?"**

---

## 2. THE PROBLEM (Resolved Framing)

The pitch deck identifies 6 pain points. Here's each one translated into a product requirement:

| Pain Point | Root Cause | Fintel's Answer |
|---|---|---|
| Too Cluttered (Bloomberg/Reuters) | Data dumped without synthesis | AI synthesizes → delivers verdict, not raw data |
| Encourage Gambling (Zerodha/Robinhood) | Dopamine-optimized UX | Research-first UX; no price tickers on home, no candlestick porn |
| Require Expertise (Screeners) | Assumes financial literacy | Explainability Levels: Beginner / Intermediate / Pro |
| Shallow AI Wrappers | ChatGPT + ticker = no real intelligence | Multi-agent architecture with domain-specialized agents |
| Info Overload (Financial News) | Signal buried in noise | AI surfaces 3 key insights per report, not 30 |
| Locked Behind Walls ($20K+/yr) | Institutional moat | Freemium: 5 reports/month free. Pro at ₹499/mo |

---

## 3. PRODUCT — FIVE CORE PILLARS

### Pillar 01 · Magic Search
**What it does:** User types any ticker, IPO name, mutual fund, or bond. Sub-second AI report generation. Intent-aware — understands context (e.g., "should I buy Tata Motors now" vs. "Tata Motors fundamentals").

**MVP scope:**
- Search bar on home — full-width, prominent, no clutter around it
- Supports: NSE/BSE tickers, IPO names, top 100 mutual funds
- Returns: AI Report Card within 3 seconds (cached) or 8 seconds (fresh)
- Intent parsing: question-style vs. ticker-style inputs handled differently

**Edge cases resolved:**
- Unknown ticker → graceful fallback: "We don't have data on this yet. Add to watchlist and we'll notify you."
- Delisted stock → show historical report with clear "DELISTED" badge
- Mutual fund → different report template (NAV, expense ratio, fund manager, peer comparison)

---

### Pillar 02 · AI Research Pipeline
**What it does:** Multi-agent architecture. Four specialized agents run in parallel, a Master Analyst synthesizes.

**Agent breakdown:**

| Agent | Function | Data Sources |
|---|---|---|
| Valuation Agent | DCF, P/E comparison, fair value estimate | Financial APIs, NSE/BSE filings |
| Risk Agent | Beta, debt levels, sector risk, concentration risk | SEBI filings, balance sheets |
| Sentiment Agent | News tone, social buzz, analyst ratings | News scraping, earnings transcripts |
| Macro Agent | Sector tailwinds/headwinds, RBI policy impact, FII/DII flows | RBI data, macro feeds |
| Master Analyst | Synthesizes all 4 → generates thesis, score, probabilities | Output of all agents |

**Technical decisions (from deck, resolved):**
- Multi-model routing: Claude (analysis/reasoning) + GPT-4o (summarization) + Gemini (cost-optimized tasks)
- Redis caching: Reports cached aggressively. Same ticker same day = serve from cache. Saves ~80% API costs at scale.
- Hallucination guard: Every factual claim tagged with source + confidence score before delivery. No unsourced assertions.

**MVP scope:**
- Valuation + Sentiment agents live at launch (highest user value, fastest to build)
- Risk + Macro agents in Phase 2 (Month 3–4)
- Master Analyst synthesizes available agents — gracefully handles missing agent output

---

### Pillar 03 · AI Investment Thesis
**What it does:** Generates a structured investment thesis per asset. Not just "good/bad" — probabilistic, multi-scenario.

**Output structure per report:**

```
AI Score:        84/100
Risk Level:      Moderate
Fair Value:      ₹1,280  (current: ₹1,140 → 12% upside)

Scenarios:
  Bull Case: 62% probability → ₹1,580  (+38%)
  Base Case: 28% probability → ₹1,280  (+12%)
  Bear Case: 10% probability →  ₹890   (-22%)

Thesis Summary:
  Moat: Brand + dealer network (durable)
  Risk: EV transition execution uncertainty
  Catalyst: JLR recovery + India EV volume ramp

SWOT: [expandable]
Insider Activity: [last 90 days]
Earnings Call Sentiment: [latest call]
```

**Explainability Levels (critical differentiator):**
- **Beginner:** "Tata Motors makes cars. Their AI score is 84/100, which means our AI thinks it's a solid company at a fair price. Think of it like buying a trusted brand at a reasonable cost."
- **Intermediate:** "Tata Motors trades at 8.2x forward P/E vs sector average of 11x, implying undervaluation. Key risk is JLR margins compressing in a rate-sensitive market."
- **Pro:** Full DCF assumptions exposed, agent confidence scores shown, raw data links available.

**MVP scope:** Bull/Base/Bear scenarios + AI Score + Fair Value + 2-paragraph thesis in Beginner mode at launch.

---

### Pillar 04 · Interactive AI Chat
**What it does:** Context-aware follow-up Q&A on any report. User can interrogate the AI like a junior analyst.

**Key capabilities:**
- "Would Warren Buffett buy this?" → explains through value investing lens
- "Compare Tata Motors vs Maruti" → side-by-side analysis
- "Explain the bear case more" → drills into that scenario
- "What's the biggest risk I'm ignoring?" → adversarial framing
- Context persists per report session (not a blank ChatGPT window)

**Design principle:** Chat lives inside the report, not as a separate page. It's a conversation about the report, not a generic AI assistant.

**MVP scope:** Single-asset follow-up chat. Multi-asset compare in Phase 2.

---

### Pillar 05 · Portfolio Doctor
**What it does:** User uploads or inputs their full portfolio. AI diagnoses health, flags risks, suggests rebalancing.

**Output:**
- Overall portfolio score
- Risk concentration flags (e.g., "62% of your portfolio is in one sector")
- Correlation/overlap analysis (e.g., "HDFC Bank and ICICI Bank move together — you have 2x exposure")
- AI rebalancing suggestions (not financial advice — framed as "what institutional investors typically do")

**Compliance framing (important):** All suggestions carry: *"This is AI analysis, not SEBI-registered financial advice. Consult a SEBI RIA before making decisions."*

**MVP scope:** Manual portfolio entry (ticker + quantity). CSV upload in Phase 2. Waitlist-gated at launch (drives email capture + exclusivity perception).

---

## 4. VIRAL FEATURES (Post-MVP, Phase 2)

These are explicitly called out in the deck as virality drivers. Build after core pillars are stable.

| Feature | Why it's viral | Build priority |
|---|---|---|
| AI Debate Mode | Two AI personas argue bull vs bear — shareable, entertaining | Phase 2 |
| Historical Similarity Engine | "This stock looks like Infosys in 2003" — nostalgia + credibility | Phase 2 |
| Investment Personality Engine | Quiz → "You're a Warren Buffett type" — identity-driven sharing | Phase 2 |
| Smart Risk Meter | Real-time portfolio risk gauge — Duolingo-streak energy | Phase 2 |
| Shareable Research Cards | Every report generates a beautiful PNG card for Twitter/LinkedIn | **Phase 1** (core to GTM) |

---

## 5. BUSINESS MODEL

### Tier Structure

| Tier | Price | Target User | Key Gate |
|---|---|---|---|
| Free | ₹0 | New investors, curious users | 5 reports/month, Beginner mode only |
| Pro | ₹499/month | Active investors, serious retail | Unlimited reports, Portfolio Doctor, all modes |
| Enterprise | Custom | RIAs, wealth managers, fintech partners | White-label, API, institutional data |

### Conversion mechanics:
- Free → Pro trigger: User hits 5-report limit mid-research session (not at month end — at peak intent moment)
- Pro → Enterprise trigger: Relationship-driven (advisor finds value, wants it for clients)
- Freemium conversion target: 3% (industry standard for prosumer SaaS; conservative)

### Unit economics at scale:
- 100K Pro users × ₹499/mo = ₹5.99 Cr ARR
- AI COGS (API + data): 12–18% of revenue at scale (aggressive caching key)
- Target gross margin: 65%+
- Year 3 ARR target: ₹85 Cr (with US expansion 3–5x multiplier from Year 2)

### Pricing notes & resolved gaps:
- ₹499/mo is aggressive for India but defensible given Bloomberg costs $24K+/yr
- Annual plan at ₹3,999 (~33% discount) should be offered — not in deck, add it
- USD pricing for US: $19/mo Pro (aligns with $30+ willingness to pay, gives room to raise)

---

## 6. GO-TO-MARKET

**Core insight from deck:** The research IS the marketing. Every shareable report card is a free ad.

### Growth Loop:
```
User runs AI report → Shares card on Twitter/LinkedIn 
→ New user clicks → Sees 1 free report → Hits paywall → Upgrades
```

### Phase roadmap:

**Phase 1 (Month 1–4): Build the Magic**
- IPO + Stock AI reports live and polished
- Shareable research PNG cards (high-res, beautiful, branded)
- Twitter/LinkedIn seeding via fintech influencers
- Product Hunt launch (coordinate with influencer seeding)
- Weekly "AI IPO Pick" thread on Twitter (founder-led content)

**Phase 2 (Month 5–9): Capture the Community**
- Portfolio Doctor (waitlist → GA)
- AI Debate Mode launch event (stream it, clip it, seed it)
- SEO play: AI-generated research pages for every NSE-listed stock (programmatic SEO)
- Email newsletter: "Fintel Weekly" — top AI insights

**Phase 3 (Month 10–18): Monetize & Expand**
- Pro tier conversion push (email sequences, in-app nudges)
- Enterprise / RIA pilots (warm intro via Finance Advisor on team)
- US waitlist open (10,000+ target before launch)
- API for fintech partners (broker integrations = distribution)

---

## 7. TECHNOLOGY STACK

### Architecture:

```
[Data Layer]
  NSE/BSE feeds · SEBI filings · Financial APIs
  News scraping (RSS + web) · Earnings call transcripts
        ↓
[AI Agent Layer]
  Valuation Agent | Risk Agent | Sentiment Agent | Macro Agent
  (run in parallel, async)
        ↓
[Master Analyst]
  Orchestrates agent outputs
  Generates thesis + confidence scores + probabilities
  Hallucination guard: every claim source-cited
        ↓
[Delivery Layer]
  Next.js frontend · Redis cache (80%+ cache-hit target)
  Vector DB (semantic search, similarity engine)
  Real-time streaming (SSE for report generation feel)
  REST API (for Enterprise tier)
```

### Key technical decisions:
- **Multi-model routing:** Claude for deep reasoning/analysis, GPT-4o for speed-optimized summaries, Gemini Flash for bulk/cheap tasks (e.g., news sentiment at scale)
- **Caching strategy:** Same ticker + same day = cache. Invalidate on major news events (earnings, SEBI announcements). Target: 80%+ reports from cache → LLM costs near-zero at scale.
- **Hallucination guard:** Before any claim reaches UI — source check, confidence threshold (>70% = show, <70% = "insufficient data"). No confabulation tolerance.
- **Streaming UX:** Reports stream token-by-token. Feels alive. Reduces perceived latency dramatically.

### MVP tech decisions (pragmatic):
- Start with OpenAI API only (fastest to ship). Add Claude + Gemini routing in Month 2.
- Use Upstash Redis (serverless, zero ops). Migrate to dedicated Redis at 50K users.
- Vector DB: Pinecone at start. Evaluate Weaviate/Qdrant at scale.
- Financial data: Start with free/cheap APIs (Screener.in, NSE official). License Refinitiv/Bloomberg data post-Series A.

---

## 8. COMPLIANCE & TRUST (Critical — often ignored in fintech pitches)

**SEBI registration:** Platform must carry research analyst disclaimer. Register as Research Analyst entity OR partner with a SEBI RA for content shield. Budget allocated (15% of seed = operations/compliance).

**Disclaimer strategy:**
- Every report footer: *"Fintel AI is not a SEBI-registered investment advisor. This report is for educational purposes only and does not constitute financial advice."*
- Probability figures (Bull/Base/Bear) framed as "AI model outputs," not "predictions"
- Fair value is "AI-estimated intrinsic value," not a buy/sell price target

**Trust signals in UI:**
- Data freshness timestamp on every report ("Last updated: 2 hours ago")
- Source citations on every major claim (collapsible)
- Confidence score shown (builds sophistication perception)
- No "Buy" / "Sell" / "Hold" ratings — use "Favorable," "Neutral," "Cautious" (avoids RA registration requirement in some interpretations)

---

## 9. METRICS DASHBOARD (What to track from Day 1)

### Acquisition:
- Waitlist signups / week
- Referral rate (% signups from shareable cards)
- CAC by channel

### Activation:
- % new users who run ≥1 report in first session
- Time to first report (< 90 seconds = good)

### Retention:
- Day-7 retention (deck shows 68% — protect this at all costs)
- Day-30 retention
- Reports per active user / week

### Revenue:
- Free → Pro conversion rate (target: 3%)
- Monthly churn rate (target: < 5%)
- ARR

### Product quality:
- "Explains better than anywhere else" score (deck: 91% — track monthly)
- Report accuracy audit (monthly manual review of 50 random reports)
- Hallucination incident rate (target: 0 per month)

---

## 10. FINANCIAL PROJECTIONS (3-Year)

| Metric | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Free Users | 25,000 | 180,000 | 600,000 |
| Pro Subscribers | 600 | 3,800 | 14,000 |
| ARPU (Pro) | ₹499/mo | ₹549/mo | ₹599/mo |
| ARR | ₹3.5 Cr | ₹22 Cr | ₹85 Cr |
| Gross Margin | 48% | 60% | 68% |
| Enterprise Clients | 0 | 3 | 12 |

Notes:
- Year 2 ARR jump driven by US expansion (3–5x multiplier assumed)
- Enterprise clients from Year 2 = meaningful ARR boost (assume ₹15–25L/client/yr)
- Year 1 gross margin at 48% = aggressive AI cost assumption — achievable only with caching discipline

---

## 11. THE ASK & USE OF FUNDS

**Raising:** $1.5M Seed (approx ₹12.5 Cr)

| Bucket | % | Amount | What it buys |
|---|---|---|---|
| Product & Engineering | 40% | ₹5 Cr | 3 engineers, AI pipeline infra, 12 months runway |
| Data & AI Costs | 25% | ₹3.1 Cr | LLM APIs, financial data licensing, vector DB |
| Design & Growth | 20% | ₹2.5 Cr | UI polish, content ops, influencer seeding |
| Operations & Compliance | 15% | ₹1.9 Cr | Legal, finance, SEBI RA registration research |

**12-month milestones:**
- 50,000 registered users
- 1,500 Pro subscribers
- ₹90L ARR
- Full NSE/BSE stock + IPO + mutual fund coverage
- US market waitlist of 10,000+
- Series A ready (metrics + US traction story)

---

## 12. COMPETITIVE POSITIONING

**The 2x2 we own:** Simple-ish UI + AI Insight (not data dump). No one else is here.

```
                    DATA DUMP
Bloomberg ●   ● Reuters Eikon
                              ● Trading Apps
         ● Screeners
--------------------------------------------
                    AI INSIGHT
                         ● AI Wrappers
                                  ★ FINTEL AI
SIMPLE UI ←————————————————→ POWER UI
```

**Where we win cleanly:**
- AI Research Quality → competitors don't have it
- Retail UX Design → competitors are ugly or dopamine-traps
- Explainability Levels → unique to Fintel

**Where we need to stay sharp:**
- Bloomberg could ship a "Bloomberg Lite" — moat here is India-first depth + UX culture
- Zerodha (Varsity) or Groww could pivot into this space — moat is speed + AI depth
- OpenAI/Google could commoditize the AI layer — moat is data integrations + trust infrastructure

---

## 13. MVP LAUNCH CHECKLIST

**Must-have at launch (Day 1):**
- [ ] Magic Search working for top 500 NSE stocks
- [ ] AI Report: Score, Fair Value, Bull/Base/Bear, 2-para thesis (Beginner mode)
- [ ] Shareable report card (PNG export)
- [ ] Free tier: 5 reports/month limit enforced
- [ ] Pro tier: ₹499/mo payment (Razorpay)
- [ ] Hallucination guard: source-cite check before render
- [ ] Mobile-responsive (most Indian users on mobile)
- [ ] SEBI disclaimer on every report
- [ ] Report caching (Redis)

**Nice-to-have at launch:**
- [ ] Intermediate + Pro explainability modes
- [ ] Interactive AI Chat (single-asset)
- [ ] Watchlist feature
- [ ] Email signup + waitlist for Portfolio Doctor

**Explicitly post-MVP (do not scope-creep into launch):**
- Portfolio Doctor
- AI Debate Mode
- US market data
- Enterprise API
- Multi-asset compare

---

## 14. PRODUCT PRINCIPLES (Non-negotiable)

1. **Clarity over completeness.** One clear insight beats ten data points. If you can't say it in one line, the AI isn't done thinking.

2. **Trust is the product.** Every claim cited. Every score explained. Zero tolerance for hallucinated numbers. One viral screenshot of a wrong AI claim = months of reputation damage.

3. **Mobile-first, always.** 85% of Indian retail investors are on phones. Every component designed for 375px first.

4. **Research, not gambling.** No real-time price tickers on home screen. No "trending stocks" dopamine feed. We are the antidote to Robinhood, not its cousin.

5. **Explain like your user is smart but busy.** Not dumbed down. Compressed. A busy 28-year-old software engineer should understand the thesis in 60 seconds.

6. **Ship fast, fix faster.** MVP in 6 weeks. Break things privately. Polish publicly. The waitlist buys time.

---

*Last updated: June 2025 · Confidential — Fintel AI Internal*
