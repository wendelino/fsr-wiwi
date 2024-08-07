"use client";
import { useData } from "@/components/DataContext";
import { SelectEvent } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents"; 

export default function page() {
  const { events, loading } = useData();

  return (
    <div className="flex flex-col items-center">
      <Header>Anmeldung</Header>
      <SelectEvent
        events={events.filter((e) => e.registrable)}
        loading={loading}
      />
    </div>
  );
}
