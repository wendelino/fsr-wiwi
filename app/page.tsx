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

      <div className="flex flex-col gap-16 py-4">
        <div className="h-32 bg-red-50 rounded-lg flex items-center justify-center">
          [Content]
        </div>

        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          [Content]
        </div>

        <div className="h-48 flex gap-2">
          <div className="  flex-1 bg-yellow-50 rounded-lg flex items-center justify-center">
            [Content]
          </div>
          <div className="  flex-1 bg-blue-50 rounded-lg flex items-center justify-center">
            [Content]
          </div>
        </div>
        <div className="h-32 bg-green-50 rounded-lg flex items-center justify-center">
          [Content]
        </div>

        <Header>
          Folg uns auf <span className="text-gradient">Instagram</span>
        </Header>
        <InstagramEmbed />
      </div>
    </>
  );
}
