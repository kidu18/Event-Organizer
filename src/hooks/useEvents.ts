"use client";
import { useState } from "react";

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    return { events };
};
