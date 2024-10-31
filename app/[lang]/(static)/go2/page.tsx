// app/page.tsx
import { getTranslation } from "@/locales/getTranslation";
import { FC } from "react";
import Navigate from "./Navigate";
import { Header, SubHeader } from "@/components/TextComponents";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";


export default async function page({ params }: { params: { lang: string } }) {
  const { go: t } = await getTranslation(params.lang);

  return (
    <>
      <div className="relative flex flex-col gap-8 h-[30rem] items-center justify-center py-8 mb-8">
        <img src="/logo.png" className="absolute max-h-full mt-8 opacity-10 " />
        <Header>{t.header}</Header>
        <SubHeader className="text-center">
        {t.subHeader1}
        </SubHeader>
        <SubHeader>{t.subHeader2}</SubHeader>
      </div>
      <a href="/files/ordnung_fsr_wiwi.pdf" download>
        <Button>
          <PaperclipIcon className="pr-2" /> {t.download}
        </Button>
      </a>
      <section id="preambel" className="mb-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">{t.sections.preambel.title}</h2>
        <p>{t.sections.preambel.content}</p>
      </section>

      <section id="fachschaft" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {t.sections.fachschaft.title}
        </h2>

        {/* Untersektionen der Fachschaft */}
        <section id="begriff" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            {t.sections.fachschaft.sections.begriff.title}
          </h3> 
          {t.sections.fachschaft.sections.begriff.content.split("\n").map((e, index) => (
                <p key={index} className="mb-2">{e}</p>
              ))}
        </section>
        <section id="organ" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            {t.sections.fachschaft.sections.organ.title}
          </h3>
          <p>{t.sections.fachschaft.sections.organ.content}</p>
        </section>
      </section>

      <section id="fachschaftsrat" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {t.sections.fachschaftsrat.title}
        </h2>

        {/* Untersektionen des Fachschaftsrats */}
        {Object.entries(t.sections.fachschaftsrat.sections).map(
          ([key, section]) => (
            <section id={key} className="mb-4" key={key}>
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              {section.content.split("\n").map((e, index) => (
                <p key={index}> {e}</p>
              ))}
            </section>
          )
        )}
      </section>

      <section id="final_provisions" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {t.sections.schlussbestimmungen.title}
        </h2>
        <p>{t.sections.schlussbestimmungen.content}</p>
      </section>
    </>
  );
}
