/** CONCEPT: The Session Observer. This UI component watches the "session" state to decide whether to show "Sign In" or "User Profile". */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function Header() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full glass border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-purple-500/20 mr-1 group-hover:rotate-12 transition-transform" />
                    <div className="text-xl font-bold tracking-tight text-white">Event<span className="text-[#a78bfa]">Pro</span></div>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/events" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Events</Link>
                    {session && (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Dashboard</Link>
                            <Link href="/my-tickets" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">My Tickets</Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {status === "authenticated" ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-[10px]">
                                    {session.user?.name?.charAt(0) || "U"}
                                </div>
                                <span className="hidden sm:inline">{session.user?.name}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 glass border border-white/10 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                                        <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                                    </div>
                                    <Link
                                        href="/auth/change-password"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <Lock className="w-4 h-4" />
                                        Change Password
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth/login" className="hidden sm:block px-5 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all active:scale-95">
                            Sign in
                        </Link>
                    )}

                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`md:hidden absolute top-full left-0 right-0 glass border-b border-white/5 transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col p-6 gap-2 overflow-y-auto">
                    {['Events', 'Account', 'Admin'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-semibold text-slate-400 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="pt-4 mt-2 border-t border-white/5">
                        <Link
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full py-4 rounded-2xl text-center text-base font-bold bg-white text-black active:scale-[0.98] transition-all"
                        >
                            Sign in
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
