import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslation } from "@/locales/getTranslation";
import { ExternalLink, Facebook, Instagram } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  
  openGraph: {
    url: "https://fsr-wiwi-halle.de/about",
    type: "website",
    title: "Über uns",
    description:
      "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
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
    title: "Über uns",
    description:
      "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  },
};

export default async function page({ params }: { params: { lang: string } }) {
  const { about: t } = await getTranslation(params.lang);
   return (
    <div className="min-h-screen bg-background py-10">
      <header className="p-5 text-center">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-2 text-lg">{t.subtitle}</p>
      </header>

      <section className="max-w-7xl mx-auto mt-10 px-6 sm:px-10 lg:px-16 py-12 bg-border shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="https://fachschaft.wiwi.uni-halle.de/im/1603205731_616_00_420.png"
            alt="Überblick über den Fachschaftsrat"
            className="rounded-lg shadow-lg size-cover bg-border mx-auto"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-text">{t.aboutSection.title}</h2>
            <p className="mt-4 text-text-light">{t.aboutSection.text1}</p>
            <p className="mt-4 text-text-light">{t.aboutSection.text2}</p>
          </div>
        </div>
      </section>

      <section className="my-10 px-6 sm:px-10 lg:px-16 py-12 bg-border/30 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-text">{t.contactSection.title}</h2>
        <p className="mt-4 text-text-light">
          Fachschaftsrat des wirtschaftswissenschaftlichen Bereichs der Juristischen und Wirtschaftswissenschaftlichen
          Fakultät
        </p>
        <p className="mt-2 text-text-light">Große Steinstrasse 73, 06108 Halle (Saale)</p>
        <p className="mt-2">
          <a href="mailto:fachschaftsrat@wiwi.uni-halle.de" className="text-primary underline">
            fachschaftsrat@wiwi.uni-halle.de
          </a>
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" /> {t.cards.studip.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.cards.studip.content}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe">
                {t.cards.studip.button}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Facebook className="mr-2 h-4 w-4" /> {t.cards.facebook.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.cards.facebook.content}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="https://www.facebook.com/fsr.wiwi.halle" target="_blank" rel="noopener noreferrer">
                {t.cards.facebook.button}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Instagram className="mr-2 h-4 w-4" /> {t.cards.instagram.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t.cards.instagram.content}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="https://www.instagram.com/fsr.wiwi.halle/?hl=de" target="_blank" rel="noopener noreferrer">
                {t.cards.instagram.button}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
