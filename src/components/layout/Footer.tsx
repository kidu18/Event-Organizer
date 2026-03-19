"use client";

import React from "react";
import Link from "next/link";

interface SocialIconProps {
    children: React.ReactNode;
    href?: string;
}

function SocialIcon({ children, href }: SocialIconProps) {
    return (
        <a
            href={href || "#"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 active:scale-95"
        >
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#020617] mt-12 md:mt-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-24">
                    <div className="md:col-span-4 lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4]" />
                            <div className="text-xl md:text-2xl font-black text-white">EventPro</div>
                        </div>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                            The world&apos;s most advanced event infrastructure. Real-time booking, verified venues, and unforgettable experiences.
                        </p>
                        <div className="flex items-center gap-3 md:gap-4">
                            <SocialIcon href="https://twitter.com">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.39 4.6 17.28 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.35-.21-1.94-.53v.05c0 2.07 1.47 3.8 3.43 4.19-.36.1-.73.15-1.12.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.92 3.97 2.95-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="https://instagram.com">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path d="M17.5 6.5h.01" /></svg>
                            </SocialIcon>
                            <SocialIcon href="https://linkedin.com">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 md:mb-8">Discover</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><Link href="/events" className="hover:text-white transition-colors">All Events</Link></li>
                            {['Venues', 'Collections', 'Global Cities'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 md:mb-8">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            {['About Us', 'Careers', 'Press Kit', 'Contact'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 md:mb-8">Stay Updated</h4>
                        <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">Get the latest on the world&apos;s most exclusive events.</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                suppressHydrationWarning
                                placeholder="Email address"
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-black text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                            <button
                                suppressHydrationWarning
                                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-slate-500">
                    <div className="order-2 md:order-1">© 2026 EventPro Inc. Built for the future.</div>
                    <div className="flex items-center gap-6 md:gap-8 order-1 md:order-2">
                        {['Privacy', 'Terms', 'Security'].map((item) => (
                            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
