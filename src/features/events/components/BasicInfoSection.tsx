"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventFormValues } from "../schemas/event-schema";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
}

export default function BasicInfoSection({ register, errors }: Props) {
    return (
        <section className="space-y-6 bg-[#0f172a]/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Event Title"
                    placeholder="e.g. React Summit 2026"
                    {...register("title")}
                    error={errors.title?.message}
                />

                <div className="block w-full">
                    <span className="text-sm font-medium text-gray-300 mb-1 block">Category</span>
                    <select
                        {...register("category")}
                        className={`bg-[#0f172a] border ${errors.category ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Music">Music</option>
                        <option value="Business">Business</option>
                        <option value="Startup">Startup</option>
                        <option value="Workshop">Workshop</option>
                    </select>
                    {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
                </div>
            </div>

            <Textarea
                label="Event Description"
                placeholder="Describe what your event is about..."
                {...register("description")}
                error={errors.description?.message}
            />
        </section>
    );
}
