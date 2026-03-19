"use client";

import React from "react";
import DateSelect from "../ui/DateSelect";

export default function Hero() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <section className="min-h-[85vh] bg-[#020617]" />;

    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center">
            <div className="w-full max-w-7xl mx-auto relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-purple-300 mb-6 animate-pulse">
                        <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-purple-500"></span>
                        Booking now open for 2026
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-white mb-6">
                        Experience <span className="shimmer-text">Real-Time</span> <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Booking Mastery</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-400 leading-relaxed mb-8 md:mb-10 px-4">
                        Secure your presence at the world&apos;s most exclusive events. Lightning-fast, ultra-secure, and tailored to your passions.
                    </p>
                    <div className="w-full max-w-4xl mx-auto animate-float px-2 md:px-0">
                        <div className="glass p-2 rounded-2xl sm:rounded-[2rem] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl shadow-purple-500/10">
                            <div className="flex-1 flex items-center px-4 gap-3 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none">
                                <svg className="w-5 h-5 text-slate-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                                <input
                                    suppressHydrationWarning
                                    aria-label="Search events"
                                    placeholder="Concerts, tech, or festivals..."
                                    className="flex-1 py-3.5 md:py-4 bg-transparent text-black placeholder:text-slate-500 border-none focus:ring-0 text-sm md:text-base w-full"
                                />
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-white/10" />
                            <div className="w-full sm:w-auto px-0 md:px-2">
                                <DateSelect className="w-full" />
                            </div>
                            <button className="w-full sm:w-auto px-6 md:px-8 py-4 rounded-xl sm:rounded-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-purple-500/25 text-sm md:text-base">
                                Search Events
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 md:mt-12 flex items-center justify-center gap-2 md:gap-4 flex-wrap px-4">
                        {['All Access', 'Music', 'Innovation', 'Sport', 'Masterclass'].map((tag) => (
                            <button key={tag} className="text-[10px] md:text-xs font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full glass hover:bg-white/10 text-slate-300 transition-all hover:text-white border border-white/5">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 -z-10 bg-[#020617]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 opacity-40" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.15), transparent 70%)' }} />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-[60px] md:blur-[100px] -z-10" />
            <div className="absolute -top-24 -right-24 w-48 h-48 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[60px] md:blur-[100px] -z-10" />
        </section>
    );
}
