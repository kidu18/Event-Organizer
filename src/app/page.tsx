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

// --- Types & Constants ---
const featured: Event[] = [
  { id: "1", title: "React Summit 2026", date: "2026-05-12", description: "Large conference about React ecosystem", venueId: "v1", image: "/image/img1.png" },
  { id: "2", title: "Design Systems Workshop", date: "2026-06-02", description: "Hands-on workshop for teams", venueId: "v2", image: "/image/img2.png" },
  { id: "3", title: "AI in Events Conference", date: "2026-07-20", description: "Talks and panels on AI for events", venueId: "v3", image: "/image/img3.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Header />

      <main className="flex-1">
        <Hero />
        <LiveStats />
        <EventList events={featured} />
        <Categories />
        <CallToAction />
        <TrustSection />
      </main>

      <Footer />
    </div>
  );
}
