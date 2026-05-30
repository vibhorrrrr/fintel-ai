export type NiftyStock = {
  symbol: string;
  company: string;
  sector: string;
  aliases?: string[];
};

export const nifty50: NiftyStock[] = [
  { symbol: "ADANIENT", company: "Adani Enterprises", sector: "Metals & Mining" },
  { symbol: "ADANIPORTS", company: "Adani Ports & SEZ", sector: "Services", aliases: ["Adani Ports"] },
  { symbol: "APOLLOHOSP", company: "Apollo Hospitals", sector: "Healthcare" },
  { symbol: "ASIANPAINT", company: "Asian Paints", sector: "Consumer Durables" },
  { symbol: "AXISBANK", company: "Axis Bank", sector: "Financial Services" },
  { symbol: "BAJAJ-AUTO", company: "Bajaj Auto", sector: "Automobile and Auto Components" },
  { symbol: "BAJFINANCE", company: "Bajaj Finance", sector: "Financial Services" },
  { symbol: "BAJAJFINSV", company: "Bajaj Finserv", sector: "Financial Services" },
  { symbol: "BEL", company: "Bharat Electronics", sector: "Capital Goods" },
  { symbol: "BHARTIARTL", company: "Bharti Airtel", sector: "Telecommunication", aliases: ["Airtel"] },
  { symbol: "CIPLA", company: "Cipla", sector: "Healthcare" },
  { symbol: "COALINDIA", company: "Coal India", sector: "Oil, Gas & Consumable Fuels" },
  { symbol: "DRREDDY", company: "Dr. Reddy's Laboratories", sector: "Healthcare", aliases: ["Dr Reddy", "Dr Reddys"] },
  { symbol: "EICHERMOT", company: "Eicher Motors", sector: "Automobile and Auto Components" },
  { symbol: "ETERNAL", company: "Eternal", sector: "Consumer Services", aliases: ["Zomato"] },
  { symbol: "GRASIM", company: "Grasim Industries", sector: "Construction Materials" },
  { symbol: "HCLTECH", company: "HCLTech", sector: "Information Technology", aliases: ["HCL Tech"] },
  { symbol: "HDFCBANK", company: "HDFC Bank", sector: "Financial Services" },
  { symbol: "HDFCLIFE", company: "HDFC Life", sector: "Financial Services" },
  { symbol: "HINDALCO", company: "Hindalco Industries", sector: "Metals & Mining" },
  { symbol: "HINDUNILVR", company: "Hindustan Unilever", sector: "Fast Moving Consumer Goods", aliases: ["HUL"] },
  { symbol: "ICICIBANK", company: "ICICI Bank", sector: "Financial Services" },
  { symbol: "INDIGO", company: "InterGlobe Aviation", sector: "Services", aliases: ["IndiGo"] },
  { symbol: "INFY", company: "Infosys", sector: "Information Technology" },
  { symbol: "ITC", company: "ITC", sector: "Fast Moving Consumer Goods" },
  { symbol: "JIOFIN", company: "Jio Financial Services", sector: "Financial Services" },
  { symbol: "JSWSTEEL", company: "JSW Steel", sector: "Metals & Mining" },
  { symbol: "KOTAKBANK", company: "Kotak Mahindra Bank", sector: "Financial Services", aliases: ["Kotak Bank"] },
  { symbol: "LT", company: "Larsen & Toubro", sector: "Construction", aliases: ["L&T"] },
  { symbol: "M&M", company: "Mahindra & Mahindra", sector: "Automobile and Auto Components", aliases: ["Mahindra"] },
  { symbol: "MARUTI", company: "Maruti Suzuki", sector: "Automobile and Auto Components" },
  { symbol: "MAXHEALTH", company: "Max Healthcare", sector: "Healthcare" },
  { symbol: "NESTLEIND", company: "Nestle India", sector: "Fast Moving Consumer Goods" },
  { symbol: "NTPC", company: "NTPC", sector: "Power" },
  { symbol: "ONGC", company: "Oil and Natural Gas Corporation", sector: "Oil, Gas & Consumable Fuels" },
  { symbol: "POWERGRID", company: "Power Grid Corporation", sector: "Power" },
  { symbol: "RELIANCE", company: "Reliance Industries", sector: "Oil, Gas & Consumable Fuels", aliases: ["RIL"] },
  { symbol: "SBILIFE", company: "SBI Life Insurance", sector: "Financial Services" },
  { symbol: "SHRIRAMFIN", company: "Shriram Finance", sector: "Financial Services" },
  { symbol: "SBIN", company: "State Bank of India", sector: "Financial Services", aliases: ["SBI"] },
  { symbol: "SUNPHARMA", company: "Sun Pharmaceutical Industries", sector: "Healthcare", aliases: ["Sun Pharma"] },
  { symbol: "TCS", company: "Tata Consultancy Services", sector: "Information Technology" },
  { symbol: "TATACONSUM", company: "Tata Consumer Products", sector: "Fast Moving Consumer Goods" },
  { symbol: "TMPV", company: "Tata Motors Passenger Vehicles", sector: "Automobile and Auto Components", aliases: ["Tata Motors", "TATAMOTORS"] },
  { symbol: "TATASTEEL", company: "Tata Steel", sector: "Metals & Mining" },
  { symbol: "TECHM", company: "Tech Mahindra", sector: "Information Technology" },
  { symbol: "TITAN", company: "Titan Company", sector: "Consumer Durables" },
  { symbol: "TRENT", company: "Trent", sector: "Consumer Services" },
  { symbol: "ULTRACEMCO", company: "UltraTech Cement", sector: "Construction Materials" },
  { symbol: "WIPRO", company: "Wipro", sector: "Information Technology" },
];

export function findNiftyStock(query: string) {
  const normalized = query.toUpperCase().replace(/[^A-Z0-9&]/g, "");
  return nifty50.find((stock) => {
    const terms = [stock.symbol, stock.company, ...(stock.aliases ?? [])];
    return terms.some((term) => {
      const candidate = term.toUpperCase().replace(/[^A-Z0-9&]/g, "");
      return normalized === candidate || normalized.includes(candidate);
    });
  });
}
