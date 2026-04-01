"use client";


import React, { useState } from "react";
import {
  CheckCircle2,
  Download,
  Calendar,
  MapPin,
  Share2,
  Navigation,
  ShoppingBag,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { generateTicketPDF } from "@/lib/pdf";
import TicketPDFTemplate from "@/components/event/TicketPDFTemplate";

/**
 * 🎨 PREMIUM SUCCESS PAGE COMPONENT
 * Replicates the "Your tickets are secured!" design with high-end glassmorphism and animations.
 */
export default function CheckoutSuccessPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const searchParams = useSearchParams();

  // 🟠 STEP 3.5: Read dynamic data from search parameters injected by BookingModal
  const eventName = searchParams.get("event") || "Summer Solstice Festival 2024";
  const eventDate = searchParams.get("date") || "Saturday, June 22";
  const eventTime = searchParams.get("time") || "7:00 PM";
  const ticketCount = searchParams.get("count") || "4";

  // 🟣 Static ID for the mock (ensures React 19 purity)
  const orderId = "JB#-882834";

  const orderData = {
    id: orderId,
    eventTitle: decodeURIComponent(eventName),
    date: decodeURIComponent(eventDate),
    time: decodeURIComponent(eventTime),
    venue: "Grand Arena, Downtown",
    ticketCount: parseInt(ticketCount),
    image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop",
    attendees: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3"
    ]
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    // 🟠 STEP 4: Trigger the PDF generation logic from our utility
    await generateTicketPDF("hidden-ticket-template", `Ticket-${orderData.id}.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden">

      {/* 🟢 HIDDEN TEMPLATE FOR PDF GENERATION */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <TicketPDFTemplate
          id="hidden-ticket-template"
          orderId={orderData.id}
          eventTitle={orderData.eventTitle}
          date={orderData.date}
          time={orderData.time}
          location={orderData.venue}
          seatInfo="Section A, Row 4, Seat 12-15"
          userName="Alex Johnson"
        />
      </div>

      <div className="max-w-xl mx-auto px-6 py-16 md:py-24 space-y-12">

        {/* 🏆 Header Section: Success Badge & Headline */}
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative group">
            <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
              <CheckCircle2 size={48} className="text-green-500 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
              Your tickets are secured!
            </h1>
            <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
              We&apos;ve sent a confirmation email to your inbox. Get ready for an unforgettable experience!
            </p>
          </div>
        </div>

        {/* 🎟️ Ticket Detail Card: Glassmorphism Design */}
        <div className="relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-50 transition-opacity duration-500" />
          <div className="relative bg-[#0f172a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row">

              {/* Event Image & Confirmed Badge */}
              <div className="md:w-[42%] relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={orderData.image}
                  alt={orderData.eventTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6">
                  <div className="px-3 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                    CONFIRMED
                  </div>
                </div>
              </div>

              {/* Order Metadata */}
              <div className="flex-1 p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">
                    Order ID : {orderData.id}
                  </span>
                  <button className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-300 transition-colors">
                    <Calendar size={12} /> Add to Calendar
                  </button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-white leading-tight tracking-tight uppercase italic underline decoration-indigo-500/30 underline-offset-8">
                    {orderData.eventTitle}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 group/item">
                      <Calendar size={16} className="text-indigo-500 group-hover/item:scale-110 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">{orderData.date} • {orderData.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 group/item">
                      <MapPin size={16} className="text-indigo-500 group-hover/item:scale-110 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">{orderData.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {orderData.attendees.map((avatar, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] overflow-hidden">
                        <Image src={avatar} alt="Attendee" width={32} height={32} />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-indigo-600 flex items-center justify-center text-[10px] font-black">
                      +2
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {orderData.ticketCount} Tickets Total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⚡ Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-[1.25rem] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95 group"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                Download Tickets (PDF)
              </>
            )}
          </button>
          <Link
            href="/bookings"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[1.25rem] font-black uppercase tracking-widest transition-all active:scale-95 group"
          >
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            View My Bookings
          </Link>
        </div>

        {/* 🚀 What's Next Section */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 pt-8 border-t border-white/5">
          <h3 className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">What&apos;s next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Share */}
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/5 transition-colors text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <Share2 size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-tight">Share the vibe</p>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">Tell your friends you&apos;re going and invite them to join.</p>
              </div>
            </div>
            {/* Route */}
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/5 transition-colors text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <Navigation size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-tight">Plan your route</p>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">View parking options and public transit directions.</p>
              </div>
            </div>
            {/* Merch */}
            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/5 transition-colors text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <ShoppingBag size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-tight">Event Merch</p>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">Pre-order official festival gear at 10% off today.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 📞 Footer Support */}
        <div className="pt-12 text-center space-y-2 animate-in fade-in duration-1000 delay-700">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
            Need help with your booking? <button className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">Contact Support</button>
          </p>
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-8">
            &copy; 2026 TicketMaster. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
