
import { RegisterForm } from "@/components/RegisterForm";
import { AnimatedEvents, AnimatedText, Header } from "@/components/TextComponents";

export default function page() {

  const events = [
    {label: "Veranstaltung"},
    {label: "Speedmeeting"},
    {label: "Stadtrallye"},
    {label: "Ersti-Party"}
  ] 

  return (
    <div className="flex flex-col items-center">
      <Header>Bei <span className="fsr-gradient"> <AnimatedEvents events={events} />  </span> anmelden</Header>
      <RegisterForm />
    </div>
  );
}
