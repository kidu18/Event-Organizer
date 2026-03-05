"use client"
import React from "react";

type Seat = { id: string; label: string; status: "available" | "held" | "sold" | "blocked" };

export default function SeatMap({ seats }: { seats: Seat[] }) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {seats.map((s) => (
        <button key={s.id} className={`p-2 border rounded ${s.status === 'sold' ? 'bg-gray-300' : s.status === 'blocked' ? 'bg-red-200' : 'bg-white'}`}>
          {s.label}
        </button>
      ))}
    </div>
  );
}
