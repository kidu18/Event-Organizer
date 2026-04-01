"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  ShieldCheck, 
  Ticket, 
  Share2, 
  Info, 
  HelpCircle,
  FileText,
  ArrowRight,
  TrendingUp,
  Zap,
  Armchair
} from "lucide-react";
import type { Event } from "@/types";
import { eventsService } from "@/features/events/events.service";
import BookingModal from "@/components/event/BookingModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // 🔵 STEP 1: Add state to control the booking modal visibility.
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // 🔵 STEP 2: Use a typed array for selected seats to avoid 'any' errors.
  const [selectedSeats, setSelectedSeats] = useState<{ id: string; row: string; number: string; section: string; price: number }[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getById(id);
        setEvent(data);
        
        // 🔵 STEP 3: Instead of auto-selecting, we'll let users select their own seats!
        setSelectedSeats([]);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] pt-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="h-[60vh] w-full bg-slate-900/50 rounded-[3rem] animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    <div className="h-20 bg-slate-900/50 rounded-[2.5rem] animate-pulse" />
                    <div className="h-64 bg-slate-900/50 rounded-[2.5rem] animate-pulse" />
                </div>
                <div className="lg:col-span-4 translate-y-[-100px] hidden lg:block">
                    <div className="h-[500px] bg-slate-900/50 rounded-[3rem] animate-pulse" />
                </div>
            </div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-black text-white mb-4">Event Not Found</h1>
        <p className="text-slate-400 mb-8 font-medium">The event you're looking for might have been moved or cancelled.</p>
        <Link href="/events" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all">
          Back to Events
        </Link>
      </main>
    );
  }

  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full mt-24">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group">
            <Image
              src={event.imageUrl || "https://picsum.photos/1200/800"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 w-full p-12 md:p-16 flex flex-col items-start gap-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                  Electronic / Retro
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  Live Event
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none max-w-4xl">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Calendar size={20} className="text-indigo-400" />
                  </div>
                  <span className="font-bold">{formattedDate} • {formattedTime}</span>
                </div>
                
                {/* Visual Glass Venue Box */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                    <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-white font-black text-sm">{event.venueName}</p>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-tight">Metropolis City, Downtown</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Real-time toggle card */}
            <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-xl flex items-center justify-between group">
               <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-indigo-600/20 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Zap size={24} />
                  </div>
                  <div>
                      <h3 className="text-white font-black text-lg">Real-time seat updates active</h3>
                      <p className="text-slate-400 text-sm font-medium">Other fans are currently browsing. We're keeping availability updated every second.</p>
                  </div>
               </div>
               <button 
                onClick={() => setRealTimeUpdates(!realTimeUpdates)}
                className={`w-14 h-8 rounded-full transition-all duration-300 relative ${realTimeUpdates ? 'bg-indigo-500' : 'bg-slate-700'}`}
               >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${realTimeUpdates ? 'left-7 shadow-lg shadow-white/50' : 'left-1'}`} />
               </button>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">About the Event</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {event.description}
                </p>
                <p className="text-slate-400 text-lg leading-relaxed mt-4 font-medium italic">
                  Prepare for an immersive journey where visual excellence meets auditory perfection. This event is designed to transport you to another dimension through cutting-edge production and world-class performances.
                </p>
              </div>
            </div>

            {/* Info Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Clock, label: "Duration", value: "5 Hours", color: "text-blue-400" },
                  { icon: Users, label: "Age Limit", value: "18+", color: "text-purple-400" },
                  { icon: Ticket, label: "Availability", value: event.availableSeatsCount > 0 ? "Limited Seats" : "Sold Out", color: "text-pink-400" }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                      <item.icon className={`w-8 h-8 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-white font-black text-xl">{item.value}</p>
                  </div>
                ))}
            </div>

            {/* Venue Info Section */}
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-white tracking-tighter">Venue Information</h2>
              <div className="rounded-[2.5rem] bg-white/5 border border-white/5 overflow-hidden">
                  <div className="relative h-[300px] w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1200"
                        alt="Venue Map Preview"
                        fill
                        className="object-cover opacity-40 blur-[2px]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <button className="px-8 py-4 bg-indigo-600/90 backdrop-blur-xl border border-white/10 text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                             <Image src="/seat-map-icon.svg" alt="" width={24} height={24} className="hidden" />
                             <Zap size={20} />
                             Preview Seat Map
                          </button>
                      </div>
                  </div>
                  <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="flex-1">
                          <h3 className="text-2xl font-black text-white mb-2">{event.venueName}</h3>
                          <p className="text-slate-400 font-medium mb-4 max-w-md">
                            A state-of-the-art underground venue featuring immersive laser arrays and a 360-degree sound system.
                          </p>
                      </div>
                      <Link 
                        href={event.googleMapsUrl || "#"}
                        target="_blank"
                        className="text-indigo-400 font-black text-sm uppercase tracking-widest hover:text-indigo-300 transition-colors flex items-center gap-2 group"
                      >
                         Get Directions 
                         <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                  </div>
              </div>
            </div>

            {/* Organizer Section */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all ring-2 ring-indigo-500/20">
                        <Image 
                          src="https://api.dicebear.com/7.x/shapes/svg?seed=Retro"
                          alt="Organizer Avatar"
                          fill
                          className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Organized by</p>
                        <h4 className="text-white font-black text-lg">RetroVibe Productions</h4>
                    </div>
                </div>
                <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                  Follow
                </button>
            </div>
          </div>

          {/* Right Column (Sidebar/Booking) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Booking Card */}
              <div className="p-10 rounded-[3rem] bg-[#0f172a]/80 backdrop-blur-3xl border border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)] flex flex-col gap-10">
                <div>
                  <p className="text-slate-400 font-bold mb-1">Tickets starting from</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-6xl font-black text-white tracking-tighter">
                      ${event.seats?.[0]?.price || '49.00'}
                    </h3>
                    <Ticket className="text-indigo-500 mb-2" size={32} />
                  </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                           <Users size={18} className="text-indigo-400" />
                           <div className="flex-1">
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Ticket Type</p>
                              <p className="text-white font-bold">Standard Admission</p>
                           </div>
                           <ChevronRight size={18} className="text-slate-600" />
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                           <MapPin size={18} className="text-indigo-400" />
                           <div className="flex-1">
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Section</p>
                              <p className="text-white font-bold">Main Floor - G4</p>
                           </div>
                           <ChevronRight size={18} className="text-slate-600" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* 🔵 STEP 3.1: Visual Seat Grid Selector. */}
                    <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 space-y-6">
                        <div className="flex items-center justify-between font-black text-[10px] uppercase tracking-widest">
                            <span className="text-slate-500">Pick your spots</span>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-700" /> <span className="text-slate-600">Reserved</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> <span className="text-indigo-400">Available</span></div>
                            </div>
                        </div>

                        {/* Seat Grid */}
                        <div className="flex flex-col gap-3">
                          {[...Array(event.totalRows || 5)].map((_, rowIndex) => (
                            <div key={rowIndex} className="flex gap-2 justify-center">
                              {[...Array(event.totalColumns || 6)].map((_, colIndex) => {
                                const rowLabel = String.fromCharCode(65 + rowIndex); // A, B, C...
                                const seatNumber = colIndex + 1;
                                const isSelected = selectedSeats.some(s => s.row === rowLabel && s.number === String(seatNumber));
                                
                                // Find seat in event data to check status/price
                                const seatData = event.seats?.find(s => s.rowNumber === rowIndex + 1 && s.columnNumber === colIndex + 1);
                                const isSold = seatData?.status === 'SOLD' || (!seatData && rowIndex === 0); // Mock some sold seats
                                const price = seatData?.price || 49.00;

                                return (
                                  <button
                                    key={colIndex}
                                    disabled={isSold}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedSeats(prev => prev.filter(s => !(s.row === rowLabel && s.number === String(seatNumber))));
                                      } else {
                                        setSelectedSeats(prev => [...prev, { id: `${rowLabel}${seatNumber}`, row: rowLabel, number: String(seatNumber), section: 'Premium Seating', price }]);
                                      }
                                    }}
                                    className={`
                                      w-7 h-8 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95
                                      ${isSold ? 'bg-slate-800 text-slate-700 cursor-not-allowed opacity-30' : 
                                        isSelected ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] ring-2 ring-white/20' : 
                                        'bg-white/5 border border-white/10 text-slate-400 hover:border-indigo-500/50 hover:bg-white/10'}
                                    `}
                                  >
                                    <Armchair size={14} className={isSelected ? 'fill-current' : ''} />
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                        
                        {/* Selected Count Display */}
                        {selectedSeats.length > 0 && (
                          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-[10px] font-bold">
                             <div className="text-white flex items-center gap-2 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                {selectedSeats.length} Seats Selected
                             </div>
                             <button 
                              onClick={() => setSelectedSeats([])}
                              className="text-slate-500 hover:text-indigo-400 uppercase tracking-widest"
                             >
                                Clear
                             </button>
                          </div>
                        )}
                    </div>

                    <button 
                      onClick={() => {
                        if (selectedSeats.length === 0) {
                          alert("Please select at least one seat!");
                          return;
                        }
                        setIsBookingModalOpen(true);
                      }}
                      className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all active:scale-95 group"
                    >
                      SELECT SEATS
                      <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          High demand: 24 people are looking right now
                        </p>
                    </div>
                </div>
              </div>

              {/* Help & Support Card */}
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
                  <h4 className="text-white font-black uppercase text-xs tracking-widest">Need Help?</h4>
                  <div className="space-y-6">
                      {[
                        { icon: FileText, text: "Purchase Policy" },
                        { icon: HelpCircle, text: "Frequently Asked Questions" },
                        { icon: Share2, text: "Share this event" }
                      ].map((item, idx) => (
                        <button key={idx} className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors w-full group text-left">
                            <item.icon size={18} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                            <span className="font-bold text-sm tracking-tight">{item.text}</span>
                        </button>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended/Latest Section Decor */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="text-indigo-500" />
              <h2 className="text-2xl font-black text-white tracking-widest uppercase">Popular in Metropolis</h2>
          </div>
          {/* We could add more cards here */}
      </div>

      {/* 🔵 STEP 4: Render the BookingModal component with Date and Time. */}
      {event && (
        <BookingModal 
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          eventTitle={event.title}
          eventDate={formattedDate}
          eventTime={formattedTime}
          selectedSeats={selectedSeats}
        />
      )}
    </main>
  );
}
