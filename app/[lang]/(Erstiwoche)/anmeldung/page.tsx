import { getEvents } from "@/app/_actions/event";
import { EventProps } from "@/components/Event";
import { SelectEvent } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents"; 

export default async function page() {
  
  
  const events: EventProps[] = await getEvents();

  return (
    <div className="flex flex-col items-center">
      <Header>Anmeldung</Header>
      <SelectEvent events={events.filter(e => (e.registrable))} />
    </div>
  );
}
