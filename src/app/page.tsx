"use client";

import React from "react";
import type { Event } from "../types";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import LiveStats from "../components/home/LiveStats";
import EventList from "../components/home/EventList";
import Categories from "../components/home/Categories";
import CallToAction from "../components/home/CallToAction";
import TrustSection from "../components/home/TrustSection";
import { eventsService } from "../features/events/events.service";


export default function Home() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);

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
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Header />

      <main className="flex-1">
        <Hero />
        <LiveStats />
        {loading ? (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 rounded-3xl bg-slate-900/50 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <EventList events={events} />
        )}
        <Categories />

        <CallToAction />
        <TrustSection />
      </main>

      <Footer />
    </div>
  );
}
