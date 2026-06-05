"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Clock3, ExternalLink, ListFilter, RefreshCw, Search, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Report } from "@/lib/types";
import { nifty50 } from "@/lib/nifty50";

const popular = ["Tata Motors", "Reliance", "HDFC Bank"];

const money = (value: number) => value ? `₹${value.toLocaleString("en-IN")}` : "Unavailable";

type TopStock = {
  rank: number;
  symbol: string;
  company: string;
  sector: string;
  price: number;
  changePercent: number;
  opportunityScore: number;
  stance: string;
};

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"search" | "top">("search");
  const [topStocks, setTopStocks] = useState<TopStock[]>([]);
  const [topLoading, setTopLoading] = useState(false);
  const [topUpdated, setTopUpdated] = useState("");

  async function loadTopStocks() {
    setTopLoading(true);
    try {
      const response = await fetch("/api/top-stocks", { cache: "no-store" });
      const data = await response.json();
      setTopStocks(data.stocks ?? []);
      setTopUpdated(new Date(data.updatedAt ?? Date.now()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    } finally {
      setTopLoading(false);
    }
  }

  useEffect(() => {
    loadTopStocks();
    const refresh = window.setInterval(loadTopStocks, 60_000);
    return () => window.clearInterval(refresh);
  }, []);

  async function research(event?: FormEvent, selected?: string) {
    event?.preventDefault();
    const value = (selected ?? query).trim();
    if (!value || loading) return;
    setQuery(value);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: value }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReport(data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to generate research.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="research-page">
        <section className="page-intro">
          <p className="section-kicker">Fintel Research</p>
          <h1>Start with a question.<br/><em>Leave with a thesis.</em></h1>
          <p>Search an Indian equity to generate a clear, source-backed view of valuation, scenarios, business quality, and risk.</p>
        </section>

        <div className="research-tabs" role="tablist" aria-label="Research options">
          <button className={view === "search" ? "active" : ""} onClick={() => setView("search")}><Search size={16}/> Search a stock</button>
          <button className={view === "top" ? "active" : ""} onClick={() => setView("top")}><ListFilter size={16}/> Top 10 opportunities</button>
        </div>

        {view === "search" && <><form className="research-search" onSubmit={research}>
          <Search size={22}/>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘Should I research Tata Motors?’" autoFocus/>
          <button disabled={loading}>{loading ? "Running agents..." : <>Generate research <ArrowRight size={17}/></>}</button>
        </form>
        <div className="popular-row"><span>Popular research</span>{popular.map((name) => <button key={name} onClick={() => research(undefined, name)}>{name}</button>)}</div></>}

        {view === "top" && (
          <section className="top-stocks-panel">
            <div className="top-stocks-heading">
              <div><p className="section-kicker">Dynamic watchlist</p><h2>Today&apos;s top 10 research opportunities</h2><p>Ranked from Fintel research quality and current session momentum.</p></div>
              <button onClick={loadTopStocks} disabled={topLoading}><RefreshCw className={topLoading ? "spinning" : ""} size={15}/> {topLoading ? "Refreshing" : "Refresh"}</button>
            </div>
            <div className="market-status"><span></span> NSE market data · Delayed up to 15 minutes {topUpdated && `· Updated ${topUpdated}`}</div>
            <div className="top-stock-list">
              {topLoading && topStocks.length === 0 && Array.from({ length: 5 }, (_, index) => <div className="stock-skeleton" key={index}/>) }
              {topStocks.map((stock) => (
                <button key={stock.symbol} onClick={() => { setView("search"); research(undefined, stock.symbol); }}>
                  <strong className="stock-rank">{String(stock.rank).padStart(2, "0")}</strong>
                  <span className="stock-letter">{stock.company.slice(0, 1)}</span>
                  <div className="stock-identity"><strong>{stock.company}</strong><small>{stock.symbol} · {stock.sector}</small></div>
                  <div className="opportunity-score"><span>Fintel score</span><strong>{stock.opportunityScore}</strong></div>
                  <div className="live-price"><strong>{money(stock.price)}</strong><span className={stock.changePercent >= 0 ? "gain" : "loss"}>{stock.changePercent >= 0 ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>} {Math.abs(stock.changePercent).toFixed(2)}%</span></div>
                  <ArrowRight className="stock-open" size={17}/>
                </button>
              ))}
            </div>
            <p className="watchlist-note"><ShieldCheck size={14}/> This is an automated research watchlist, not a recommendation to buy. Rankings can change with market prices and model inputs.</p>
          </section>
        )}
        {error && <p className="research-error">{error}</p>}

        {!report && (
          <section className="research-empty">
            <div className="empty-visual"><span></span><Sparkles size={28}/></div>
            <div><p className="section-kicker">What you will get</p><h2>A decision-ready report, not another dashboard.</h2></div>
            <div className="deliverables">
              <article><strong>01</strong><h3>AI score</h3><p>A compact view of quality, valuation, and evidence confidence.</p></article>
              <article><strong>02</strong><h3>Scenario range</h3><p>Bull, base, and bear outcomes with the assumptions made visible.</p></article>
              <article><strong>03</strong><h3>Source trail</h3><p>Primary evidence behind major claims, ready for your own review.</p></article>
            </div>
          </section>
        )}

        {report && (
          <section className="research-result" aria-live="polite">
            <div className="result-heading">
              <div><p>{report.exchange}: {report.symbol} · {report.sector}</p><h2>{report.company}</h2></div>
              <span><Clock3 size={14}/> Updated just now {report.cached && "· Cached"}</span>
            </div>
            <div className="research-metrics">
              <article><span>AI score</span><strong>{report.score}<small>/100</small></strong><p className="favorable-label">{report.stance}</p></article>
              <article><span>Fair value</span><strong>{money(report.fairValue)}</strong><p>{report.upside}% modelled upside</p></article>
              <article><span>Risk</span><strong>{report.risk}</strong><p>{report.confidence}% evidence confidence</p></article>
            </div>
            <article className="research-thesis"><div><p className="section-kicker">60-second thesis</p><h3>What the evidence says</h3></div>{report.summary.map((text) => <p key={text}>{text}</p>)}</article>
            <div className="research-scenarios">{report.scenarios.map((scenario) => <article key={scenario.name} className={scenario.name.toLowerCase()}><div><span>{scenario.name} case</span><strong>{scenario.probability}% probability</strong></div><h3>{money(scenario.value)}</h3><p>{scenario.driver}</p></article>)}</div>
            <article className="research-evidence"><div><ShieldCheck size={22}/><div><h3>Sources checked</h3><p>Open the primary evidence used for this model output.</p></div></div>{report.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.label}>{source.label}<ExternalLink size={15}/></a>)}</article>
            <p className="disclaimer"><ShieldCheck size={15}/> Educational AI research, not SEBI-registered financial advice.</p>
          </section>
        )}

        <section className="nifty-directory">
          <div className="directory-heading">
            <div><p className="section-kicker">Coverage universe</p><h2>All NIFTY 50 stocks</h2></div>
            <span>50 companies · Updated March 27, 2026</span>
          </div>
          <div className="stock-directory">
            {nifty50.map((stock) => (
              <button key={stock.symbol} onClick={() => research(undefined, stock.symbol)}>
                <span>{stock.company.slice(0, 1)}</span>
                <div><strong>{stock.company}</strong><small>{stock.symbol} · {stock.sector}</small></div>
                <ArrowRight size={15}/>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
