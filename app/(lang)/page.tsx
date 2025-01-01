import { FadeInSection, Fsr_letters } from "@/components/Framer"; 
import { AnimatedPinLink } from "@/components/Framer/3DPin";
import InstagramEmbed from "@/components/InstagramEmbed";
import { AnimatedText, Header } from "@/components/TextComponents";
import { Card } from "@/components/ui/card";
import WidthWrapper from "@/components/WidthWrapper";
import { getTranslation } from "@/locales/getTranslation";
import Image from "next/image";

// export default async function Home({ params }: { params: { lang: string } }) {
export default async function Home() {
  const { home: t } = await getTranslation("de");

  return (
    <>
      <header className="h-[66vh]">
        <Image
          src="/campus.jpg"
          priority={true}
          alt="Campus Image"
          width={1750}
          height={748}
          className="opacity-20 z-[-1] inset-0 absolute top-16 object-cover w-full h-[67vh]"
        />
        <FadeInSection className="h-full">
          <WidthWrapper className="flex gap-32  h-full justify-between ">
            <div className="font-bold flex flex-col justify-center gap-4">
              <AnimatedText text={t.welcome} className="text-5xl lg:text-6xl" />

              <div className="font-bold text-2xl opacity-80">
                <Fsr_letters input={t.councilName} />
              </div>
            </div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={512}
              height={512}
              className="my-auto max-w-80 object-cover hidden md:block"
            />
          </WidthWrapper>
        </FadeInSection>
      </header>


      <FadeInSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 "> 
        <AnimatedPinLink href="/about" title="Über uns" subtitle="Wer und was ist der FSR?" />
        <AnimatedPinLink href="/asq" title="ASQ" subtitle="Alle Infos zum ASQ bei uns" />
        <AnimatedPinLink href="/mitglieder" title="Mitglieder" subtitle="Unsere aktuell gewählten Mitglieder" />
        <AnimatedPinLink href="/kontakt" title="Kontakt" subtitle="Wir freuen uns darauf, von dir zu hören!" />
      </FadeInSection>
      
      <FadeInSection>
        <Header>{t.meaningOfFachschaft.header}</Header>
        <div className="text-lg text-foreground/80">
          <p className="mb-6">{t.meaningOfFachschaft.paragraph1}</p>
          <p className="mb-6">{t.meaningOfFachschaft.paragraph2}</p>
        </div>
      </FadeInSection>

      <FadeInSection> 
        <Image
              src="/fsr-ovdf.jpeg"
              alt="FSR Overview"
              width={1024}
              height={512}
              className="w-full"
            />
      </FadeInSection>
      <FadeInSection>
        <Card className="mb-16 px-6 sm:px-10 py-10 bg-secondary shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold">{t.projectFunding.header}</h2>
          <p className="mt-4 text-lg">
            {t.projectFunding.paragraph}{" "}
            <a
              href="https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305"
              className="underline"
            >
              {t.projectSupportLinkText}
            </a>
            .
          </p>
        </Card>
      </FadeInSection>

      <FadeInSection>
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-16 items-center w-full">
          <Header>{t.meeting.header}</Header>
          <div>
            <p className="text-lg text-foreground/80">{t.meeting.paragraph}</p>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <Header>{t.usefulLinks.header}</Header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8  mb-16">
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
      </FadeInSection>
      <FadeInSection>
        <Header>{t.followUs.header}</Header>
        <InstagramEmbed />
      </FadeInSection>
    </>
  );
}
