import InstagramEmbed from "@/components/InstagramEmbed";
import { AnimatedText, Header } from "@/components/TextComponents";
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
      <Header>
        Nützliche <span className="fsr-gradient">Links</span>
      </Header>

      <div className="flex gap-8 justify-around mb-8 flex-wrap">

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

      <div className="flex flex-col gap-16 py-4">
        <iframe
          src="https://www.ich-will-wissen.de"
          className="h-[750px] w-full rounded-xl "
        />

        <Header>
          Folg uns auf <span className="text-gradient">Instagram</span>
        </Header>
        <InstagramEmbed />
      </div>
    </>
  );
}
