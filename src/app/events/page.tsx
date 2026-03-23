"use client";

import React, { useEffect, useState } from "react";
import EventList from "../../features/events/EventList";
import type { Event } from "../../types";
import { eventsService } from "../../features/events/events.service";
import { Search, Sparkles, Filter } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // data flows from backend via eventsService
        const fetchedEvents = await eventsService.getAll();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Loader */}
          <div className="h-10 w-64 bg-slate-800/50 rounded-2xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[520px] rounded-[2.5rem] bg-slate-900/50 border border-white/5 animate-pulse overflow-hidden" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Visual background layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Modern Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles size={14} className="text-indigo-500" />
              Direct from backend
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Explore <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Upcoming Events</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Join thousands of people discovering incredible moments. Explore premium experiences, workshops, and concerts curated just for you.
            </p>
          </div>

          {/* User Side Search & Interactions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="group relative flex-1 min-w-[300px]">
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Find an event..."
                className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 text-white pl-14 pr-6 py-5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full font-bold shadow-2xl transition-all"
              />
            </div>
            
            <button className="px-8 py-5 bg-white text-black font-black rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all shadow-xl shadow-white/5">
              Filters <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Categories Bar - Subtle Touch */}
        <div className="flex items-center gap-4 overflow-x-auto pb-8 mb-12 scrollbar-none">
           {['All Events', 'Technology', 'Music', 'Business', 'Workshops', 'Social'].map((cat, i) => (
             <button 
                key={i} 
                className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                    i === 0 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
             >
                {cat}
             </button>
           ))}
        </div>

        {/* The List / Grid Component */}
        <div className="relative group/list">
          <EventList events={events} />
        </div>
      </div>
    </main>
  );
}
