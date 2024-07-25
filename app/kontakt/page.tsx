import InstagramEmbed from "@/components/InstagramEmbed";
import { RegisterNewsletter } from "@/components/RegisterForm";
import { Header, SubHeader } from "@/components/TextComponents";
import { MailIcon, MapPin } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Header>Kontakt</Header>
      <div className="flex flex-col gap-2 text-lg font-semibold">
        <div className="flex gap-2 items-center">
          <MailIcon />{" "}
          <Link href="mailto:fachschaftsrat@wiwi.uni-halle.de">
            fachschaftsrat@wiwi.uni-halle.de
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <MapPin />
          <p className="text-center lg:text-start">
            Grosse Steinstrasse 73 <br />
            06108 Halle (Saale)
          </p>{" "}
        </div>
      </div>
      <Header>
        Unser <span className="fsr-gradient">Newsletter</span>
      </Header>
      <RegisterNewsletter />

      <Header>
        Folg uns auf <span className="text-gradient">Instagram</span>
      </Header>
      <InstagramEmbed />
    </div>
  );
}
