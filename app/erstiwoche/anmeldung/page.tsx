import { SelectEvent } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents";
import db from "@/db/db";

export default async function page() {
  const events = await db.event_DB.findMany({
    include: {
      location_DB: true,
    },
  });

  return (
    <div className="flex flex-col items-center">
      <Header>Anmeldung</Header>
      <SelectEvent events={events} />
    </div>
  );
}
