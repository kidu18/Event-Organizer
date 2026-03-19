"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { EventFormValues } from "../schemas/event-schema";
import Input from "@/components/ui/Input";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
    watch: UseFormWatch<EventFormValues>;
}

export default function TicketSection({ register, errors, watch }: Props) {
    const ticketType = watch("ticketing.type");

    return (
        <section className="space-y-6 bg-[#0f172a]/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Ticket Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="block w-full">
                    <span className="text-sm font-medium text-gray-300 mb-1 block">Ticket Type</span>
                    <select
                        {...register("ticketing.type")}
                        className={`bg-[#0f172a] border ${errors.ticketing?.type ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                        <option value="Invite Only">Invite Only</option>
                    </select>
                    {errors.ticketing?.type && <p className="text-xs text-red-500 mt-1">{errors.ticketing.type.message}</p>}
                </div>

                <Input
                    label="Ticket Price"
                    type="number"
                    disabled={ticketType === "Free"}
                    placeholder="0.00"
                    {...register("ticketing.price", { valueAsNumber: true })}
                    error={errors.ticketing?.price?.message}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Total Tickets Available"
                    type="number"
                    placeholder="e.g. 100"
                    {...register("ticketing.totalTickets", { valueAsNumber: true })}
                    error={errors.ticketing?.totalTickets?.message}
                />

                <div className="flex items-center space-x-3 pt-8">
                    <input
                        type="checkbox"
                        id="qrSupport"
                        {...register("qrSupport")}
                        className="w-5 h-5 rounded border-slate-700 bg-[#0f172a] text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="qrSupport" className="text-sm font-medium text-gray-300">
                        Support QR Code Tickets
                    </label>
                </div>
            </div>
        </section>
    );
}
