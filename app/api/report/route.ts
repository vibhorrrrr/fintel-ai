import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/research";
import { Report } from "@/lib/types";

const cache = new Map<string, Report>();

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const query = String(body.query ?? "").trim();
  if (!query) return NextResponse.json({ error: "Enter a company or ticker." }, { status: 400 });

  const day = new Date().toISOString().slice(0, 10);
  const key = `${day}:${query.toUpperCase()}`;
  const hit = cache.get(key);
  if (hit) return NextResponse.json({ ...hit, cached: true });

  const report = await generateReport(query);
  cache.set(key, report);
  return NextResponse.json(report);
}
