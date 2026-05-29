import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fintel AI | Investment research, simplified",
  description: "Institutional-grade AI investment research for every investor.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
