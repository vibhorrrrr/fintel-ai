import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { question, report } = await request.json();
  if (!question || !report) return NextResponse.json({ error: "Missing report context." }, { status: 400 });

  const q = String(question).toLowerCase();
  let answer = `${report.company}'s central case rests on ${String(report.catalyst).toLowerCase()} The largest identified risk is ${String(report.riskNote).toLowerCase()}`;
  if (q.includes("bear") || q.includes("risk")) {
    answer = `The bear case is not simply a lower price. It assumes ${report.scenarios[2].driver.toLowerCase()}, which takes the model value to ₹${report.scenarios[2].value.toLocaleString("en-IN")}. The key signal to monitor is: ${report.riskNote}`;
  } else if (q.includes("buffett") || q.includes("moat")) {
    answer = `Through a value-investing lens, the attractive feature is ${String(report.moat).toLowerCase()} The hesitation would be valuation certainty and ${String(report.riskNote).toLowerCase()} Buffett-style investors would likely demand a wider margin of safety than the current ${report.upside}% modelled upside.`;
  } else if (q.includes("why") || q.includes("score")) {
    answer = `The ${report.score}/100 score reflects a balance of business quality, valuation headroom, and evidence confidence. Fintel sees ${String(report.moat).toLowerCase()}, while discounting the score for ${String(report.riskNote).toLowerCase()}`;
  }
  return NextResponse.json({ answer, source: report.sources[0]?.label });
}
