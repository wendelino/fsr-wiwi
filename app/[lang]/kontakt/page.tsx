import { ContactForm } from "@/components/ContactForm";
import InstagramEmbed from "@/components/InstagramEmbed";
import { Header, SubHeader } from "@/components/TextComponents";

export default function page() {
  return (
    <>
    <div className="grid md:grid-cols-2 mt-16 lg:gap-32 items-center p-8 md:px-16  rounded-xl shadow-xl border">
      <Header>
        Schreib uns eine <span className="fsr-gradient">Nachricht</span>
      </Header> 
      <ContactForm />

    </div>

      {/* <Header>Kontakt</Header>
      <div className="flex flex-col gap-2 text-lg font-semibold mb-32">
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
      </div> */}

      <Header className="mt-32">
        Folg uns auf <span className="text-gradient">Instagram</span>
      </Header>
      <InstagramEmbed />
    </>
  );
}
