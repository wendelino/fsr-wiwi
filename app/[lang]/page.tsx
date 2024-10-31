import InstagramEmbed from "@/components/InstagramEmbed";
import { AnimatedText, Header } from "@/components/TextComponents";
import { Card } from "@/components/ui/card";
import WidthWrapper from "@/components/WidthWrapper";
import { getTranslation  } from "@/locales/getTranslation";
import Image from "next/image";

export default async function Home({ params }: { params: { lang: string } }) {
  
  const {home: t} = await getTranslation(params.lang)
  
  return (
    <>
      <header className="h-[400px]">
        <div className="absolute left-0 right-0 h-[400px]">
          <Image
            src="/campus.jpg"
            alt="Example Image"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          <div className="relative w-full h-full">
            <WidthWrapper className="flex gap-2 py-16 h-full justify-between">
              <div className="font-bold text-5xl flex flex-col justify-center gap-4">
                <AnimatedText text={t.welcome} />
                <div className="font-bold text-2xl opacity-80">
                  {t.councilName}
                </div>
              </div>
              <img src="/logo.png" className="h-full hidden md:block" />
            </WidthWrapper>
          </div>
        </div>
      </header>

      <section className="pt-16">
        <Header>
          {t.meaningOfFachschaft.header}
        </Header>
        <div className="text-lg text-foreground/80">
          <p className="mb-6">
            {t.meaningOfFachschaft.paragraph1}
          </p>
          <p className="mb-6">
            {t.meaningOfFachschaft.paragraph2}
          </p>
        </div>
      </section>

      <img
        src="/fsr-ovdf.jpeg"
        className="w-full"
      />

      <Card className="mb-16 px-6 sm:px-10 py-10 bg-secondary shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold">
          {t.projectFunding.header}
        </h2>
        <p className="mt-4 text-lg">
          {t.projectFunding.paragraph} <a href="https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305" className="underline">
          {t.projectSupportLinkText}</a>.
        </p>
      </Card>

      <section className="py-16">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-16 items-center w-full">
          <Header>
            {t.meeting.header}
          </Header>
          <div>
            <p className="text-lg text-foreground/80">
              {t.meeting.paragraph}
            </p>
          </div>
        </div>
      </section>

      <Header>
        {t.usefulLinks.header}
      </Header><div className="grid grid-cols-2 md:grid-cols-4 gap-8  mb-16">
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
        <Header>
          {t.followUs.header}
        </Header>
        <InstagramEmbed />
      </section>
    </>
  );
}
