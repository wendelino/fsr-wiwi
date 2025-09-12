import { getEvents } from "@/app/_actions/event";
import { EventProps } from "@/components/Event";
import { SelectEvent } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents"; 

export default async function page() {
  
  
  const {events} = await getEvents({filter: {registrable: true}, limit: 100, tag:"ersti25"});
 

  return (
    <div className="flex flex-col items-center">
      <Header>Anmeldung</Header>
      <SelectEvent events={events} />
    </div>
  );
}
