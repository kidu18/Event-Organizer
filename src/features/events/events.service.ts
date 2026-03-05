import { Event } from "../../types/event";

export const eventsService = {
  async getAll(): Promise<Event[]> {
    return [];
  },
  async getById(id: string): Promise<Event | null> {
    return null;
  }
};
