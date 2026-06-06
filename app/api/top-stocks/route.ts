import { NextResponse } from "next/server";
import { generateReport, fetchLivePrice } from "@/lib/research";
import { nifty50 } from "@/lib/nifty50";

type Quote = {
  symbol: string;
  price: number;
  previousClose: number;
  changePercent: number;
};

const candidateSymbols = [
  "RELIANCE", "HDFCBANK", "ICICIBANK", "BHARTIARTL", "INFY", "TCS", "SBIN", "LT",
  "ITC", "AXISBANK", "KOTAKBANK", "MARUTI", "M&M", "SUNPHARMA", "NTPC", "POWERGRID",
  "BAJFINANCE", "TITAN", "BEL", "TATASTEEL", "HINDALCO", "ADANIPORTS", "TRENT", "ETERNAL",
];

let cache: { expiresAt: number; data: unknown[] } | null = null;

export async function GET() {
  if (cache && cache.expiresAt > Date.now()) return NextResponse.json({ stocks: cache.data, cached: true });

  const quotes = (await Promise.all(candidateSymbols.map(async (symbol) => {
    const live = await fetchLivePrice(symbol);
    if (!live) return null;
    const changePercent = ((live.price - live.previousClose) / live.previousClose) * 100;
    return { symbol, price: live.price, previousClose: live.previousClose, changePercent } as Quote;
  }))).filter((quote): quote is Quote => Boolean(quote));

  const stocksRaw = await Promise.all(quotes.map(async (quote) => {
    const stock = nifty50.find((item) => item.symbol === quote.symbol);
    const report = await generateReport(quote.symbol);
    const momentumScore = Math.max(0, Math.min(100, 50 + quote.changePercent * 7));
    const opportunityScore = Math.round(report.score * 0.72 + momentumScore * 0.28);
    return {
      ...quote,
      company: stock?.company ?? quote.symbol,
      sector: stock?.sector ?? "Indian equities",
      researchScore: report.score,
      opportunityScore,
      stance: report.stance,
    };
  }));

  const stocks = stocksRaw
    .sort((a, b) => b.opportunityScore - a.opportunityScore || b.changePercent - a.changePercent)
    .slice(0, 10)
    .map((stock, index) => ({ ...stock, rank: index + 1 }));

  cache = { expiresAt: Date.now() + 60_000, data: stocks };
  return NextResponse.json({ stocks, cached: false, updatedAt: new Date().toISOString(), delayed: true });
}
