"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/eventServices";
import { eventSchema, EventFormValues } from "../schemas/event-schema";
import BasicInfoSection from "./BasicInfoSection";
import DateTimeSection from "./DateTimeSection";
import LocationSection from "./LocationSection";
import TicketSection from "./TicketSection";
import ImageUploadSection from "./ImageUploadSection";
import { Save, Send, X } from "lucide-react";
import Button from "@/components/ui/Button";

interface EventFormProps {
  onEventCreated?: () => void;
  onClose?: () => void;
}

export default function CreateEventForm({ onEventCreated, onClose }: EventFormProps = {}) {
    const router = useRouter();
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
        try {
            console.log("🚀 Saving Draft:", data);
            
            // Convert form data to backend API format
            const eventData = {
                title: data.title,
                description: data.description,
                date: new Date(`${data.dateTime.date}T${data.dateTime.startTime}:00Z`).toISOString(),
                location: `${data.location.venueName}, ${data.location.city}`,
                capacity: data.ticketing.totalTickets,
                registeredCount: 0,
                basePrice: data.ticketing.price,
                isActive: false, // Draft events are not active
                imageUrl: "https://example.com/event-image.jpg", // Default image
                googleMapsUrl: data.location.mapLink || `https://maps.google.com/?q=${encodeURIComponent(data.location.address)}`
            };

            const createdEvent = await createEvent(eventData);
            console.log("✅ Draft saved successfully:", createdEvent);
            alert("Draft saved successfully!");
            
            // Call callbacks
            onEventCreated?.();
            onClose?.();
        } catch (error) {
            console.error("❌ Failed to save draft:", error);
            alert(`Failed to save draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const onPublish = async (data: EventFormValues) => {
        try {
            console.log("🚀 Publishing Event:", data);
            
            // Convert form data to backend API format
            const eventData = {
                title: data.title,
                description: data.description,
                date: new Date(`${data.dateTime.date}T${data.dateTime.startTime}:00Z`).toISOString(),
                location: `${data.location.venueName}, ${data.location.city}`,
                capacity: data.ticketing.totalTickets,
                registeredCount: 0,
                basePrice: data.ticketing.price,
                isActive: true, // Published events are active
                imageUrl: "https://example.com/event-image.jpg", // Default image
                googleMapsUrl: data.location.mapLink || `https://maps.google.com/?q=${encodeURIComponent(data.location.address)}`
            };

            const createdEvent = await createEvent(eventData);
            console.log("✅ Event published successfully:", createdEvent);
            alert("Event published successfully!");
            
            // Call callbacks
            onEventCreated?.();
            onClose?.();
        } catch (error) {
            console.error("❌ Failed to publish event:", error);
            alert(`Failed to publish event: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
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

            {/* Action Buttons */}
            <div className="border-t border-slate-700 pt-6 mt-8">
                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-6 py-2.5 transition-all"
                    >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                    </Button>

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
        </form>
    );
}
