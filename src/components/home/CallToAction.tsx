"use client";

import React from "react";
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="w-full px-4 sm:px-6 py-16 md:py-24">
            <div className="max-w-6xl mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[1.5rem] md:rounded-[2.5rem] blur-2xl opacity-10 md:opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative glass p-6 xs:p-10 md:p-20 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden text-center border border-white/10">
                    <h2 className="text-2xl xs:text-3xl md:text-6xl font-black mb-6 leading-[1.15] tracking-tight">
                        Ready to Create Your <br className="hidden sm:block" /> Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Epic Moment?</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm md:text-lg text-slate-400 mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
                        Join our premium network of organizers and reach thousands of attendees instantly with our 2026-gen booking engine.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <Link href="/events" className="w-full sm:w-auto px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white text-black font-black text-sm md:text-lg hover:bg-slate-200 transition-all active:scale-95 shadow-2xl">
                            Get Started Booking
                        </Link>
                        <Link href="/events" className="w-full sm:w-auto px-10 py-4 md:py-5 rounded-xl md:rounded-2xl glass font-black text-sm md:text-lg hover:bg-white/10 transition-all active:scale-95 border border-white/10">
                            View All Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
