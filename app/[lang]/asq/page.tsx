"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Coffee,
  GraduationCap,
  EuroIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DemoContainer, {
  AnimatedHeader,
  AnimatedListItem,
  FadeInSection,
  ProgressBar,
} from "@/components/Framer";
import Link from "next/link";

const tasks = [
  {
    icon: Calendar,
    text: "Plane, organisiere und setze eigene Projekte in Teamarbeit um (z.B. Praxis, Party, Podiumsdiskussion)",
  },
  {
    icon: EuroIcon,
    text: "Nutze das zur Verfügung gestellte Budget für deine Projekte",
  },
  {
    icon: Users,
    text: "Lerne die Arbeit der Hochschulgremien kennen",
  },
  {
    icon: Briefcase,
    text: "Knüpfe Kontakte zu Studierenden aus verschiedenen Jahrgängen und Arbeitsbereichen",
  },
  {
    icon: Coffee,
    text: "Genieße eine lockere Arbeitsatmosphäre",
  },
  {
    icon: GraduationCap,
    text: "Sammle wertvolle praktische Erfahrungen für dein Studium und zukünftige Karriere",
  },
];

export default function Page() {
  return (
    <>
      <header className="relative p-5 text-center my-16 overflow-hidde">
        <div className="relative z-10">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ASQ beim FSR WiWi
          </motion.h1>
          <motion.p
            className="mt-2 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Entdecke neue Möglichkeiten, sammle wertvolle Erfahrungen und
            verdiene 5 ECTS-Punkte mit dem Allgemeinen
            Schlüsselqualifikationsmodul beim Fachschaftsrat
            Wirtschaftswissenschaften!
          </motion.p>
        </div>
      </header>

      <FadeInSection>
        <ul className="grid gap-6 lg:grid-cols-3">
          <AnimatedListItem index={1} className=" flex-col items-start">
            <h3 className="font-bold text-xl">Das Modul </h3>
            <p>
              Ein ASQ beim FSR wird vom ASQ-Büro anerkannt und bringt Dir volle
              5 ECTS (entspricht 150h Arbeitsaufwand).
            </p>
          </AnimatedListItem>
          <AnimatedListItem index={2} className=" flex-col items-start">
            <h3 className="font-bold text-xl">Dein Team </h3>
            <p>
              Besteht aus 5-6 Studierenden, mit denen Du zusammen arbeitest und
              spannende Projekte umsetzt.
            </p>
          </AnimatedListItem>
          <AnimatedListItem index={3} className=" flex-col items-start">
            <h3 className="font-bold text-xl">Deine Unterstützung</h3>
            <p>
              Erhältst Du direkt von den Mitgliedern des FSR, die dem ASQ mit
              Rat und Tat zur Seite stehen.
            </p>
          </AnimatedListItem>
        </ul>
      </FadeInSection>

      <FadeInSection>
        <motion.section
          className="mb-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative  px-4 py-12 ">
            <AnimatedHeader>Deine Vorteile und Aufgaben</AnimatedHeader>
            <ul className="flex flex-col gap-6">
              {tasks.map((task, index) => (
                <AnimatedListItem index={index} key={index} className="gap-6"> 
                    <task.icon className="h-8 w-8 text-fsr" /> 
                  <p className="text-foreground">{task.text}</p>
                </AnimatedListItem>
              ))}
            </ul>
          </div>
          <motion.div
            className="absolute inset-0 bg-grid-primary/5 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.section>
      </FadeInSection>

      <FadeInSection>
        <section className="grid lg:grid-cols-2 gap-8 items-center mb-16 p-8">
          <AnimatedHeader> Der Bewerbungsprozess</AnimatedHeader>
          <div className="">
            <ol className="relative border-l  border-muted">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center fill-fsr justify-center w-8 h-8 bg-fsr-foreground rounded-full -left-4 ring-4 ring-background">
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">
                  Bewerbungsfrist beachten
                </h3>
                <p className="text-sm text-muted-foreground">
                  Die genaue Bewerbungsfrist wird jedes Semester über Facebook,
                  Instagram und Stud.IP ausgeschrieben.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center fill-fsr justify-center w-8 h-8 bg-fsr-foreground rounded-full -left-4 ring-4 ring-background">
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">
                  Bewerbung vorbereiten
                </h3>
                <p className="text-sm text-muted-foreground">
                  Erstelle ein Anschreiben mit deinen persönlichen Daten und ein
                  kreatives Motivationsschreiben.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center fill-fsr justify-center w-8 h-8 bg-fsr-foreground  rounded-full -left-4 ring-4 ring-background">
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zM7 17v-3h6v3H7z" />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">
                  Bewerbung einreichen
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sende deine Bewerbung an die angegebene E-Mail-Adresse oder
                  reiche sie persönlich beim FSR ein.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 fill-fsr bg-fsr-foreground rounded-full -left-4 ring-4 ring-background">
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
                    <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">
                  Rückmeldung abwarten
                </h3>
                <p className="text-sm text-muted-foreground">
                  Der FSR wird sich mit dir in Verbindung setzen, um dich über
                  den weiteren Verlauf zu informieren.
                </p>
              </li>
            </ol>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16 grid "> 
        <AnimatedHeader> Häufig gestellte Fragen</AnimatedHeader>
          <Accordion type="single" collapsible className=" ">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Was ist der Leistungsnachweis?
              </AccordionTrigger>
              <AccordionContent>
                Der Leistungsnachweis besteht aus drei Teilen:
                <ol className="list-decimal pl-6 mt-2">
                  <li>Dein eigenes Semesterprojekt</li>
                  <li>Unterstützung von FSR-Projekten</li>
                  <li>
                    Ein Bericht im Umfang von 3 bis 5 Seiten über die Art und
                    den Umfang der Tätigkeit mit Lernerfolgen bzw. erworbenen
                    Kompetenzen
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Wie viel Zeit muss ich investieren?
              </AccordionTrigger>
              <AccordionContent>
                Das ASQ-Modul entspricht einem Arbeitsaufwand von 150 Stunden.
                Dies verteilt sich über das gesamte Semester, sodass du im
                Durchschnitt mit etwa 10 Stunden pro Woche rechnen kannst. Die
                genaue Zeiteinteilung ist jedoch flexibel und kann je nach
                Projektphase variieren.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Kann ich das ASQ-Modul auch in Teilzeit absolvieren?
              </AccordionTrigger>
              <AccordionContent>
                Grundsätzlich ist das ASQ-Modul als Vollzeitaktivität während
                eines Semesters konzipiert. In Ausnahmefällen und nach
                Rücksprache mit dem FSR und dem ASQ-Büro könnte eine
                Teilzeitvariante über zwei Semester möglich sein. Dies muss
                jedoch individuell geprüft und vereinbart werden.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </FadeInSection>

      <FadeInSection className="py-32">
        <section className="text-center">
        <AnimatedHeader>Bereit für eine neue Herausforderung?</AnimatedHeader> 
          <p className="mb-8">
            Wir freuen uns auf deine Bewerbung und darauf, dich im Team begrüßen
            zu dürfen!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="mailto:fachschaftsrat@wiwi.uni-halle.de">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Jetzt bewerben
            </Button>
            </Link>
          </motion.div>
        </section>
      </FadeInSection>
    </>
  );
}
