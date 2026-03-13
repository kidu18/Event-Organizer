import * as z from "zod";

/**
 * CONCEPT: The Guard.
 * This Zod schema ensures that only valid data can be submitted.
 * It provides real-time error messages to the user.
 */

export const eventSchema = z.object({
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title is too long"),

    description: z.string()
        .min(20, "Description should be at least 20 characters for better SEO"),

    category: z.enum(["Technology", "Music", "Business", "Startup", "Workshop"], {
        errorMap: () => ({ message: "Please select a valid category" }),
    }),

    // Date & Time
    dateTime: z.object({
        date: z.string().min(1, "Event date is required"),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format (HH:mm)"),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format (HH:mm)"),
    }).refine((data) => {
        // Basic logic: End time must be after start time (could be more complex with Date objects)
        return data.endTime > data.startTime;
    }, {
        message: "End time must be after start time",
        path: ["endTime"],
    }),

    // Location
    location: z.object({
        venueName: z.string().min(3, "Venue name is required"),
        city: z.string().min(2, "City is required"),
        address: z.string().min(5, "Full address is required"),
        mapLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    }),

    // Ticketing
    ticketing: z.object({
        type: z.enum(["Free", "Paid", "Invite Only"]),
        price: z.number().min(0, "Price cannot be negative"),
        totalTickets: z.number().int().min(1, "Must have at least 1 ticket available"),
    }).refine((data) => {
        if (data.type === "Free" && data.price > 0) return false;
        return true;
    }, {
        message: "Free tickets must have a price of 0",
        path: ["price"],
    }),

    // Settings
    status: z.enum(["Draft", "Published", "Cancelled", "Sold Out"]).default("Draft"),
    qrSupport: z.boolean().default(true),

    // Image (can be a File or a URL string)
    image: z.any().optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
