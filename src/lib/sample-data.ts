import type { Event } from "@/types";

export const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'organizer'>[] = [
  {
    title: "Tech Innovation Summit 2024",
    description: "Join us for an exciting day of innovation, featuring keynote speakers from leading tech companies, hands-on workshops, and networking opportunities with industry professionals.",
    category: "Technology",
    image: {
      url: "/api/placeholder/400/200",
      thumbnail: undefined,
    },
    dateTime: {
      date: "2024-06-15",
      startTime: "09:00",
      endTime: "18:00",
    },
    location: {
      venueName: "Convention Center",
      city: "San Francisco",
      address: "1234 Market St, San Francisco, CA 94102",
      mapLink: "https://maps.google.com/?q=1234+Market+St+San+Francisco",
    },
    ticketing: {
      type: "Paid",
      price: 299,
      totalTickets: 500,
      availableTickets: 342,
    },
    status: "Published",
    qrSupport: true,
  },
  {
    title: "Summer Music Festival",
    description: "Experience an unforgettable day of live music featuring top artists from around the world. Food trucks, art installations, and great vibes all day long.",
    category: "Music",
    image: {
      url: "/api/placeholder/400/200",
      thumbnail: undefined,
    },
    dateTime: {
      date: "2024-07-20",
      startTime: "12:00",
      endTime: "23:00",
    },
    location: {
      venueName: "Golden Gate Park",
      city: "San Francisco",
      address: "501 Stanyan St, San Francisco, CA 94117",
      mapLink: "https://maps.google.com/?q=Golden+Gate+Park+San+Francisco",
    },
    ticketing: {
      type: "Paid",
      price: 89,
      totalTickets: 2000,
      availableTickets: 1567,
    },
    status: "Published",
    qrSupport: true,
  },
  {
    title: "Startup Pitch Night",
    description: "Watch promising startups pitch their ideas to a panel of venture capitalists. Network with entrepreneurs and investors in this exciting evening event.",
    category: "Startup",
    image: {
      url: "/api/placeholder/400/200",
      thumbnail: undefined,
    },
    dateTime: {
      date: "2024-05-28",
      startTime: "18:00",
      endTime: "21:00",
    },
    location: {
      venueName: "Innovation Hub",
      city: "Palo Alto",
      address: "445 Market St, Palo Alto, CA 94301",
      mapLink: "https://maps.google.com/?q=445+Market+St+Palo+Alto",
    },
    ticketing: {
      type: "Free",
      price: 0,
      totalTickets: 150,
      availableTickets: 89,
    },
    status: "Published",
    qrSupport: true,
  },
  {
    title: "Digital Marketing Workshop",
    description: "Learn the latest digital marketing strategies from industry experts. Hands-on workshop covering SEO, social media marketing, and content strategy.",
    category: "Business",
    image: {
      url: "/api/placeholder/400/200",
      thumbnail: undefined,
    },
    dateTime: {
      date: "2024-06-08",
      startTime: "09:30",
      endTime: "17:00",
    },
    location: {
      venueName: "Business Center",
      city: "San Jose",
      address: "100 E San Fernando St, San Jose, CA 95112",
      mapLink: "https://maps.google.com/?q=100+E+San+Fernando+St+San+Jose",
    },
    ticketing: {
      type: "Paid",
      price: 149,
      totalTickets: 75,
      availableTickets: 42,
    },
    status: "Published",
    qrSupport: true,
  },
  {
    title: "AI & Machine Learning Conference",
    description: "Deep dive into the latest developments in artificial intelligence and machine learning. Research presentations, workshops, and expert panels.",
    category: "Technology",
    image: {
      url: "/api/placeholder/400/200",
      thumbnail: undefined,
    },
    dateTime: {
      date: "2024-08-10",
      startTime: "08:00",
      endTime: "19:00",
    },
    location: {
      venueName: "Tech Campus",
      city: "Mountain View",
      address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
      mapLink: "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View",
    },
    ticketing: {
      type: "Paid",
      price: 399,
      totalTickets: 300,
      availableTickets: 276,
    },
    status: "Published",
    qrSupport: true,
  },
];

export function initializeSampleData() {
  if (typeof window === 'undefined') return;
  
  const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
  
  if (existingEvents.length === 0) {
    const eventsWithIds = sampleEvents.map((event, index) => ({
      ...event,
      id: `sample-${index + 1}`,
      organizer: {
        name: "Event Organizer Admin",
        userId: "admin",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    
    localStorage.setItem('events', JSON.stringify(eventsWithIds));
    console.log('Sample events initialized!');
  }
}
