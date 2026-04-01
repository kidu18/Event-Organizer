/**
 * CONCEPT: Booking API Services
 * Handles seat reservations and booking confirmations
 */

import { Booking, BookSeatsRequest } from '@/types/booking';

// API Base URL - Consistent with other services
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? "http://localhost:3000" 
  : (process.env.NEXT_PUBLIC_API_URL || "https://event-ticket-production.up.railway.app");

/**
 * Get authentication headers for API requests
 */
const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

/**
 * Handle API errors
 */
const handleApiError = async (response: Response) => {
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) {
        throw new Error('Unauthorized - Please login to book tickets');
    } else if (response.status === 400) {
        throw new Error(data?.message || 'Seats already taken or invalid event');
    } else {
        throw new Error(data?.message || 'Booking failed. Please try again.');
    }
};

/**
 * Book seats for an event
 * POST /api/bookings/book
 */
export async function bookSeats(bookingData: BookSeatsRequest): Promise<Booking> {
    try {
        console.log('🎟️ Booking seats:', bookingData);
        
        const response = await fetch(`${API_BASE_URL}/api/bookings/book`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            await handleApiError(response);
        }

        const data = await response.json();
        console.log('✅ Booking successful:', data.id);
        return data;
    } catch (error) {
        console.error('❌ Failed to book seats:', error);
        throw error;
    }
}
