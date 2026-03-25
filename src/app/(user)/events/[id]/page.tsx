import React from "react";

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Event {params.id}</h1>
      <p className="mt-4">Detailed information about this exclusive event.</p>
    </main>
  );
}
