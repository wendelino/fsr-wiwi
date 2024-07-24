import { RegisterNewsletter } from "@/components/RegisterForm";
import { Header, SubHeader } from "@/components/TextComponents";

export default function page() {
  return (
    <div>
      <Header>Kontakt</Header>
      <div>
        <div>Adresse</div>
        <div>Mail</div>
      </div> 
      <Header>
        Unser <span className="fsr-gradient">Newsletter</span>
      </Header>
      <RegisterNewsletter />
    </div>
  );
}
