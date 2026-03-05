import React from "react";
import type { Event } from "../../types";
import SeatMap from "../../components/event/SeatMap";

export default function EventDetail({ event }: { event: Event }) {
  const seats = event.seating?.seats ?? [];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <div>
        <h3 className="font-semibold">Seating</h3>
        <SeatMap seats={seats} />
      </div>
    </div>
  );
}
