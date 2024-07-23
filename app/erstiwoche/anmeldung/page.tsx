
 import { RegisterForm } from "@/components/RegisterForm";
import { AnimatedEvents, Header } from "@/components/TextComponents";
import db from "@/db/db";

export default async function page() { 

  const events = await db.event_DB.findMany();


  return (
    <div className="flex flex-col items-center">
      <Header >Anmeldung</Header> 
      <RegisterForm events={events} />
    </div>
  );
}
