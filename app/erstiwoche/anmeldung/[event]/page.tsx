import { getEvents } from "@/app/_actions/event";
import { EventProps } from "@/components/Event";
import { Register4Event } from "@/components/RegisterForm";
import { Header, SubHeader } from "@/components/TextComponents"; 
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { event: string } }) {
  const event_title = decodeURIComponent(params.event); 
  const events: EventProps[] = await getEvents(); 

  const event = events.filter((e) => e.title == event_title);

  if (event.length != 1) {
    redirect("/erstiwoche/anmeldung");
  }

  return (
    <div className="flex flex-col items-center">
      <Header className=" fsr-gradient">{event_title}</Header>
      <SubHeader className="-mt-12 lg:-mt-20">Anmeldeformular</SubHeader>

      <Register4Event event={event[0]} />
    </div>
  );
}

export async function generateStaticParams() {
  const events  = await getEvents(); 
 
  return events.map((item) => ({
    event: encodeURIComponent(item.title)
  }))
}
 