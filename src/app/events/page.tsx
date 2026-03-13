"use client";

import React, { useEffect, useState } from "react";
import EventList from "../../features/events/EventList";
import type { Event } from "../../types";
import { eventsService } from "../../features/events/events.service";
import { initializeSampleData } from "../../lib/sample-data";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      // Initialize sample data if no events exist
      initializeSampleData();
      
      try {
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
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Upcoming Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-slate-800/50 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Upcoming Events</h1>
          <p className="text-slate-400">
            Discover and register for amazing events happening near you.
          </p>
        </div>
        <EventList events={events} />
      </div>
    </main>
  );
}
