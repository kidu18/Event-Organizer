import React from "react";
import EventList from "../../features/events/EventList";
import type { Event } from "../../types";

const sample: Event[] = [];

export default function EventsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <EventList events={sample} />
    </main>
  );
}
