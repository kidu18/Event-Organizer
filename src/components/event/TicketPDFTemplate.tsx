"use client";

import React from "react";
import { QrCode, MapPin, Calendar, Clock, Ticket } from "lucide-react";

interface TicketPDFTemplateProps {
  id: string;
  orderId: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  seatInfo: string;
  userName: string;
}

/**
 * 🎫 TICKET PDF TEMPLATE
 * This component is designed for PDF rendering. It uses a high-contrast dark theme
 * matched to the "Your tickets are secured" UI.
 */
export default function TicketPDFTemplate({
  id,
  orderId,
  eventTitle,
  date,
  time,
  location,
  seatInfo,
  userName
}: TicketPDFTemplateProps) {
  return (
    <div 
      id={id}
      className="w-[600px] bg-[#020617] text-white p-12 relative overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />

      {/* Main Ticket Border */}
      <div className="relative border-2 border-white/10 rounded-[3rem] p-10 bg-[#0f172a]/50 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
             <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">OFFICIAL TICKET</h4>
             <h1 className="text-3xl font-black uppercase tracking-tight italic">{eventTitle}</h1>
          </div>
          <div className="text-right">
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">ORDER ID</p>
             <p className="text-white font-black">{orderId}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Calendar size={20} />
               </div>
               <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">DATE</p>
                  <p className="text-sm font-black uppercase">{date}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Clock size={20} />
               </div>
               <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">TIME</p>
                  <p className="text-sm font-black uppercase">{time}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <MapPin size={20} />
               </div>
               <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">LOCATION</p>
                  <p className="text-sm font-black uppercase">{location}</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Ticket size={20} />
               </div>
               <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">SEAT / SECTION</p>
                  <p className="text-sm font-black uppercase">{seatInfo}</p>
               </div>
            </div>
            <div>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">PASSENGER / ATTENDEE</p>
               <p className="text-lg font-black uppercase italic text-indigo-400">{userName}</p>
            </div>
          </div>
        </div>

        {/* Footer with QR Code */}
        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
           <div className="space-y-2">
              <p className="text-[10px] text-slate-500 font-bold max-w-[200px]">
                Please arrive at least 30 minutes before the event starts. This ticket is non-transferable.
              </p>
              <div className="flex gap-4">
                 <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">VERIFIED BY TICKETMASTER</span>
              </div>
           </div>
           
           <div className="p-4 bg-white rounded-3xl group transition-transform">
              <QrCode size={80} className="text-black" />
           </div>
        </div>

      </div>

      {/* Decorative Barcode-like element */}
      <div className="mt-8 flex justify-center opacity-20">
         <div className="h-12 w-full flex gap-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-white h-full" 
                style={{ width: `${(i % 4) + 1}px`, opacity: i % 2 === 0 ? 1 : 0.5 }} 
              />
            ))}
         </div>
      </div>
    </div>
  );
}
