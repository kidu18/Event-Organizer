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

export const db = {
    user: {
        findUnique: ({ where: { email } }: { where: { email: string } }) => {
            return users.find(u => u.email === email);
        }
    }
};

