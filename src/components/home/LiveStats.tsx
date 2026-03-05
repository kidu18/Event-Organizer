"use client";

import React from "react";

const stats = [
    { label: "Active Events", val: "1,200+" },
    { label: "Tickets Sold", val: "50k+" },
    { label: "Verified Venues", val: "850+" },
    { label: "Happy Attendees", val: "100k+" },
];

export default function LiveStats() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl text-center flex flex-col justify-center">
                        <div className="text-lg xs:text-xl md:text-3xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500">
                            {s.val}
                        </div>
                        <div className="text-[8px] xs:text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-tight">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
