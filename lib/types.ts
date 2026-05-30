export type Scenario = {
  name: "Bull" | "Base" | "Bear";
  probability: number;
  value: number;
  change: number;
  driver: string;
};

export type Source = {
  label: string;
  url: string;
  detail: string;
};

export type Report = {
  symbol: string;
  company: string;
  exchange: string;
  sector: string;
  score: number;
  stance: "Favorable" | "Neutral" | "Cautious";
  risk: "Low" | "Moderate" | "High";
  currentPrice: number;
  fairValue: number;
  upside: number;
  confidence: number;
  summary: string[];
  moat: string;
  riskNote: string;
  catalyst: string;
  scenarios: Scenario[];
  sources: Source[];
  updatedAt: string;
  cached: boolean;
};
