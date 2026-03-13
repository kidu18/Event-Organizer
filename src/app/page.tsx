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
  { 
    id: "1", 
    title: "React Summit 2026", 
    description: "Large conference about React ecosystem",
    category: "Technology" as const,
    image: { url: "/image/img1.png" },
    organizer: { name: "Tech Events", userId: "admin" },
    dateTime: { date: "2026-05-12", startTime: "09:00", endTime: "18:00" },
    location: { venueName: "Convention Center", city: "San Francisco", address: "123 Market St" },
    ticketing: { type: "Paid" as const, price: 299, totalTickets: 500, availableTickets: 342 },
    status: "Published" as const,
    qrSupport: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  { 
    id: "2", 
    title: "Design Systems Workshop", 
    description: "Hands-on workshop for teams",
    category: "Workshop" as const,
    image: { url: "/image/img2.png" },
    organizer: { name: "Design Events", userId: "admin" },
    dateTime: { date: "2026-06-02", startTime: "10:00", endTime: "17:00" },
    location: { venueName: "Design Hub", city: "New York", address: "456 Broadway" },
    ticketing: { type: "Paid" as const, price: 149, totalTickets: 50, availableTickets: 23 },
    status: "Published" as const,
    qrSupport: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  { 
    id: "3", 
    title: "AI in Events Conference", 
    description: "Talks and panels on AI for events",
    category: "Technology" as const,
    image: { url: "/image/img3.png" },
    organizer: { name: "AI Events", userId: "admin" },
    dateTime: { date: "2026-07-20", startTime: "09:00", endTime: "19:00" },
    location: { venueName: "Tech Center", city: "Seattle", address: "789 Pine St" },
    ticketing: { type: "Paid" as const, price: 399, totalTickets: 200, availableTickets: 156 },
    status: "Published" as const,
    qrSupport: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
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
