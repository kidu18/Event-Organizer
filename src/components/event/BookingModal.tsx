"use client";

import React, { useEffect, useState } from "react";
import { X, Armchair, ShieldCheck, Timer, ArrowRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface SelectedSeat {
  id: string;
  row: string;
  number: string;
  section: string;
  price: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  selectedSeats: SelectedSeat[];
}

/**
 * 🔵 STEP 1: Define the BookingModal component for confirming ticket purchase.
 * Enhanced to show event date and time.
 */
export default function BookingModal({ isOpen, onClose, eventTitle, eventDate, eventTime, selectedSeats }: BookingModalProps) {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // 🔵 STEP 2: Handle booking countdown timer (10 minutes).
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")} LEFT`;
  };

  // 🔵 STEP 3: Calculate totals for the breakdown.
  const subtotal = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  const serviceFee = subtotal * 0.1; // 10%
  const facilityFee = subtotal > 0 ? 0.5 : 0;
  const totalAmount = subtotal + serviceFee + facilityFee;

  // 🔵 STEP 9: Handle the "Proceed to Payment" flow.
  const handleProceedToPayment = async () => {
    setIsBooking(true);
    
    // Logic for zero configuration -> done:
    // 1. Create a PaymentIntent via backend (Mocked here for now)
    // 2. Redirect to Success OR mount Stripe Payment Element
    
    setTimeout(() => {
      setIsBooking(false);
      // Constructing query params with event data for the success page
      const params = new URLSearchParams({
        event: eventTitle,
        date: eventDate,
        time: eventTime,
        count: selectedSeats.length.toString(),
      });
      router.push(`/checkout-success?${params.toString()}`);
      onClose();
    }, 2000); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 🔵 STEP 4: Backdrop overlay with blur effect. */}
      <div 
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* 🔵 STEP 5: Main Modal Container. */}
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header Area */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between font-black">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Confirm Your Booking</h2>
            {/* 🔵 STEP 5.1: Display the event details for extra clarity. */}
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 truncate max-w-[350px]">
              {eventTitle} • {eventDate} at {eventTime}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
          
          {/* Seats Selection Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              SEATS SELECTED ({selectedSeats.length})
            </h3>
            <button className="text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-300 transition-colors">
              Edit Selection
            </button>
          </div>

          {/* 🔵 STEP 6: Selected Seats List. */}
          <div className="space-y-3">
            {selectedSeats.length > 0 ? selectedSeats.map((seat) => (
              <div 
                key={seat.id} 
                className="group flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/[0.08]"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                  <Armchair size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-sm">Row {seat.row}, Seat {seat.number}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-tight">{seat.section}</p>
                </div>
                <p className="text-white font-black text-lg tracking-tighter italic">${seat.price.toFixed(2)}</p>
              </div>
            )) : (
              <p className="text-slate-500 text-sm text-center py-4 italic">No seats selected yet.</p>
            )}
          </div>

          {/* 🔵 STEP 7: Detailed Price Breakdown. */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center group">
               <span className="text-slate-400 text-sm font-bold group-hover:text-slate-300 transition-colors">Subtotal</span>
               <span className="text-white font-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center group">
               <span className="text-slate-400 text-sm font-bold group-hover:text-slate-300 transition-colors">Service Fee (10%)</span>
               <span className="text-white font-black">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center group border-b border-white/5 pb-4">
               <span className="text-slate-400 text-sm font-bold group-hover:text-slate-300 transition-colors">Facility Fee</span>
               <span className="text-white font-black">${facilityFee.toFixed(2)}</span>
            </div>
          </div>

          {/* 🔵 STEP 8: Total Amount Section. */}
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">TOTAL AMOUNT</span>
             <div className="flex items-baseline justify-between group">
                <h4 className="text-6xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform duration-500">
                   ${totalAmount.toFixed(2)}
                </h4>
                <div className="text-right">
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:text-slate-400">
                      <Info size={12} className="text-indigo-500" /> Inclusive of all taxes
                   </p>
                </div>
             </div>
          </div>

          {/* 🔵 STEP 10: Action Buttons. */}
          <div className="flex flex-col gap-6 pt-4">
            <button 
              onClick={handleProceedToPayment}
              disabled={isBooking}
              className="w-full py-6 bg-indigo-600 disabled:bg-indigo-600/50 text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <span className="relative z-10">{isBooking ? "PROCESSING..." : "PROCEED TO PAYMENT"}</span>
              {!isBooking && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button 
              onClick={onClose}
              disabled={isBooking}
              className="text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group"
            >
              Cancel and Return
            </button>
          </div>
        </div>

        {/* 🔵 STEP 10: Secure Checkout Footer. */}
        <div className="p-6 bg-black/40 backdrop-blur-xl flex items-center justify-center gap-8 border-t border-white/5">
           <div className="flex items-center gap-2 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
              <ShieldCheck size={14} className="text-indigo-500 shadow-xl" />
              Secure Checkout
           </div>
           <div className="h-4 w-px bg-white/10" />
           <div className="flex items-center gap-2 text-indigo-400 uppercase text-[10px] font-black tracking-[0.2em] animate-pulse">
              <Timer size={14} />
              {formatTime(timeLeft)}
           </div>
        </div>
      </div>
    </div>
  );
}
