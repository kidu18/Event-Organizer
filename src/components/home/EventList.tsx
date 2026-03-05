"use client";

import React from "react";
import Link from "next/link";
import EventCard from "../event/EventCard";
import type { Event } from "../../types";

interface EventListProps {
    events: Event[];
}

export default function EventList({ events }: EventListProps) {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black">Featured Events</h2>
                </div>
                <Link href="/events" className="group flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors">
                    Browse all collections
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
}
