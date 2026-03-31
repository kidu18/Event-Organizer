"use client";

import React from "react";
import type { Event } from "@/types";
import LiveStats from "@/components/home/LiveStats";
import EventList from "@/components/home/EventList";
import Categories from "@/components/home/Categories";
import CallToAction from "@/components/home/CallToAction";
import TrustSection from "@/components/home/TrustSection";
import { eventsService } from "@/features/events/events.service";
import { useSearchQuery } from "@/components/providers/SearchProvider";


export default function Home() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { searchQuery, setSearchQuery } = useSearchQuery();

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venueName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetched = await eventsService.getAll();
        setEvents(fetched.slice(0, 3)); // show top 3 featured
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white pt-24">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Events</span>
            </h1>
            <p className="text-slate-400 max-w-2xl font-medium">
                Discover the most exclusive moments happening right now in Metropolis City.
            </p>
        </div>
        <LiveStats />
        {loading ? (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[520px] rounded-[2.5rem] bg-slate-900/50 border border-white/5 animate-pulse overflow-hidden" />
              ))}
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-12 text-center bg-white/5 border border-white/5 rounded-[2.5rem] mb-20 mx-6">
            <h3 className="text-2xl font-bold text-white mb-2">No matching events</h3>
            <p className="text-slate-400">Try searching for something else!</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-indigo-400 underline"
            >
              Clear search
            </button>
          </div>
        )}
        <Categories />

        <CallToAction />
        <TrustSection />
      </main>
    </div>
  );
}
