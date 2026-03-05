"use client";

import React from "react";

export default function BookingChart() {
    return (
        <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden group">
            {/* Chart Header */}
            <div className="flex items-start justify-between mb-12 relative z-10">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight mb-1">Booking Velocity</h2>
                    <p className="text-sm text-slate-500">Real-time ticket sales volume across all venues</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    {["30 Days", "7 Days", "24 Hours"].map((temp, i) => (
                        <button
                            key={temp}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${i === 0 ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            {temp}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom SVG Chart Area */}
            <div className="h-64 relative w-full group/svg">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.03" />
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.03" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="white" strokeWidth="1" strokeOpacity="0.03" />

                    {/* Area Fill */}
                    <path
                        d="M0 150 C 100 150, 150 180, 250 160 C 350 140, 450 100, 550 130 C 650 160, 750 100, 850 50 C 950 0, 1000 0, 1000 0 V 200 H 0 Z"
                        className="fill-indigo-500/[0.03] transition-colors group-hover/svg:fill-indigo-500/[0.05]"
                    />

                    {/* Main Spline */}
                    <path
                        d="M0 150 C 100 150, 150 180, 250 160 C 350 140, 450 100, 550 130 C 650 160, 750 100, 850 50 C 950 0, 1000 0, 1000 0"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all"
                    />

                    {/* Key Point */}
                    <circle cx="850" cy="50" r="6" className="fill-white stroke-[3] stroke-indigo-600 animate-pulse" />

                    {/* Definitions */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-6 px-1">
                    {["MAY 01", "MAY 08", "MAY 15", "MAY 22", "TODAY"].map((label) => (
                        <span key={label} className="text-[10px] font-bold text-slate-600 tracking-widest">{label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
