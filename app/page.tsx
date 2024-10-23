import InstagramEmbed from "@/components/InstagramEmbed";
import { AnimatedText, Header } from "@/components/TextComponents";
import { Card } from "@/components/ui/card";
import WidthWrapper from "@/components/WidthWrapper";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <header className="h-[400px]">
        <div className=" absolute left-0 right-0 h-[400px] ">
          <Image
            src="/campus.jpg"
            alt="Example Image"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          <div className="relative w-full h-full">
            <WidthWrapper className=" flex gap-2 py-16 h-full justify-between ">
              <div className="font-bold text-5xl flex flex-col justify-center gap-4">
                <AnimatedText text="Willkommen" />
                <div className="font-bold text-2xl opacity-80">
                  Fachschaftsrat Wirtschaftswissenschaften der MLU Halle
                </div>
              </div>
              <img src="/logo.png" className="h-full hidden md:block  " />
            </WidthWrapper>
          </div>
        </div>
      </header>

      <section className="pt-16">
        <Header>
          Was bedeutet <span className="fsr-gradient">Fachschaft</span>?
        </Header>
        <div className="  text-lg text-foreground/80 ">
          <p className="  mb-6">
            Mit der Immatrikulation an der Martin-Luther-Universität bist du
            nicht nur Student*in dieser Universität geworden, sondern
            automatisch auch Mitglied der Studierendenschaft
            Wirtschaftswissenschaften. Dies ist die Gesamtheit der Studierenden
            des Fachbereiches Wirtschaftswissenschaften.
          </p>
          <p className="  mb-6">
            Der Fachschaftsrat ist die gewählte Vertretung von Studierenden aus
            der Studierendenschaft Wirtschaftswissenschaften, die sich um die
            Probleme und Belange der Studierenden kümmert. Die Gesamtheit der
            Studierenden der Universität (die Studierendenschaft) vertritt
            zudem der Studierendenrat (StuRa).
          </p>
        </div>
      </section>

      <img
        src="https://fachschaft.wiwi.uni-halle.de/im/1603206114_616_00_800.jpg"
        className="w-full"
      />

      <Card className="mb-16  px-6 sm:px-10  py-10 bg-secondary  shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold">
          Anträge zur <span className="fsr-gradient">Projektförderung</span>
        </h2>

        <p className="mt-4 text-lg">
          Wenn du ein Projekt hast, das Unterstützung benötigt, kannst du beim
          Fachschaftsrat WiWi eine Projektförderung beantragen. Hier findest du
          das{" "}
          <a
            href="https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305"
            className="underline "
          >
            Merkblatt zur Antragsstellung
          </a>
          .
        </p>
      </Card>

      <section className="  py-16">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-16 items-center w-full ">
          <Header>
            Interesse? Dann sei bei der nächsten{" "}
            <span className="fsr-gradient">Sitzung</span> dabei!
          </Header> 
          <div  >
            <p className="text-lg text-foreground/80   ">
              Unsere Sitzungen sind öffentlich und finden in der WiWi Fakultät,
              Große Steinstraße 73 (Raum 201) statt. Studierende des Bereiches WiWi sind herzlich eingeladen, unseren Sitzungen
              beizuwohnen. Jeden zweiten Diesntag um 19 Uhr.
            </p>
          </div>
        </div>
      </section>

      <Header>
        Nützliche <span className="fsr-gradient">Links</span>
      </Header>

      <div className="flex gap-8 justify-around mb-16 flex-wrap">
        <a
          href="https://studip.uni-halle.de/  "
          className="bg-secondary  flex justify-center items-center flex-col gap-2 p-4  rounded-xl shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/90/Uni_Halle_Logo.png"
            className="rounded-xl w-32 h-32 object-cover aspect-square"
          />
          <p className="text-lg font-semibold text-center">StudIP</p>
        </a>
        <a
          href="https://loewenportal.uni-halle.de "
          className="bg-secondary  flex justify-center items-center flex-col gap-2 p-4  rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 "
        >
          <img
            src="https://loewenportal.uni-halle.de/portal/pub/img//fotos/loewe.jpg"
            className="rounded-xl w-32 h-32 object-cover aspect-square"
          />
          <p className="text-lg font-semibold text-center">Löwenportal</p>
        </a>
        <a
          href="https://www.stura.uni-halle.de "
          className="bg-secondary  flex justify-center items-center flex-col gap-2 p-4  rounded-xl shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://www.stura.uni-halle.de/wp-content/uploads/2020/09/0001-scaled-e1603108866970.jpg"
            className="rounded-xl w-32 h-32 object-cover aspect-square"
          />
          <p className="text-lg font-semibold text-center">StuRa</p>
        </a>
        <a
          href="https://studmail.uni-halle.de/de/login "
          className="bg-secondary  flex justify-center items-center flex-col gap-2 p-4  rounded-xl shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://www.tenfold-security.com/wp-content/uploads/groupwise-logo-e1587790118740-1.png"
            className="rounded-xl w-32 h-32 object-cover aspect-square"
          />
          <p className="text-lg font-semibold text-center">StudMail</p>
        </a>
      </div>

      <section>
        {/* <iframe
          src="https://www.ich-will-wissen.de"
          className="h-[750px] w-full rounded-xl "
        /> */}

        <Header>
          Folg uns auf <span className="text-gradient">Instagram</span>
        </Header>
        <InstagramEmbed />
      </section>
    </>
  );
}
