"use client";

import React from "react";
import Image from "next/image";
import { bookings, events, users } from "@/lib/db";

export default function RecentBookings() {
    // Sort by timestamp desc and take latest 3
    const recentBookings = [...bookings].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 3);

    return (
        <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white tracking-tight">Recent Global Bookings</h2>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Live
                    </span>
                </div>
                <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">User</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Seat</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {recentBookings.map((booking) => {
                            const user = users.find(u => u.id === booking.userId);
                            const event = events.find(e => e.id === booking.eventId);
                            
                            return (
                                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover:scale-110 transition-transform">
                                                {user?.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white leading-tight">{user?.name}</div>
                                                <div className="text-xs text-slate-500">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-slate-200">{event?.title}</div>
                                        <div className="text-xs text-slate-500">{event?.location}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <code className="text-[11px] font-medium text-slate-400 bg-white/5 px-2 py-1 rounded shadow-inner tracking-wider">
                                            {booking.seat}
                                        </code>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-white">${booking.price.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${booking.status === "SUCCESS"
                                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                                                : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/10"
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-xs text-slate-500 font-medium whitespace-nowrap">
                                        {new Date(booking.timestamp).toLocaleDateString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
