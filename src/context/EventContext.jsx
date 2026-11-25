
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const EventContext = createContext();

const defaultEvents = [
  {
    id: "1",
    name: "International Robotics Expo",
    category: "Technology",
    date: "2026-12-11",
    time: "10:00 AM",
    venue: "KL University",
    price: 299,
    description: "Explore robotics, automation and futuristic innovations.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: "2",
    name: "Samyak Cultural Fest",
    category: "Cultural",
    date: "2026-12-12",
    time: "09:00 AM",
    venue: "KL University",
    price: 499,
    description: "Experience music, dance, culture and unforgettable performances.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  },
  {
    id: "3",
    name: "National Tech Summit",
    category: "Technology",
    date: "2026-12-15",
    time: "11:00 AM",
    venue: "Vijayawada",
    price: 199,
    description: "Discover the latest technology trends and innovations.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  }
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("eventra_events");
      return saved ? JSON.parse(saved) : defaultEvents;
    } catch {
      return defaultEvents;
    }
  });

  useEffect(() => {
    localStorage.setItem("eventra_events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents((previous) => [
      ...previous,
      { ...event, id: crypto.randomUUID() }
    ]);
  };

  const deleteEvent = (id) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  const updateEvent = (updatedEvent) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
