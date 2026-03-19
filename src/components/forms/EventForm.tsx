"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventFormValues } from "@/features/events/schemas/event-schema";
import { Calendar, MapPin, Clock, DollarSign, Users, Image, Tag } from "lucide-react";

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  isLoading?: boolean;
}

export default function EventForm({ onSubmit, isLoading = false }: EventFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: "Draft",
      qrSupport: true,
      ticketing: {
        type: "Free",
        price: 0,
        totalTickets: 100,
      },
    },
  });

  const ticketType = watch("ticketing.type");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Basic Information
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Event Title *
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your event..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category *
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Startup">Startup</option>
            <option value="Workshop">Workshop</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Date & Time */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Date & Time
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            {...register("dateTime.date")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.dateTime?.date && (
            <p className="mt-1 text-sm text-red-400">{errors.dateTime.date.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Start Time *
            </label>
            <input
              type="time"
              {...register("dateTime.startTime")}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.dateTime?.startTime && (
              <p className="mt-1 text-sm text-red-400">{errors.dateTime.startTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              End Time *
            </label>
            <input
              type="time"
              {...register("dateTime.endTime")}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.dateTime?.endTime && (
              <p className="mt-1 text-sm text-red-400">{errors.dateTime.endTime.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Venue Name *
          </label>
          <input
            {...register("location.venueName")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Convention Center"
          />
          {errors.location?.venueName && (
            <p className="mt-1 text-sm text-red-400">{errors.location.venueName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              City *
            </label>
            <input
              {...register("location.city")}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., New York"
            />
            {errors.location?.city && (
              <p className="mt-1 text-sm text-red-400">{errors.location.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Address *
            </label>
            <input
              {...register("location.address")}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Full address"
            />
            {errors.location?.address && (
              <p className="mt-1 text-sm text-red-400">{errors.location.address.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Map Link (optional)
          </label>
          <input
            {...register("location.mapLink")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://maps.google.com/..."
          />
          {errors.location?.mapLink && (
            <p className="mt-1 text-sm text-red-400">{errors.location.mapLink.message}</p>
          )}
        </div>
      </div>

      {/* Ticketing */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <Users className="w-5 h-5" />
          Ticketing
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Ticket Type *
          </label>
          <select
            {...register("ticketing.type")}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
            <option value="Invite Only">Invite Only</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Price {ticketType === "Free" && "(Free = $0)"}
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("ticketing.price", { valueAsNumber: true })}
              disabled={ticketType === "Free"}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              placeholder="0.00"
            />
            {errors.ticketing?.price && (
              <p className="mt-1 text-sm text-red-400">{errors.ticketing.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Total Tickets *
            </label>
            <input
              type="number"
              min="1"
              {...register("ticketing.totalTickets", { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="100"
            />
            {errors.ticketing?.totalTickets && (
              <p className="mt-1 text-sm text-red-400">{errors.ticketing.totalTickets.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Event Image */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <Image className="w-5 h-5" />
          Event Image
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-black hover:file:bg-indigo-700"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Event preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Publish Event"}
        </button>
      </div>
    </form>
  );
}
