import React from "react";
import EventCard from "../../components/event/EventCard";
import type { Event } from "../../types";
import { Calendar } from "lucide-react";

export default function EventList({ events }: { events: Event[] }) {
    if (events.length === 0) {
        return (
            <div className="text-center py-20 px-8 rounded-[3rem] bg-white/5 border border-white/5 border-dashed backdrop-blur-3xl">
                <div className="w-24 h-24 bg-indigo-600/10 rounded-full mx-auto mb-8 flex items-center justify-center ring-1 ring-indigo-500/20">
                    <Calendar className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Everything is Quiet...</h3>
                <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed font-medium">
                    We&apos;re currently curating some incredible experiences for you. Check back soon for new announcements!
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
