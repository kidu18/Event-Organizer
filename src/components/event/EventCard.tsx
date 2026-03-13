import React from "react";
import Image from "next/image";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import type { Event } from "../../types";

export default function EventCard({ event }: { event: Event }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-[450px] rounded-2xl bg-slate-800/50 animate-pulse" />;
    }

    // Defensive checks to prevent runtime errors
    if (!event?.dateTime?.date) {
        console.error('Invalid event data:', event);
        return (
            <div className="h-[450px] rounded-2xl bg-slate-800/50 flex items-center justify-center">
                <p className="text-slate-400">Invalid event data</p>
            </div>
        );
    }

    const eventDate = new Date(event.dateTime.date);
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <article className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-600 transition-all duration-300 hover:-translate-y-1">
            {/* Event Image */}
            <div className="h-48 relative overflow-hidden bg-slate-800">
                <Image
                    src={event.image.url || "/api/placeholder/400/200"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
                    {event.category}
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                    <Calendar className="inline w-3 h-3 mr-1" />
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {event.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3">
                        {event.description}
                    </p>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-300">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                        {event.location.venueName}, {event.location.city}
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                        <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                        {formatTime(event.dateTime.startTime)} - {formatTime(event.dateTime.endTime)}
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                        <Users className="w-4 h-4 mr-2 text-indigo-400" />
                        {event.ticketing.availableTickets} tickets available
                    </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">From</span>
                        <div className="text-xl font-bold text-white">
                            {event.ticketing.type === 'Free' ? 'Free' : `$${event.ticketing.price}`}
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        {event.ticketing.type === 'Free' ? 'Register' : 'Get Tickets'}
                    </button>
                </div>
            </div>
        </article>
    );
}
