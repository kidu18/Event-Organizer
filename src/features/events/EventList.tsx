import React from "react";
import EventCard from "../../components/event/EventCard";
import type { Event } from "../../types";

export default function EventList({ events }: { events: Event[] }) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {events.map((event, i) => (
                    <div key={i} className="w-full">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
}
