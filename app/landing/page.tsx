import React from 'react';
import Link from 'next/link';
import './landing.css';

export default function LandingPage() {
  return (
    <>
      {/* ═══ TopNavBar ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-semibold tracking-[0.2em] text-[#E9C176] uppercase">
            Fin<span className="text-[#E4E1E9]">AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-sm text-[#D1C5B4]/80 tracking-tight hover:text-[#E9C176] transition-colors duration-300" href="#features">Features</a>
            <a className="text-sm text-[#D1C5B4]/80 tracking-tight hover:text-[#E9C176] transition-colors duration-300" href="#openclaw">OpenClaw</a>
            <a className="text-sm text-[#D1C5B4]/80 tracking-tight hover:text-[#E9C176] transition-colors duration-300" href="#pricing">Pricing</a>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <Link href="/login" className="text-sm text-[#D1C5B4]/80 hover:text-[#E9C176] transition-colors duration-300">Sign In</Link>
            <Link href="/signup" className="bg-[#E9C176] text-[#1a1400] px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-[0_0_24px_rgba(233,193,118,0.25)] transition-all duration-300">Get Started</Link>
          </div>

          {/* Mobile Nav (CSS-only hamburger) */}
          <div className="md:hidden relative">
            <input type="checkbox" id="mobile-nav" className="mobile-nav-toggle peer sr-only" />
            <label htmlFor="mobile-nav" className="relative z-[60] flex flex-col gap-[5px] cursor-pointer p-2">
              <span className="hamburger-line block w-5 h-[1.5px] bg-[#D1C5B4] origin-center"></span>
              <span className="hamburger-line block w-5 h-[1.5px] bg-[#D1C5B4] origin-center"></span>
              <span className="hamburger-line block w-5 h-[1.5px] bg-[#D1C5B4] origin-center"></span>
            </label>
            {/* Overlay */}
            <div className="mobile-nav-overlay fixed inset-0 bg-black/60 z-[55] peer-checked:opacity-100 peer-checked:pointer-events-auto opacity-0 pointer-events-none transition-opacity duration-300">
              <label htmlFor="mobile-nav" className="absolute inset-0" />
            </div>
            {/* Slide-out menu */}
            <div className="mobile-nav-menu fixed top-0 right-0 h-full w-64 bg-[#0E0E13] z-[58] border-l border-[#4E4639]/20 flex flex-col pt-20 px-8 gap-6 peer-checked:translate-x-0 translate-x-full transition-transform duration-300">
              <a className="text-[#D1C5B4] text-lg hover:text-[#E9C176] transition-colors" href="#features">Features</a>
              <a className="text-[#D1C5B4] text-lg hover:text-[#E9C176] transition-colors" href="#openclaw">OpenClaw</a>
              <a className="text-[#D1C5B4] text-lg hover:text-[#E9C176] transition-colors" href="#pricing">Pricing</a>
              <div className="section-divider my-2" />
              <Link href="/login" className="text-[#D1C5B4] text-lg hover:text-[#E9C176] transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-[#E9C176] text-[#1a1400] px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-8 max-w-7xl mx-auto pt-28 pb-20">
        {/* Animated background */}
        <div className="hero-bg-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full relative z-10">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E9C176]/[0.08] border border-[#E9C176]/[0.15]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E9C176] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E9C176]">Now in Public Beta</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-light tracking-[-0.035em] leading-[1.1] overflow-visible">
              The Finance App<br className="hidden sm:block" /> That Learns{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#E9C176] via-[#F5E6C8] to-[#E9C176] bg-clip-text text-transparent inline-block pb-1 pr-3">Your</span>{' '}
              Way
            </h1>
            <p className="text-[#D1C5B4]/80 text-lg lg:text-xl font-light max-w-lg leading-relaxed tracking-[-0.01em]">
              The world&apos;s first financial interface powered by OpenClaw. Connect your own AI agent to redefine how you track, invest, and manage wealth.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/signup" className="bg-[#E9C176] text-[#1a1400] px-8 py-4 rounded-xl font-semibold text-[15px] hover:shadow-[0_0_30px_rgba(233,193,118,0.3)] transition-all duration-300 tracking-[-0.01em]">
                Get Started Free
              </Link>
              <a href="#features" className="border border-[#E9C176]/20 text-[#E9C176] px-8 py-4 rounded-xl font-medium text-[15px] hover:bg-[#E9C176]/[0.06] hover:border-[#E9C176]/30 transition-all duration-300 tracking-[-0.01em]">
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: App Mockup */}
          <div className="relative">
            <div className="bg-[#0E0E13] rounded-2xl border border-[#4E4639]/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
              {/* Title bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#131318] border-b border-[#4E4639]/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/60" />
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#4E4639]/80">FinAI v2.0</div>
                <div className="w-16" />
              </div>
              {/* App content */}
              <div className="p-5 space-y-4">
                {/* Top row: greeting + date */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-[#4E4639] font-medium uppercase tracking-widest">Good Morning</p>
                    <p className="text-lg font-light tracking-tight mt-0.5">Sarah&apos;s Vault</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#4E4639] font-medium uppercase tracking-widest">Net Worth</p>
                    <p className="text-lg font-light tracking-tight text-[#E9C176] mt-0.5">$184,230</p>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#1B1B20] rounded-xl p-3">
                    <p className="text-[9px] text-[#E9C176] font-bold uppercase tracking-wider mb-1">Checking</p>
                    <p className="text-sm font-light">$12,450</p>
                    <p className="text-[10px] text-[#34D399] mt-1">+$2,300</p>
                  </div>
                  <div className="bg-[#1B1B20] rounded-xl p-3">
                    <p className="text-[9px] text-[#CABEFF] font-bold uppercase tracking-wider mb-1">Investments</p>
                    <p className="text-sm font-light">$148,200</p>
                    <p className="text-[10px] text-[#34D399] mt-1">+12.4%</p>
                  </div>
                  <div className="bg-[#1B1B20] rounded-xl p-3">
                    <p className="text-[9px] text-[#FFB4AB] font-bold uppercase tracking-wider mb-1">Credit</p>
                    <p className="text-sm font-light">$1,280</p>
                    <p className="text-[10px] text-[#D1C5B4]/50 mt-1">Due Apr 15</p>
                  </div>
                </div>

                {/* Sparkline chart area */}
                <div className="bg-[#1B1B20] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-[#4E4639] font-bold uppercase tracking-wider">Portfolio — 6 Months</p>
                    <p className="text-[10px] text-[#34D399] font-semibold">+18.2%</p>
                  </div>
                  <svg viewBox="0 0 300 60" className="w-full h-[60px]" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E9C176" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#E9C176" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,45 C30,42 50,38 80,35 C110,32 130,40 160,30 C190,20 210,25 240,15 C260,10 280,8 300,5 L300,60 L0,60Z" fill="url(#chartGrad)" />
                    <path className="sparkline-path" d="M0,45 C30,42 50,38 80,35 C110,32 130,40 160,30 C190,20 210,25 240,15 C260,10 280,8 300,5" fill="none" stroke="#E9C176" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Recent transactions */}
                <div className="space-y-2">
                  <p className="text-[10px] text-[#4E4639] font-bold uppercase tracking-wider">Recent</p>
                  <div className="flex items-center justify-between py-2 border-b border-[#4E4639]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#E9C176]/10 flex items-center justify-center text-[11px]">🛒</div>
                      <div>
                        <p className="text-xs font-light">Whole Foods</p>
                        <p className="text-[10px] text-[#4E4639]">Groceries</p>
                      </div>
                    </div>
                    <p className="text-xs font-light text-[#F87171]">-$127.43</p>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#34D399]/10 flex items-center justify-center text-[11px]">💰</div>
                      <div>
                        <p className="text-xs font-light">Payroll Deposit</p>
                        <p className="text-[10px] text-[#4E4639]">Income</p>
                      </div>
                    </div>
                    <p className="text-xs font-light text-[#34D399]">+$4,200.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Insight Card */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 glass-card p-4 rounded-xl border-l-2 border-[#E9C176] max-w-[220px] hidden md:block shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#E9C176]/20 flex items-center justify-center">
                  <svg className="text-[#E9C176]" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span className="text-[10px] font-bold text-[#E9C176] uppercase tracking-wider">AI Insight</span>
              </div>
              <p className="text-[11px] text-[#D1C5B4]/80 leading-relaxed">&quot;Dining spend up 18% this month. Want me to set a $120/week alert?&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Trust Bar ═══ */}
      <section className="border-y border-[#4E4639]/10 bg-[#0E0E13]/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap justify-center items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2.5">
            <svg className="text-[#E9C176]/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="text-[12px] text-[#D1C5B4]/60 font-medium tracking-wide">256-bit AES Encryption</span>
          </div>
          <div className="trust-divider hidden md:block" />
          <div className="flex items-center gap-2.5">
            <svg className="text-[#E9C176]/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-[12px] text-[#D1C5B4]/60 font-medium tracking-wide">SOC 2 Compliant</span>
          </div>
          <div className="trust-divider hidden md:block" />
          <div className="flex items-center gap-2.5">
            <svg className="text-[#E9C176]/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>
            <span className="text-[12px] text-[#D1C5B4]/60 font-medium tracking-wide">12,000+ Banks Supported</span>
          </div>
          <div className="trust-divider hidden md:block" />
          <div className="flex items-center gap-2.5">
            <svg className="text-[#E9C176]/60" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span className="text-[12px] text-[#D1C5B4]/60 font-medium tracking-wide">Read-Only Access</span>
          </div>
        </div>
      </section>

      {/* ═══ Core Features ═══ */}
      <section id="features" className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9C176]/70 mb-4">Features</p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-[-0.03em] leading-tight mb-4">Everything you need to master your money</h2>
          <p className="text-[#D1C5B4]/60 font-light leading-relaxed">Intelligent automation, bank-grade security, and infinite customization — all in one place.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card p-8 lg:p-10 rounded-2xl">
            <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="text-[#E9C176]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <h3 className="text-xl font-medium tracking-[-0.02em] mb-3">AI Spending Insights</h3>
            <p className="text-[#D1C5B4]/70 font-light leading-relaxed text-[15px]">Automated categorization that actually understands your lifestyle. No manual tagging, ever.</p>
          </div>
          <div className="feature-card p-8 lg:p-10 rounded-2xl">
            <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="text-[#E9C176]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>
            </div>
            <h3 className="text-xl font-medium tracking-[-0.02em] mb-3">Secure Bank Connection</h3>
            <p className="text-[#D1C5B4]/70 font-light leading-relaxed text-[15px]">Read-only access to over 12,000 global institutions with 256-bit AES encryption via Plaid.</p>
          </div>
          <div className="feature-card feature-card-featured p-8 lg:p-10 rounded-2xl">
            <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="text-[#E9C176]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M8 15h.01M16 15h.01M9 19h6"/></svg>
            </div>
            <h3 className="text-xl font-medium tracking-[-0.02em] mb-3">Customizable with AI</h3>
            <p className="text-[#D1C5B4]/70 font-light leading-relaxed text-[15px]">Connect your OpenClaw agent to build custom widgets, tabs, and alerts using natural language.</p>
            <div className="mt-6 flex items-center gap-1.5 text-[#E9C176] text-[13px] font-semibold tracking-wide group cursor-pointer">
              Learn More
              <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ The OpenClaw Edge ═══ */}
      <section id="openclaw" className="bg-[#0A0A0F] py-32 px-6 lg:px-8 overflow-hidden">
        <div className="section-divider max-w-7xl mx-auto mb-32" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CABEFF]/[0.08] border border-[#CABEFF]/[0.15]">
              <svg className="text-[#CABEFF]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/></svg>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#CABEFF]">The OpenClaw Edge</span>
            </div>
            <h2 className="text-4xl lg:text-[3.25rem] font-light tracking-[-0.03em] leading-[1.1]">
              Your AI Agent.<br/>Your Rules.
            </h2>
            <p className="text-[#D1C5B4]/70 text-lg font-light leading-relaxed">
              Traditional apps give you a dashboard and tell you to deal with it. FinAI gives you the keys. Ask your AI agent to create a &quot;Freelance Income&quot; tab, and watch it reconfigure the UI in real-time.
            </p>
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3 text-[#D1C5B4]/80 font-light text-[15px]">
                <div className="w-5 h-5 rounded-full bg-[#E9C176]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="text-[#E9C176]" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                Natural language UI generation
              </li>
              <li className="flex items-center gap-3 text-[#D1C5B4]/80 font-light text-[15px]">
                <div className="w-5 h-5 rounded-full bg-[#E9C176]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="text-[#E9C176]" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                Custom logic deployment via API
              </li>
              <li className="flex items-center gap-3 text-[#D1C5B4]/80 font-light text-[15px]">
                <div className="w-5 h-5 rounded-full bg-[#E9C176]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="text-[#E9C176]" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                Bring your own model — full privacy control
              </li>
            </ul>
          </div>

          {/* Chat Demo */}
          <div className="relative">
            <div className="chat-window rounded-2xl overflow-hidden">
              {/* Chat header */}
              <div className="bg-[#131318] px-6 py-4 flex items-center justify-between border-b border-[#4E4639]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9C176]/30 to-[#CABEFF]/20 flex items-center justify-center">
                    <svg className="text-[#E9C176]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/></svg>
                  </div>
                  <div>
                    <span className="text-sm font-medium">FinAI Assistant</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                      <span className="text-[10px] text-[#4E4639]">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/60" />
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-6 space-y-5">
                {/* User message */}
                <div className="flex gap-3 items-end justify-end">
                  <div className="space-y-1 max-w-[75%]">
                    <p className="text-[10px] text-[#4E4639] text-right font-medium">You</p>
                    <div className="bg-[#4B32A8]/20 border border-[#4B32A8]/15 p-4 rounded-2xl rounded-br-md">
                      <p className="text-sm text-[#CABEFF]/90 leading-relaxed">&quot;Can you add a tab for my freelance income? I want to see the net after 30% tax.&quot;</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#4B32A8]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-semibold text-[#CABEFF]">S</span>
                  </div>
                </div>

                {/* AI message */}
                <div className="flex gap-3 items-end">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9C176]/30 to-[#CABEFF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="text-[#E9C176]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/></svg>
                  </div>
                  <div className="space-y-1 max-w-[75%]">
                    <p className="text-[10px] text-[#4E4639] font-medium">FinAI</p>
                    <div className="bg-[#1B1B20] border border-[#4E4639]/10 p-4 rounded-2xl rounded-bl-md">
                      <p className="text-sm text-[#D1C5B4]/90 leading-relaxed">&quot;Done. I&apos;ve created the &apos;Freelance Vault&apos; tab. Auto-deducting 30% from deposits tagged &apos;Upwork&apos; or &apos;Stripe&apos; for your net view.&quot;</p>
                    </div>
                  </div>
                </div>

                {/* Result card */}
                <div className="ml-11 bg-[#1B1B20] rounded-xl p-4 flex items-center justify-between border border-[#E9C176]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E9C176]/10 border border-[#E9C176]/10 flex items-center justify-center">
                      <svg className="text-[#E9C176]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#E9C176] font-bold uppercase tracking-wider">Freelance Vault</div>
                      <div className="text-lg font-light tracking-tight">$12,450 <span className="text-[10px] text-[#4E4639] font-medium ml-1">Net after tax</span></div>
                    </div>
                  </div>
                  <svg className="text-[#4E4639]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AI Chat Showcase ═══ */}
      <section id="chat-showcase" className="py-32 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#CABEFF]/70 mb-4">Intelligence</p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-[-0.03em] mb-4">Infinite Customization</h2>
          <p className="text-[#D1C5B4]/60 font-light">Watch how FinAI adapts to specific investment needs in seconds.</p>
        </div>
        <div className="chat-window rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-[#131318] border-b border-[#4E4639]/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#CABEFF]/20 to-[#E9C176]/10 flex items-center justify-center">
              <svg className="text-[#CABEFF]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span className="text-sm font-medium text-[#D1C5B4]/70">Conversation — Crypto Portfolio Setup</span>
          </div>
          <div className="p-6 lg:p-8 space-y-6">
            {/* User */}
            <div className="flex gap-3 items-end justify-end">
              <div className="space-y-1 max-w-[75%]">
                <p className="text-[10px] text-[#4E4639] text-right font-medium">You</p>
                <div className="bg-[#4B32A8]/15 border border-[#4B32A8]/10 p-5 rounded-2xl rounded-br-md">
                  <p className="text-sm text-[#CABEFF]/90 leading-relaxed">&quot;Hey, add a &apos;Crypto Spending&apos; tab. Categorize by BTC, ETH, and SOL. Show me P&L for each.&quot;</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#4B32A8]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-semibold text-[#CABEFF]">S</span>
              </div>
            </div>

            {/* AI */}
            <div className="flex gap-3 items-end">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9C176]/30 to-[#CABEFF]/20 flex items-center justify-center flex-shrink-0">
                <svg className="text-[#E9C176]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/></svg>
              </div>
              <div className="space-y-4 max-w-[80%]">
                <div className="space-y-1">
                  <p className="text-[10px] text-[#4E4639] font-medium">FinAI</p>
                  <div className="bg-[#1B1B20] border border-[#4E4639]/10 p-5 rounded-2xl rounded-bl-md">
                    <p className="text-sm text-[#D1C5B4]/90 leading-relaxed">&quot;Tab created. Fetching real-time exchange rates for your linked wallets. Here&apos;s your Crypto Spend View:&quot;</p>
                  </div>
                </div>
                {/* Crypto cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#1B1B20] rounded-xl p-4 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#E9C176] font-bold uppercase tracking-wider mb-2">BTC</div>
                    <div className="text-base font-light">$2,400</div>
                    <div className="text-[10px] text-[#34D399] mt-1 font-medium">+8.2%</div>
                  </div>
                  <div className="bg-[#1B1B20] rounded-xl p-4 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#CABEFF] font-bold uppercase tracking-wider mb-2">ETH</div>
                    <div className="text-base font-light">$1,120</div>
                    <div className="text-[10px] text-[#34D399] mt-1 font-medium">+12.7%</div>
                  </div>
                  <div className="bg-[#1B1B20] rounded-xl p-4 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#FFB4AB] font-bold uppercase tracking-wider mb-2">SOL</div>
                    <div className="text-base font-light">$450</div>
                    <div className="text-[10px] text-[#F87171] mt-1 font-medium">-3.1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ How it Works ═══ */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9C176]/70 mb-4">Getting Started</p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-[-0.03em]">Three steps. Two minutes.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center space-y-5">
            <div className="step-number w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-xl font-light">1</div>
            <h4 className="text-lg font-medium tracking-[-0.02em]">Connect Your Bank</h4>
            <p className="text-[#D1C5B4]/60 font-light text-[15px] leading-relaxed max-w-xs mx-auto">Securely link your accounts via Plaid or Open Banking APIs. Read-only, always.</p>
          </div>
          <div className="text-center space-y-5">
            <div className="step-number w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-xl font-light">2</div>
            <h4 className="text-lg font-medium tracking-[-0.02em]">Chat with Your AI</h4>
            <p className="text-[#D1C5B4]/60 font-light text-[15px] leading-relaxed max-w-xs mx-auto">Tell your agent how you want to see your money. Use your own model via OpenClaw.</p>
          </div>
          <div className="text-center space-y-5">
            <div className="step-number w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-xl font-light">3</div>
            <h4 className="text-lg font-medium tracking-[-0.02em]">Watch It Transform</h4>
            <p className="text-[#D1C5B4]/60 font-light text-[15px] leading-relaxed max-w-xs mx-auto">The app reshapes into your personal private banking interface. No code required.</p>
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section id="pricing" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9C176]/70 mb-4">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-[-0.03em] mb-4">Simple, transparent pricing</h2>
          <p className="text-[#D1C5B4]/60 font-light">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Free */}
          <div className="glass-card p-8 lg:p-10 rounded-2xl flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D1C5B4]/60 mb-3">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light tracking-tight">$0</span>
                <span className="text-sm text-[#4E4639] font-medium">/mo</span>
              </div>
              <p className="text-[13px] text-[#D1C5B4]/50 mt-3 font-light">For getting started with smart finance.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Bank syncing (3 accounts)
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Basic AI categorization
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Monthly spending reports
              </li>
            </ul>
            <Link href="/signup" className="w-full py-3.5 rounded-xl border border-[#4E4639]/30 font-medium text-sm text-[#D1C5B4]/80 hover:bg-[#1B1B20] hover:border-[#4E4639]/50 transition-all duration-300 text-center block">
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="pricing-pro backdrop-blur-xl p-8 lg:p-10 rounded-2xl flex flex-col h-full relative overflow-visible shadow-[0_20px_60px_rgba(233,193,118,0.08)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E9C176] to-[#F5E6C8] px-4 py-1 text-[10px] font-bold text-[#1a1400] uppercase tracking-[0.15em] rounded-full shadow-[0_4px_16px_rgba(233,193,118,0.3)]">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E9C176] mb-3">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light tracking-tight">$9</span>
                <span className="text-sm text-[#4E4639] font-medium">/mo</span>
              </div>
              <p className="text-[13px] text-[#D1C5B4]/50 mt-3 font-light">For power users who want full control.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-[14px] text-[#E9C176]/90 font-light">
                <svg className="text-[#E9C176] flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Unlimited bank connections
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#E9C176]/90 font-light">
                <svg className="text-[#E9C176] flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                OpenClaw AI customization
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#E9C176]/90 font-light">
                <svg className="text-[#E9C176] flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Custom dashboards & widgets
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#E9C176]/90 font-light">
                <svg className="text-[#E9C176] flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Priority support
              </li>
            </ul>
            <Link href="/signup?plan=pro" className="w-full py-3.5 rounded-xl bg-[#E9C176] text-[#1a1400] font-semibold text-sm shadow-[0_8px_24px_rgba(233,193,118,0.2)] hover:shadow-[0_12px_32px_rgba(233,193,118,0.3)] transition-all duration-300 text-center block">
              Start Pro Trial
            </Link>
          </div>

          {/* Premium */}
          <div className="glass-card p-8 lg:p-10 rounded-2xl flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D1C5B4]/60 mb-3">Premium</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light tracking-tight">$19</span>
                <span className="text-sm text-[#4E4639] font-medium">/mo</span>
              </div>
              <p className="text-[13px] text-[#D1C5B4]/50 mt-3 font-light">For families and advanced portfolios.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Everything in Pro
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Multi-user / Family Vaults
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Priority Concierge AI
              </li>
              <li className="flex items-start gap-3 text-[14px] text-[#D1C5B4]/80 font-light">
                <svg className="text-[#E9C176]/70 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Advanced analytics & exports
              </li>
            </ul>
            <Link href="/signup?plan=premium" className="w-full py-3.5 rounded-xl border border-[#4E4639]/30 font-medium text-sm text-[#D1C5B4]/80 hover:bg-[#1B1B20] hover:border-[#4E4639]/50 transition-all duration-300 text-center block">
              Go Premium
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-32 px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="cta-glow absolute inset-0 -z-10" />
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] leading-[1.1]">
            Your finances, finally<br className="hidden sm:block" /> on <span className="bg-gradient-to-r from-[#E9C176] to-[#F5E6C8] bg-clip-text text-transparent">your terms</span>
          </h2>
          <p className="text-[#D1C5B4]/60 text-lg lg:text-xl font-light max-w-xl mx-auto leading-relaxed">
            Private, intelligent, and entirely yours. Start building the financial app you&apos;ve always wanted.
          </p>
          <div className="pt-4">
            <Link href="/signup" className="inline-flex items-center gap-3 bg-[#E9C176] text-[#1a1400] px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-[0_0_40px_rgba(233,193,118,0.3)] hover:scale-[1.02] transition-all duration-300 group">
              Get Started Free
              <svg className="group-hover:translate-x-1 transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <p className="text-[13px] text-[#4E4639] font-light">No credit card required. Free plan available forever.</p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-[#4E4639]/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-8 py-12 w-full max-w-7xl mx-auto gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-sm font-semibold tracking-[0.2em] uppercase">
              <span className="text-[#E9C176]">Fin</span><span className="text-[#E4E1E9]">AI</span>
            </div>
            <p className="text-[13px] font-light text-[#4E4639]">&copy; {new Date().getFullYear()} FinAI. The Digital Private Vault.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-[13px] font-light text-[#4E4639] hover:text-[#D1C5B4]/80 transition-colors duration-300" href="/privacy">Privacy</a>
            <a className="text-[13px] font-light text-[#4E4639] hover:text-[#D1C5B4]/80 transition-colors duration-300" href="/terms">Terms</a>
            <a className="text-[13px] font-light text-[#4E4639] hover:text-[#D1C5B4]/80 transition-colors duration-300" href="mailto:support@finai.app">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
