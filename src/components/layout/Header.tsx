/** 
 * CONCEPT: The Session Observer. 
 * This UI component reads auth state from AuthContext to decide 
 * whether to show "Sign In" or user profile controls.
 */
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { LogOut, ChevronDown, User as UserIcon } from "lucide-react"
import { useAuthContext } from "@/components/providers/AuthProvider"
import { useAuth } from "@/hooks/useAuth"

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuthContext()
  const { logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full glass border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-purple-500/20 mr-1 group-hover:rotate-12 transition-transform" />
          <div className="text-xl font-bold tracking-tight text-white">
            Event<span className="text-[#a78bfa]">Pro</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/events" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Event
          </Link>
          {isAuthenticated && user && (
            <>
              <Link
                href={user.role?.toUpperCase() === "ADMIN" ? "/admin" : "/user"}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/user/my-tickets"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                My Tickets
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-20 h-9 rounded-full bg-white/10 animate-pulse" />
          ) : isAuthenticated && user ? (
            /* Logged-in user menu */
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {user.firstName?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-300 hidden sm:block max-w-[120px] truncate">
                  {user.firstName}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
                    <div className="p-3 border-b border-white/5">
                      <p className="text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-400 uppercase">
                        {user.role}
                      </span>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href={user.role?.toUpperCase() === "ADMIN" ? "/admin" : "/user"}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={async () => {
                          setIsProfileOpen(false)
                          await logout()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Not logged in */
            <>
              <Link
                href="/login"
                className="hidden sm:block px-5 py-2 rounded-full text-sm font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all active:scale-95"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </>
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
      <div className={`md:hidden absolute top-full left-0 right-0 glass border-b border-white/5 transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col p-6 gap-2 overflow-y-auto">
          <Link href="/events" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-400 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors">
            Event
          </Link>
          {isAuthenticated && user && (
            <>
              <Link
                href={user.role?.toUpperCase() === "ADMIN" ? "/admin" : "/user"}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-semibold text-slate-400 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                Dashboard
              </Link>
              <Link href="/user/my-tickets" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-400 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors">
                My Tickets
              </Link>
            </>
          )}
          <div className="pt-4 mt-2 border-t border-white/5">
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  setIsMenuOpen(false)
                  await logout()
                }}
                className="block w-full py-4 rounded-2xl text-center text-base font-bold bg-red-500/10 text-red-400 border border-red-500/20 active:scale-[0.98] transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-4 rounded-2xl text-center text-base font-bold bg-white text-black active:scale-[0.98] transition-all"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
