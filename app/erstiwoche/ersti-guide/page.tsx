import { Header, SubHeader } from "@/components/TextComponents";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react"; 
import Link from "next/link";
import Navigate from "./Navigate";

export default function page() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center py-8 mb-8"> 
        <Header>Leben in Halle</Header>
        <SubHeader className="text-center">
          Von Studierenden für Alle.
        </SubHeader> 
      <a href="/files/guide.pdf">
        <Button>
          <PaperclipIcon className="pr-2" /> Als PDF herunterladen
        </Button>
      </a> 
      </div>
      <Navigate/>
      <section id="essen" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Egal ob Hunger oder Durst, hier wird man glücklich
        </h2>
        <p>
          „To be aware“ bedeutet „sich etwas bewusst sein“. Dies bildet den
          Ausgangspunkt für die Awareness-Arbeit. Sie möchte für diverse
          Diskriminierungsformen und Gewalt (physisch oder psychisch)
          sensibilisieren und diesen dadurch vorbeugen.
          <br />
          <br />
          Ziel ist es, einen s.g. „Safer Space“ zu schaffen, wo sich alle
          Beteiligten wohl, sicher und gesehen fühlen können. Es ist ein sowohl
          individueller als auch kollektiver Lernprozess, der intern und bei
          allen Veranstaltungen unseres FSRs dazu gehört. Dieses Konzept richtet
          sich an alle unsere Mitglieder und Teilnehmer*innen unserer
          Veranstaltungen sowie die Arbeit innerhalb unseres FSRs.
        </p>
      </section>
      <section id="begriffsklaerung" className="mb-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-4  ">Begriffsklärung</h2>
        <Link
          href="https://awareness-akademie.de/glossar/"
          className="underline"
        >
          https://awareness-akademie.de/glossar/
        </Link>
        <Link
          href="https://kultur-kreativpiloten.de/wp-content/uploads/Awareness-Glossar.pdf"
          className="underline"
        >
          https://kultur-kreativpiloten.de/wp-content/uploads/Awareness-Glossar.pdf
        </Link>
      </section>
       
    </>
  );
}
