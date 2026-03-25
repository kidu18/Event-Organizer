"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Ticket, CheckCircle2, Clock, Search, DollarSign } from "lucide-react";
import { bookings, events, users } from "@/lib/db";

export default function BookingsAdminPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter(booking => {
        const user = users.find(u => u.id === booking.userId);
        const event = events.find(e => e.id === booking.eventId);
        const query = searchQuery.toLowerCase();
        
        return (
            user?.name.toLowerCase().includes(query) ||
            user?.email.toLowerCase().includes(query) ||
            event?.title.toLowerCase().includes(query) ||
            event?.location.toLowerCase().includes(query) ||
            booking.seat.toLowerCase().includes(query)
        );
    });

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2 font-display">Global Bookings</h1>
                        <p className="text-slate-500 font-medium">Monitor ticket sales, reservations, and transaction status across all events.</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search bookings..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {["All Bookings", "Success", "Pending", "Refunded"].map((tab, i) => (
                        <button 
                            key={tab}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                i === 0 
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Bookings Table */}
                <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">User</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Seat / Ticket</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => {
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
                                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/5 shadow-inner">
                                                        <Ticket className="w-3.5 h-3.5 text-indigo-400" />
                                                        <code className="text-[11px] font-medium text-slate-400 tracking-wider">
                                                            {booking.seat}
                                                        </code>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-1.5">
                                                        <DollarSign className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-sm font-black text-white">${booking.price.toFixed(2)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        booking.status === "SUCCESS"
                                                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                                                            : "bg-amber-500/10 text-amber-500 border border-amber-500/10"
                                                    }`}>
                                                        {booking.status === "SUCCESS" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-xs text-slate-500 font-medium">
                                                        {new Date(booking.timestamp).toLocaleDateString()}
                                                        <span className="block text-[10px] opacity-50">{new Date(booking.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                            <div className="text-white font-bold text-lg mb-1">No bookings found</div>
                                            <div className="text-slate-500 text-sm">We couldn&apos;t find any bookings matching &quot;{searchQuery}&quot;</div>
                                            <button 
                                                onClick={() => setSearchQuery("")}
                                                className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
                                            >
                                                Clear Search
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
