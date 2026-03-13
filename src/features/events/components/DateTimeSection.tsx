"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventFormValues } from "../schemas/event-schema";
import Input from "@/components/ui/Input";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
}

export default function DateTimeSection({ register, errors }: Props) {
    return (
        <section className="space-y-6 bg-[#0f172a]/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Event Date & Time</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    label="Event Date"
                    type="date"
                    {...register("dateTime.date")}
                    error={errors.dateTime?.date?.message}
                />

                <Input
                    label="Start Time"
                    type="time"
                    {...register("dateTime.startTime")}
                    error={errors.dateTime?.startTime?.message}
                />

                <Input
                    label="End Time"
                    type="time"
                    {...register("dateTime.endTime")}
                    error={errors.dateTime?.endTime?.message}
                />
            </div>

            {errors.dateTime?.root && (
                <p className="text-xs text-red-500 mt-1">{errors.dateTime.root.message}</p>
            )}
        </section>
    );
}
