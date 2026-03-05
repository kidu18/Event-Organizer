"use client";
import { useState } from "react";

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    return { tickets };
};
