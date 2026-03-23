"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import type { Event } from "../../types";

export default function EventCard({ event }: { event: Event }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-[520px] rounded-[2.5rem] bg-slate-900/50 animate-pulse border border-white/5" />;
    }

    // Backend fields: eventDate (ISO string)
    const eventDate = new Date(event.eventDate || new Date());
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    const formattedTime = eventDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    const isSoldOut = event.availableSeatsCount === 0;
    const isAlmostSoldOut = event.availableSeatsCount > 0 && event.availableSeatsCount < 20;

    return (
        <article className="group relative bg-[#0f172a]/60 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/40 transition-all duration-700 overflow-hidden backdrop-blur-2xl flex flex-col h-full shadow-2xl">
            {/* Image & Overlay Area */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={event.imageUrl || "https://picsum.photos/400/300"}
                    alt={event.title}
                    fill
                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Visual Depth Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />
                
                {/* Modern Status Chips */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {isSoldOut ? (
                        <div className="px-4 py-1.5 rounded-xl bg-red-500/80 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/10">
                            Sold Out
                        </div>
                    ) : (
                        <div className="px-4 py-1.5 rounded-xl bg-indigo-500/80 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                            Booking Open
                        </div>
                    )}
                </div>

                {/* Glass Price Tag */}
                <div className="absolute bottom-6 right-6">
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 px-6 py-2.5 rounded-2xl shadow-2xl">
                        <span className="text-white font-black text-2xl tracking-tighter italic">
                            ${event.seats?.[0]?.price || '0.00'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-1">
                <div className="mb-8 flex-1">
                    <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        <ShieldCheck size={14} className="text-indigo-500" />
                        Verified Event
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-indigo-400 transition-colors line-clamp-1 leading-none">
                        {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {event.description}
                    </p>
                </div>

                {/* Dynamic Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                    <div className="p-4 rounded-[1.5rem] bg-indigo-500/5 border border-white/5 group-hover:bg-indigo-500/10 transition-all duration-500">
                        <Calendar size={18} className="text-indigo-400 mb-3" />
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Date</p>
                        <p className="text-xs text-white font-bold">{formattedDate}</p>
                    </div>
                    <div className="p-4 rounded-[1.5rem] bg-indigo-500/5 border border-white/5 group-hover:bg-indigo-500/10 transition-all duration-500">
                        <Clock size={18} className="text-indigo-400 mb-3" />
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Time</p>
                        <p className="text-xs text-white font-bold">{formattedTime}</p>
                    </div>
                    <div className="col-span-2 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 group-hover:bg-white/10 transition-all duration-500 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 ring-4 ring-indigo-500/5">
                            <MapPin size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Venue Location</p>
                            <p className="text-sm text-white font-black truncate">{event.venueName}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Action Area */}
                <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Ticket size={14} className="text-slate-500" />
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Available Seats</span>
                        </div>
                        <div className={`text-base font-black ${isAlmostSoldOut ? 'text-orange-400 animate-pulse' : 'text-indigo-400'}`}>
                            {event.availableSeatsCount} left
                        </div>
                    </div>

                    <Link 
                        href={`/events/${event.id}`}
                        className={`
                            group/btn relative overflow-hidden px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-2
                            ${isSoldOut 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-white text-black hover:bg-indigo-600 hover:text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-95'
                            }
                        `}
                    >
                        <span>{isSoldOut ? 'Sold Out' : 'Book Now'}</span>
                        {!isSoldOut && <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1.5" />}
                    </Link>
                </div>
            </div>

            {/* Glowing Hover Background */}
            <div className="absolute -inset-x-20 -inset-y-20 bg-indigo-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </article>
    );
}
