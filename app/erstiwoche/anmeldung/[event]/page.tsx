import { Register4Event } from "@/components/RegisterForm";
import { Header, SubHeader } from "@/components/TextComponents";
import db from "@/db/db";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { event: string } }) {
  const event = decodeURIComponent(params.event);

  const selectedEvent = await db.event_DB.findFirst({
    where: {
      title: event,
    },
  });

  if (!selectedEvent) {
    redirect("/erstiwoche/anmeldung");
  }

  return (
    <div className="flex flex-col items-center">
      <Header className=" fsr-gradient">
        {event}
      </Header>
      <SubHeader className="-mt-12 lg:-mt-20">Anmeldeformular</SubHeader>

      <Register4Event event={event} />
    </div>
  );
}
