import { Register4Event } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents";
import db from "@/db/db";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { event: string } }) {


  const event = decodeURIComponent(params.event);

  const selectedEvent = await db.event_DB.findFirst({
    where: {
      title: event,  
    },
  });

  if (!selectedEvent) { redirect("/erstiwoche/anmeldung") }

  return (
    <div className="flex flex-col items-center">
      <Header>
        Anmeldeformular für <br />
        <span className="fsr-gradient">{event}</span>{" "}
      </Header>

      <Register4Event event={event} />
    </div>
  );
}
