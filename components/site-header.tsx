"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Link className="brand" href="/"><span>F</span> FINTEL AI</Link>
      <nav className={menuOpen ? "open" : ""}>
        <Link href="/research" onClick={() => setMenuOpen(false)}>Research</Link>
        <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <button className="login">Log in</button>
        <button className="join">Join waitlist <ArrowRight size={15}/></button>
      </nav>
      <button className="menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
  );
}
