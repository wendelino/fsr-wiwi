"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { EventWithLocation, LocationProps } from "./Event";
import { getEvents } from "@/app/_actions/event";
import { getLocations } from "@/app/_actions/getLocations";

interface DataContextType {
  events: EventWithLocation[];
  locations: LocationProps[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventWithLocation[]>([]);
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userEntries = await getEvents();
      const userCategories = await getLocations();
      setEvents(userEntries);
      setLocations(userCategories);
      setLoading(false);
    })();
  }, []);

  return (
    <DataContext.Provider value={{ events, locations, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
