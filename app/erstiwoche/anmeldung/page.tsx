import { RegisterForm } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents";

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <Header>Bei <span className="fsr-gradient">Veranstaltung</span> anmelden</Header>
      <RegisterForm />
    </div>
  );
}
