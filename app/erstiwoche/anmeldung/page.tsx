
import { RegisterForm } from "@/components/RegisterForm";
import { AnimatedEvents, Header } from "@/components/TextComponents";

export default function page() { 

  return (
    <div className="flex flex-col items-center">
      <Header >Anmeldung</Header> 
      <RegisterForm />
    </div>
  );
}
