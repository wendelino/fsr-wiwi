import { ContactForm } from "@/components/ContactForm";
import { H3 } from "@/components/Framer/H3";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import IframeConsent from "@/components/iframe-consent";
import InstagramEmbed from "@/components/InstagramEmbed";
import { Header, SubHeader } from "@/components/TextComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MailIcon, MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib uns eine Nachricht, wir melden uns bei dir :)",
  keywords: [
    "Fachschaftsrat",
    "FSR",
    "Wirtschaftswissenschaften",
    "Halle",
    "Halle-Wittenberg",
    "Martin Luther Universität",
    "Universität",
    "MLU",
    "Kontakt",
    "Hilfe",
    "Email",
  ],
  openGraph: {
    url: "https://fsr-wiwi-halle.de/kontakt",
    type: "website",
    title: "Kontakt",
    description:
      "Kontakt zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt",
    description:
      "Kontakt zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  },
};

export default function page() {
  return (
    <>
      <PageHeader
        title="Kontakt"
        subtitle="
    Wir freuen uns darauf, von dir zu hören! Kontaktiere uns gerne für Fragen, Anregungen oder Kooperationen. Das Team des Fachschaftsrats Wirtschaftswissenschaften steht dir zur Verfügung."
      />
      <Section className="grid md:grid-cols-2 lg:gap-32 items-center p-8 md:px-16  rounded-xl shadow-xl border">
        <Header>
          Schreib uns eine <span className="fsr-gradient">Nachricht</span>
        </Header>
        <ContactForm />
      </Section>

      <Section className="grid md:grid-cols-2 gap-8  items-center ">
        <div className="flex flex-col gap-8 justify-center bg-border/20 p-8 rounded-xl shadow-lg h-72">
          <div className="flex items-start gap-4 ">
            <Mail className="w-8 h-8 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">E-Mail</h3>
              <Button variant="link" className="p-0 h-auto font-normal" asChild>
                <a href="mailto:fachschaftsrat@wiwi.uni-halle.de">
                  <p className="text-base"> fachschaftsrat@wiwi.uni-halle.de</p>
                </a>
              </Button>
            </div>
          </div>
          <div className="border-t" />
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-primary mt-1" />
            <div>
              <H3>Adresse</H3>
              <p className="text-base">
                Grosse Steinstrasse 73 <br />
                06108 Halle (Saale)
              </p>
            </div>
          </div>
        </div>
        <div className="h-72 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.7346769053684!2d11.967479776676894!3d51.48653291055576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a66344312e9d2d%3A0x4b22614bcb6f7c9e!2sGrosse%20Steinstrasse%2073%2C%2006108%20Halle%20(Saale)%2C%20Germany!5e0!3m2!1sen!2sus!4v1699029714680!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Section>

      <Section>
        <Header>
          Folg uns auf <span className="text-gradient">Instagram</span>
        </Header>
        <InstagramEmbed />
      
      </Section>
    </>
  );
}
