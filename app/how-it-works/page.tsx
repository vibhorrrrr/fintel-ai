import Link from "next/link";
import { ArrowRight, BrainCircuit, Database, FileCheck2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const steps = [
  { number: "01", icon: Database, title: "Gather the evidence", text: "Fintel starts with company filings, investor disclosures, exchange announcements, and relevant market context." },
  { number: "02", icon: Layers3, title: "Run specialist analysis", text: "Valuation and sentiment agents examine the evidence independently, keeping assumptions and confidence explicit." },
  { number: "03", icon: BrainCircuit, title: "Challenge the thesis", text: "The master analyst weighs upside against risk and creates bull, base, and bear scenarios instead of a binary call." },
  { number: "04", icon: FileCheck2, title: "Verify before showing", text: "Claims without sufficient support are removed or marked unavailable. Every major conclusion keeps a source trail." },
];

export default function HowItWorksPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="method-page">
        <section className="method-hero">
          <div><p className="section-kicker">How Fintel works</p><h1>AI research you can<br/><em>look under the hood.</em></h1><p>Fintel does not ask one model for a stock tip. It builds a structured case from evidence, specialist analysis, scenario testing, and source verification.</p><Link href="/research">Try the research engine <ArrowRight size={17}/></Link></div>
          <div className="pipeline-visual">
            <div className="pipeline-core"><Sparkles size={24}/><strong>Master analyst</strong><span>Synthesises the final thesis</span></div>
            <div className="agent agent-a"><small>AGENT 01</small><strong>Valuation</strong><span>Fair value + scenarios</span></div>
            <div className="agent agent-b"><small>AGENT 02</small><strong>Sentiment</strong><span>Signals + catalysts</span></div>
            <div className="agent agent-c"><small>GUARDRAIL</small><strong>Evidence check</strong><span>Sources + confidence</span></div>
          </div>
        </section>

        <section className="method-steps">
          <div className="section-heading"><p className="section-kicker">The research pipeline</p><h2>Four steps between a search and a thesis.</h2></div>
          <div className="steps-grid">{steps.map(({ number, icon: Icon, title, text }) => <article key={number}><div><span>{number}</span><Icon size={22}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="trust-section">
          <div className="trust-copy"><p className="section-kicker">Built for trust</p><h2>What Fintel will not do.</h2><p>Useful research is honest about uncertainty. These constraints are part of the product, not legal fine print.</p></div>
          <div className="trust-rules">
            <article><ShieldCheck size={20}/><div><h3>No invented numbers</h3><p>When verified data is missing, the report says so instead of filling the gap.</p></div></article>
            <article><ShieldCheck size={20}/><div><h3>No buy or sell commands</h3><p>Fintel uses Favorable, Neutral, and Cautious to frame evidence, not direct transactions.</p></div></article>
            <article><ShieldCheck size={20}/><div><h3>No hidden certainty</h3><p>Confidence, assumptions, and scenario probabilities remain visible throughout the report.</p></div></article>
          </div>
        </section>

        <section className="method-cta"><div><p className="section-kicker">See it in action</p><h2>Research a company in under a minute.</h2></div><Link href="/research">Open Research <ArrowRight size={17}/></Link></section>
      </main>
      <footer><span>FINTEL AI</span><p>Research, not recommendations.</p><p>Made for thoughtful investors in India.</p></footer>
    </div>
  );
}
