"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormValues } from "../schemas/event-schema";
import BasicInfoSection from "./BasicInfoSection";
import DateTimeSection from "./DateTimeSection";
import LocationSection from "./LocationSection";
import TicketSection from "./TicketSection";
import ImageUploadSection from "./ImageUploadSection";
import { Save, Send, X } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CreateEventForm() {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            category: undefined,
            dateTime: {
                date: "",
                startTime: "",
                endTime: "",
            },
            location: {
                venueName: "",
                city: "",
                address: "",
                mapLink: "",
            },
            ticketing: {
                type: "Free",
                price: 0,
                totalTickets: 0,
            },
            status: "Draft",
            qrSupport: true,
        }
    });

    const { register, control, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = form;

    const onSaveDraft = async (data: EventFormValues) => {
        console.log("Saving Draft:", { ...data, status: "Draft" });
        // Simulate API call to NestJS
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Draft saved successfully!");
    };

    const onPublish = async (data: EventFormValues) => {
        console.log("Publishing Event:", { ...data, status: "Published" });
        // Simulate API call to NestJS
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Event published successfully!");
    };

    return (
        <form className="max-w-4xl mx-auto pb-20">
            <div className="space-y-8">
                <BasicInfoSection register={register} errors={errors} />

                <DateTimeSection register={register} errors={errors} />

                <LocationSection register={register} errors={errors} watch={watch} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TicketSection register={register} errors={errors} watch={watch} />
                    <ImageUploadSection register={register} errors={errors} setValue={setValue} />
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#020617]/80 backdrop-blur-md border-t border-slate-800 p-4 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-6 py-2.5 transition-all"
                    >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                    </Button>

                    <div className="flex items-center space-x-4">
                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleSubmit(onSaveDraft)}
                            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-6 py-2.5 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Draft</span>
                        </Button>

                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleSubmit(onPublish)}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-2.5 font-semibold transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Send className="w-4 h-4" />
                            <span>Publish Event Now</span>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
