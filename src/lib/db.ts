/** CONCEPT: The Identity Source. This file mimics a real database where user credentials and profiles are stored. */
// This is a mock database for demonstration purposes.
// In a real application, you would use Prisma, Drizzle, or a direct database driver.

export const users = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: "password123", // In a real app, this MUST be hashed!
        role: "admin",
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        role: "user",
    }
];

export const events = [
    {
        id: "1",
        title: "Summer Jazz Nights",
        description: "A wonderful evening of smooth jazz in the heart of the city.",
        location: "Metropolis Arena",
        date: "2024-06-15",
        price: 85.00,
        totalCapacity: 500,
        currentBookings: 120,
    },
    {
        id: "2",
        title: "Tech Summit 2024",
        description: "Explore the latest in artificial intelligence and web development.",
        location: "Grand Hall 4",
        date: "2024-09-20",
        price: 299.00,
        totalCapacity: 1000,
        currentBookings: 850,
    }
];

export const bookings = [
    {
        id: "b1",
        userId: "2",
        eventId: "1",
        seat: "SEC-B | R12",
        price: 85.00,
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
    }
];

export const db = {
    user: {
        findUnique: ({ where: { email } }: { where: { email: string } }) => {
            return users.find(u => u.email === email);
        },
        findMany: () => users,
    },
    event: {
        findMany: () => events,
        create: (data: any) => {
            const nextId = (events.length + 1).toString();
            const newEvent = { ...data, id: nextId, currentBookings: 0 };
            events.push(newEvent);
            return newEvent;
        },
        delete: ({ where: { id } }: { where: { id: string } }) => {
            const index = events.findIndex(e => e.id === id);
            if (index !== -1) return events.splice(index, 1)[0];
            return null;
        }
    },
    booking: {
        findMany: () => bookings,
    }
};

