"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Bookmark, Check, Clock3, Download, ExternalLink, MessageCircle, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { Report } from "@/lib/types";
import { SiteHeader } from "@/components/site-header";

const suggestions = ["Tata Motors", "Reliance", "HDFC Bank"];
const MAX_FREE_REPORTS = 5;

function formatMoney(value: number) {
  return value ? `₹${value.toLocaleString("en-IN")}` : "Not available";
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}>
      <div><strong>{score}</strong><span>/100</span></div>
    </div>
  );
}

function downloadCard(report: Report) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 1200, 675);
  gradient.addColorStop(0, "#071a16");
  gradient.addColorStop(1, "#123a30");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 675);
  ctx.fillStyle = "#a8f0cf";
  ctx.font = "700 26px Arial";
  ctx.fillText("FINTEL AI", 72, 76);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 58px Arial";
  ctx.fillText(report.company, 72, 170);
  ctx.fillStyle = "#a8bcb5";
  ctx.font = "28px Arial";
  ctx.fillText(`${report.exchange}: ${report.symbol}  •  ${report.sector}`, 72, 216);
  ctx.fillStyle = "#a8f0cf";
  ctx.font = "700 116px Arial";
  ctx.fillText(String(report.score), 72, 380);
  ctx.font = "28px Arial";
  ctx.fillText("AI SCORE / 100", 75, 422);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 42px Arial";
  ctx.fillText(report.stance, 400, 335);
  ctx.font = "26px Arial";
  ctx.fillStyle = "#dce8e3";
  ctx.fillText(`Fair value ${formatMoney(report.fairValue)}  •  ${report.upside}% modelled upside`, 400, 385);
  ctx.fillStyle = "#8fa59d";
  ctx.font = "22px Arial";
  ctx.fillText("AI model output • Educational research, not financial advice", 72, 604);
  const link = document.createElement("a");
  link.download = `${report.symbol.toLowerCase()}-fintel-report.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function ReportView({ report, onReset }: { report: Report; onReset: () => void }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [asking, setAsking] = useState(false);
  const [saved, setSaved] = useState(false);

  async function ask(event: FormEvent) {
    event.preventDefault();
    const next = question.trim();
    if (!next || asking) return;
    setMessages((items) => [...items, { role: "user", text: next }]);
    setQuestion("");
    setAsking(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: next, report }) });
      const data = await response.json();
      setMessages((items) => [...items, { role: "ai", text: `${data.answer} Source: ${data.source}.` }]);
    } finally {
      setAsking(false);
    }
  }

  return (
    <main className="report-shell">
      <div className="report-topbar">
        <button className="back-button" onClick={onReset}><Search size={17} /> New research</button>
        <div className="report-actions">
          <button className="icon-action" onClick={() => setSaved(!saved)}>{saved ? <Check size={17} /> : <Bookmark size={17} />}<span>{saved ? "Saved" : "Watchlist"}</span></button>
          <button className="share-button" onClick={() => downloadCard(report)}><Download size={17} /> Share card</button>
        </div>
      </div>

      <section className="report-hero">
        <div className="company-title">
          <span className="company-mark">{report.company.slice(0, 1)}</span>
          <div><p>{report.exchange}: {report.symbol} · {report.sector}</p><h1>{report.company}</h1></div>
        </div>
        <div className="freshness"><Clock3 size={14} /> Updated just now {report.cached && "· Cached"}</div>
      </section>

      <section className="verdict-grid">
        <article className="score-card"><p className="eyebrow">Fintel AI score</p><ScoreRing score={report.score} /><span className={`stance ${report.stance.toLowerCase()}`}>{report.stance}</span></article>
        <article className="fair-value-card">
          <p className="eyebrow">AI-estimated fair value</p>
          <h2>{formatMoney(report.fairValue)}</h2>
          {report.currentPrice > 0 ? <><p className="current">Reference price {formatMoney(report.currentPrice)}</p><div className="upside"><ArrowRight size={18} /> {report.upside}% modelled upside</div></> : <p className="current">Verified market data connection pending</p>}
        </article>
        <article className="risk-card"><p className="eyebrow">Risk level</p><h2>{report.risk}</h2><div className="risk-scale"><span></span><span></span><span className="active"></span><span></span><span></span></div><p>{report.confidence}% evidence confidence</p></article>
      </section>

      <section className="content-grid">
        <div className="main-column">
          <article className="panel thesis-panel">
            <div className="panel-heading"><div><p className="eyebrow">Master analyst</p><h2>The 60-second thesis</h2></div><span className="mode-pill"><Sparkles size={14} /> Beginner</span></div>
            {report.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="insight-row"><div><span>MOAT</span><p>{report.moat}</p></div><div><span>RISK</span><p>{report.riskNote}</p></div><div><span>CATALYST</span><p>{report.catalyst}</p></div></div>
          </article>

          <article className="panel">
            <div className="panel-heading"><div><p className="eyebrow">Scenario analysis</p><h2>Three ways this could play out</h2></div><span className="model-label">AI model outputs</span></div>
            <div className="scenarios">{report.scenarios.map((scenario) => <div className={`scenario ${scenario.name.toLowerCase()}`} key={scenario.name}><div className="scenario-head"><span>{scenario.name} case</span><strong>{scenario.probability}%</strong></div><h3>{formatMoney(scenario.value)}</h3><p className={scenario.change >= 0 ? "positive" : "negative"}>{scenario.change >= 0 ? "+" : ""}{scenario.change}%</p><p>{scenario.driver}</p><div className="probability"><span style={{ width: `${scenario.probability}%` }} /></div></div>)}</div>
          </article>

          <article className="panel sources-panel">
            <div className="panel-heading"><div><p className="eyebrow">Trust layer</p><h2>Evidence behind this report</h2></div><ShieldCheck size={24} /></div>
            {report.sources.map((source) => <a key={source.label} href={source.url} target="_blank" rel="noreferrer"><div><strong>{source.label}</strong><span>{source.detail}</span></div><ExternalLink size={16} /></a>)}
          </article>
        </div>

        <aside className="chat-panel">
          <div className="chat-title"><span><MessageCircle size={18} /></span><div><strong>Ask Fintel</strong><p>Chat with this report</p></div></div>
          <div className="chat-body">
            {messages.length === 0 && <><p className="chat-intro">Go deeper without opening another tab.</p>{["Explain the bear case", "Would Buffett like this?", "Why this score?"].map((item) => <button key={item} onClick={() => setQuestion(item)}>{item}<ArrowRight size={14} /></button>)}</>}
            {messages.map((message, index) => <div key={index} className={`message ${message.role}`}>{message.text}</div>)}
            {asking && <div className="message ai typing">Analysing the report…</div>}
          </div>
          <form onSubmit={ask}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about this company..."/><button aria-label="Send"><ArrowRight size={17} /></button></form>
        </aside>
      </section>
      <p className="disclaimer"><ShieldCheck size={15} /> Fintel AI is not a SEBI-registered investment advisor. This report is for educational purposes and does not constitute financial advice.</p>
    </main>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportsUsed, setReportsUsed] = useState(0);
  const remaining = useMemo(() => Math.max(0, MAX_FREE_REPORTS - reportsUsed), [reportsUsed]);

  useEffect(() => setReportsUsed(Number(localStorage.getItem("fintel-reports") ?? 0)), []);

  async function runSearch(event?: FormEvent, forcedQuery?: string) {
    event?.preventDefault();
    const value = (forcedQuery ?? query).trim();
    if (!value) return;
    if (reportsUsed >= MAX_FREE_REPORTS) { setError("You have used 5 free reports. Pro access is opening soon."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: value }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const nextCount = reportsUsed + 1;
      localStorage.setItem("fintel-reports", String(nextCount));
      setReportsUsed(nextCount); setReport(data);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Research failed. Try again."); }
    finally { setLoading(false); }
  }

  if (report) return <><SiteHeader /><ReportView report={report} onReset={() => { setReport(null); setQuery(""); }} /></>;

  return (
    <div className="home-shell">
      <SiteHeader />
      <main className="home-main">
        <div className="hero-copy"><div className="announcement"><span>NEW</span> AI research for Indian equities <ArrowRight size={14} /></div><h1>Understand any stock<br/><em>before you invest.</em></h1><p>Institutional-grade research, compressed into one clear verdict. Built for investors who value clarity over noise.</p></div>
        <form className="search-box" onSubmit={runSearch}><Search size={23} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a stock or ask a question..."/><button disabled={loading}>{loading ? "Analysing..." : <><span>Research</span><ArrowRight size={18} /></>}</button></form>
        <div className="search-meta"><div className="suggestions"><span>Try</span>{suggestions.map((item) => <button onClick={() => { setQuery(item); runSearch(undefined, item); }} key={item}>{item}</button>)}</div><p>{remaining} of {MAX_FREE_REPORTS} free reports left</p></div>
        {error && <div className="error-banner">{error}<button onClick={() => setError("")}><X size={16}/></button></div>}

        <section className="promise-grid"><article><span>01</span><Sparkles size={22}/><h3>One clear verdict</h3><p>AI synthesises valuation, sentiment, and risk so you do not have to connect the dots.</p></article><article><span>02</span><ShieldCheck size={22}/><h3>Evidence, not guesses</h3><p>Major claims include sources and confidence. Missing data stays missing, never invented.</p></article><article><span>03</span><Clock3 size={22}/><h3>Minutes become seconds</h3><p>Go from a company name to a structured investment thesis in one focused view.</p></article></section>
      </main>
      <footer><span>FINTEL AI</span><p>Research, not recommendations.</p><p>Made for thoughtful investors in India.</p></footer>
    </div>
  );
}
