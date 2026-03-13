"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { EventFormValues } from "../schemas/event-schema";
import Input from "@/components/ui/Input";
import { MapPin } from "lucide-react";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
    watch: UseFormWatch<EventFormValues>;
}

export default function LocationSection({ register, errors, watch }: Props) {
    const address = watch("location.address");
    const city = watch("location.city");
    const venue = watch("location.venueName");

    const handleOpenMap = () => {
        const query = [venue, address, city].filter(Boolean).join(", ");
        if (!query) {
            alert("Please enter a venue or address first!");
            return;
        }
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        window.open(url, "_blank");
    };

    return (
        <section className="space-y-6 bg-[#0f172a]/50 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Location</h3>
                <button
                    type="button"
                    onClick={handleOpenMap}
                    className="flex items-center space-x-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
                >
                    <MapPin className="w-4 h-4" />
                    <span>Find on Google Maps</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Venue Name"
                    placeholder="e.g. Convention Center"
                    {...register("location.venueName")}
                    error={errors.location?.venueName?.message}
                />

                <Input
                    label="City"
                    placeholder="e.g. San Francisco"
                    {...register("location.city")}
                    error={errors.location?.city?.message}
                />
            </div>

            <Input
                label="Full Address"
                placeholder="123 Event St, Suite 100..."
                {...register("location.address")}
                error={errors.location?.address?.message}
            />

            <div className="space-y-2">
                <Input
                    label="Google Maps Link"
                    placeholder="https://maps.google.com/..."
                    {...register("location.mapLink")}
                    error={errors.location?.mapLink?.message}
                />
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                    Search for the venue above, then copy and paste the URL here.
                </p>
            </div>
        </section>
    );
}
