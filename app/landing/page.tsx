import React from 'react';
import Link from 'next/link';
import './landing.css';

export default function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border-b border-white/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-light tracking-widest text-[#E4E1E9]">FinAI</div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-[#C5A059] font-manrope font-medium tracking-tight hover:text-[#C5A059] transition-all duration-400 ease-out" href="#features">Features</a>
            <a className="text-[#D1C5B4] font-manrope font-light tracking-tight hover:text-[#C5A059] transition-all duration-400 ease-out" href="#differentiator">OpenClaw</a>
            <a className="text-[#D1C5B4] font-manrope font-light tracking-tight hover:text-[#C5A059] transition-all duration-400 ease-out" href="#chat-showcase">Intelligence</a>
            <a className="text-[#D1C5B4] font-manrope font-light tracking-tight hover:text-[#C5A059] transition-all duration-400 ease-out" href="#pricing">Pricing</a>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-[#D1C5B4] text-sm font-manrope font-light hover:text-[#C5A059] transition-all duration-400">Sign In</Link>
            <Link href="/signup" className="bg-[#C5A059] text-[#412D00] px-6 py-2 rounded-full text-sm font-bold scale-95 duration-400 hover:scale-100 transition-transform">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center px-8 max-w-7xl mx-auto py-20 pt-32" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(75,50,168,0.3) 0%, transparent 60%)' }}>
        <div className="absolute inset-0 hero-glow -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-8xl font-headline font-thin tracking-tighter leading-[1.1]">
              The Finance App That Learns <span className="italic font-light bg-gradient-to-r from-[#E9C176] to-[#F5F0E8] bg-clip-text text-transparent pr-2">Your</span> Way
            </h1>
            <p className="text-[#D1C5B4] text-lg lg:text-xl font-light max-w-lg leading-relaxed">
              The world&apos;s first financial interface powered by OpenClaw. Connect your own AI agent to redefine how you track, invest, and manage wealth.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/signup" className="bg-[#E9C176] text-[#412D00] px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(233,193,118,0.3)] transition-all duration-400">Get Started</Link>
              <a href="#features" className="border border-[#4E4639]/30 text-[#E9C176] px-8 py-4 rounded-xl font-medium hover:bg-[#1B1B20] transition-all duration-400">See How It Works</a>
            </div>
          </div>
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FFB4AB]/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E9C176]/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#CABEFF]/40"></div>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#4E4639]">Private Vault Active</div>
              </div>
              <div className="space-y-6">
                <div className="h-8 w-2/3 bg-[#2A292F] rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-[#2A292F]/50 rounded-xl flex flex-col justify-end p-4">
                    <div className="text-[10px] text-[#E9C176] font-bold uppercase mb-1">Portfolio</div>
                    <div className="text-xl font-light">$24,350.00</div>
                  </div>
                  <div className="h-24 bg-[#2A292F]/50 rounded-xl flex flex-col justify-end p-4">
                    <div className="text-[10px] text-[#CABEFF] font-bold uppercase mb-1">Growth</div>
                    <div className="text-xl font-light text-[#E9C176]">+12.4%</div>
                  </div>
                </div>
                <div className="h-32 w-full bg-gradient-to-t from-[#E9C176]/10 to-transparent rounded-xl border-b-2 border-[#E9C176]/30"></div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-4 rounded-xl border-l-4 border-[#CABEFF] max-w-[200px] hidden md:block">
              <div className="text-[10px] font-bold text-[#FFDEA5] mb-2 uppercase">AI Insight</div>
              <p className="text-xs text-[#D1C5B4] italic">&quot;You spent 18% more on dining this month. Want me to set a weekly budget alert?&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-10 rounded-2xl hover:translate-y-[-8px] transition-all duration-400 group shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="mb-6 text-[#E9C176]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <h3 className="text-2xl font-headline font-light mb-4">AI Spending Insights</h3>
            <p className="text-[#D1C5B4] font-light leading-relaxed">Automated categorization that actually understands your lifestyle. No manual tagging, ever.</p>
          </div>
          <div className="glass-card p-10 rounded-2xl hover:translate-y-[-8px] transition-all duration-400 group shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="mb-6 text-[#E9C176]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>
            </div>
            <h3 className="text-2xl font-headline font-light mb-4">Bank Connection</h3>
            <p className="text-[#D1C5B4] font-light leading-relaxed">Secure, read-only access to over 12,000 global institutions with 256-bit AES encryption.</p>
          </div>
          <div className="relative glass-card p-10 rounded-2xl border-[#E9C176]/40 border-t-2 border-t-[#E9C176] hover:translate-y-[-8px] transition-all duration-400 group overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-[#E9C176]/5 -z-10"></div>
            <div className="mb-6 text-[#E9C176]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M8 15h.01M16 15h.01M9 19h6"/></svg>
            </div>
            <h3 className="text-2xl font-headline font-light mb-4">Customizable with AI</h3>
            <p className="text-[#D1C5B4] font-light leading-relaxed">Connect your OpenClaw agent to build custom widgets, tabs, and alerts using natural language.</p>
            <div className="mt-6 flex items-center text-[#E9C176] text-sm font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
              Learn More <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Differentiator */}
      <section id="differentiator" className="bg-[#0E0E13] py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 bg-[#CABEFF]/10 border border-[#CABEFF]/20 rounded-full text-[#CABEFF] text-[10px] font-bold uppercase tracking-widest">The OpenClaw Edge</div>
            <h2 className="text-4xl lg:text-5xl font-headline font-light leading-tight">Your AI Agent.<br/>Your App.</h2>
            <p className="text-[#D1C5B4] text-lg font-light leading-relaxed">
              Traditional apps give you a dashboard and tell you to deal with it. FinAI gives you the keys. Ask your AI agent to create a &quot;Freelance Income&quot; tab, and watch as it reconfigures the UI in real-time.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-4 text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Natural language UI generation
              </li>
              <li className="flex items-center gap-4 text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Custom logic deployment via API
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-[#131318] rounded-2xl shadow-3xl border border-[#4E4639]/10 overflow-hidden">
              <div className="bg-[#1B1B20] px-6 py-4 flex items-center justify-between border-b border-[#4E4639]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E9C176]/20 flex items-center justify-center">
                    <svg className="text-[#E9C176]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M8 15h.01M16 15h.01"/></svg>
                  </div>
                  <span className="text-sm font-medium">FinAI Assistant</span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-end">
                  <div className="bg-[#4B32A8]/20 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                    <p className="text-sm text-[#CABEFF]">&quot;Can you add a tab for my freelance income? I want to see the net after 30% tax.&quot;</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#2A292F] p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-[#D1C5B4]">&quot;Done. I&apos;ve created the &apos;Freelance Vault&apos; tab. I&apos;m now auto-deducting 30% from every deposit tagged &apos;Upwork&apos; or &apos;Stripe&apos; for your view.&quot;</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#4E4639]/10">
                  <div className="bg-[#2A292F] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E9C176]/10 flex items-center justify-center">
                        <svg className="text-[#E9C176]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#4E4639] font-bold uppercase">Freelance Vault</div>
                        <div className="text-lg font-light">$12,450.00 <span className="text-[10px] text-[#E9C176]">(Net)</span></div>
                      </div>
                    </div>
                    <svg className="text-[#4E4639]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Showcase */}
      <section id="chat-showcase" className="py-32 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-light mb-4">Infinite Customization</h2>
          <p className="text-[#D1C5B4] font-light">Watch how FinAI adapts to specific investment needs.</p>
        </div>
        <div className="glass-card rounded-3xl overflow-hidden border-[#CABEFF]/20 shadow-[0_0_50px_rgba(75,50,168,0.1)]">
          <div className="p-8 space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#39383E] flex-shrink-0 flex items-center justify-center">
                <svg className="text-[#D1C5B4]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="bg-[#2A292F]/40 p-5 rounded-2xl rounded-tl-none border border-[#4E4639]/10">
                <p className="text-[#D1C5B4] leading-relaxed font-light italic">&quot;Hey, add a &apos;Crypto Spending&apos; tab. Categorize by BTC, ETH, and SOL.&quot;</p>
              </div>
            </div>
            <div className="flex gap-4 items-start flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-[#E9C176]/20 flex-shrink-0 flex items-center justify-center">
                <svg className="text-[#E9C176]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M8 15h.01M16 15h.01"/></svg>
              </div>
              <div className="space-y-4 w-full md:w-2/3">
                <div className="bg-[#E9C176]/5 p-5 rounded-2xl rounded-tr-none border border-[#E9C176]/10">
                  <p className="text-[#D1C5B4] leading-relaxed font-light">&quot;Tab initialized. Fetching real-time exchange rates for your linked wallets. Here is your new Crypto Spend View.&quot;</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#2A292F] rounded-xl p-3 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#4E4639] font-bold uppercase mb-1">BTC</div>
                    <div className="text-sm font-light">$2.4k</div>
                  </div>
                  <div className="bg-[#2A292F] rounded-xl p-3 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#4E4639] font-bold uppercase mb-1">ETH</div>
                    <div className="text-sm font-light">$1.1k</div>
                  </div>
                  <div className="bg-[#2A292F] rounded-xl p-3 text-center border border-[#4E4639]/10">
                    <div className="text-[9px] text-[#4E4639] font-bold uppercase mb-1">SOL</div>
                    <div className="text-sm font-light">$450</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-headline font-light mb-16">The Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#2A292F] rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <svg className="text-[#E9C176]" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <h4 className="text-xl font-headline font-light">1. Connect Bank</h4>
            <p className="text-[#D1C5B4] font-light text-sm">Securely link your accounts via Plaid or Open Banking APIs.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#2A292F] rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
              <svg className="text-[#E9C176]" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h4 className="text-xl font-headline font-light">2. Chat with AI</h4>
            <p className="text-[#D1C5B4] font-light text-sm">Tell your agent how you want to see your money. Use your own model via OpenClaw.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#2A292F] rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
              <svg className="text-[#E9C176]" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <h4 className="text-xl font-headline font-light">3. Customize Dashboard</h4>
            <p className="text-[#D1C5B4] font-light text-sm">Watch the app transform into your personal private banking interface.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-light mb-4">Simple Pricing</h2>
        <p className="text-center text-[#D1C5B4] mb-16">Start free, upgrade when you&apos;re ready</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="glass-card p-10 rounded-3xl flex flex-col h-full border-transparent">
            <div className="mb-8">
              <h3 className="text-xl font-light mb-2">Free</h3>
              <div className="text-4xl font-headline font-light">$0<span className="text-sm text-[#4E4639]">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Bank Syncing (3 banks)
              </li>
              <li className="flex items-center gap-3 text-sm text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Basic AI Categorization
              </li>
            </ul>
            <Link href="/signup" className="w-full py-4 rounded-xl border border-[#4E4639]/30 font-medium hover:bg-[#1B1B20] transition-colors text-center block">Get Started Free</Link>
          </div>
          {/* Pro */}
          <div className="glass-card p-10 rounded-3xl flex flex-col h-full border-[#E9C176]/30 relative overflow-hidden shadow-[0_0_40px_rgba(233,193,118,0.15)]">
            <div className="absolute top-0 right-0 bg-[#E9C176] px-4 py-1 text-[10px] font-bold text-[#412D00] uppercase tracking-widest rounded-bl-xl">Popular</div>
            <div className="mb-8">
              <h3 className="text-xl font-light mb-2 text-[#E9C176]">Pro</h3>
              <div className="text-4xl font-headline font-light">$9<span className="text-sm text-[#4E4639]">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-[#E9C176] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Unlimited Bank Connections
              </li>
              <li className="flex items-center gap-3 text-sm text-[#E9C176] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                OpenClaw AI Customization
              </li>
              <li className="flex items-center gap-3 text-sm text-[#E9C176] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Custom Dashboards
              </li>
            </ul>
            <Link href="/signup?plan=pro" className="w-full py-4 rounded-xl bg-[#E9C176] text-[#412D00] font-bold shadow-lg shadow-[#E9C176]/10 hover:shadow-[#E9C176]/20 transition-all text-center block">Start Pro Trial</Link>
          </div>
          {/* Premium */}
          <div className="glass-card p-10 rounded-3xl flex flex-col h-full border-transparent">
            <div className="mb-8">
              <h3 className="text-xl font-light mb-2">Premium</h3>
              <div className="text-4xl font-headline font-light">$19<span className="text-sm text-[#4E4639]">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Everything in Pro
              </li>
              <li className="flex items-center gap-3 text-sm text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Multi-user / Family Vaults
              </li>
              <li className="flex items-center gap-3 text-sm text-[#D1C5B4] font-light">
                <svg className="text-[#E9C176] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Priority Concierge AI
              </li>
            </ul>
            <Link href="/signup?plan=premium" className="w-full py-4 rounded-xl border border-[#4E4639]/30 font-medium hover:bg-[#1B1B20] transition-colors text-center block">Go Premium</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[#CABEFF]/10 blur-[120px] -z-10 rounded-full"></div>
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-headline font-light leading-tight">Start Building Your Finance App</h2>
          <p className="text-[#D1C5B4] text-xl font-light">Experience the future of wealth management. Private, intelligent, and entirely yours.</p>
          <Link href="/signup" className="inline-flex items-center gap-4 bg-[#E9C176] text-[#412D00] px-12 py-6 rounded-2xl text-xl font-extrabold hover:scale-105 transition-all duration-400 group">
            Get Started Now
            <svg className="group-hover:translate-x-2 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] border-t border-[#4E4639]/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="text-lg font-light text-[#E4E1E9] uppercase tracking-widest">FinAI</div>
            <p className="font-manrope text-sm font-light text-[#78716C]">&copy; {new Date().getFullYear()} FinAI. The Digital Private Vault.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-manrope text-sm font-light text-[#78716C] hover:text-[#D1C5B4] transition-colors duration-400" href="/privacy">Privacy Policy</a>
            <a className="font-manrope text-sm font-light text-[#78716C] hover:text-[#D1C5B4] transition-colors duration-400" href="/terms">Terms of Service</a>
            <a className="font-manrope text-sm font-light text-[#78716C] hover:text-[#D1C5B4] transition-colors duration-400" href="mailto:support@finai.app">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
