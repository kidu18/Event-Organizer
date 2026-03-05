import React from "react";
import Image from "next/image";
import type { Event } from "../../types";

export default function EventCard({ event }: { event: Event }) {
    const eventDate = event.date ? new Date(event.date) : new Date();

    return (
        <article className="group relative rounded-3xl overflow-hidden glass hover-glow transition-all duration-500 hover:-translate-y-2">
            <div
                className="h-64 relative overflow-hidden bg-slate-800"
            >
                <Image
                    src={event.image || "/api/placeholder/400/320"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">
                        {event.title}
                    </h3>
                </div>
            </div>

            <div className="p-5 bg-slate-900/50">
                <p className="text-sm text-slate-400 line-clamp-2 h-10 mb-4">
                    {event.description || "Join us for an unforgettable experience at the heart of the city's most vibrant event."}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Starts at</span>
                        <span className="text-lg font-black text-white">$59.00</span>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-purple-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5">
                        Get Tickets
                    </button>
                </div>
            </div>
        </article>
    );
}
