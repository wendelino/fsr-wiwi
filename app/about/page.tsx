import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      {/* Header */}
      <header className="  p-5   text-center">
        <h1 className="text-4xl font-bold">Über uns - Fachschaftsrat WiWi</h1>
        <p className="mt-2 text-lg">Deine Interessenvertretung an der Martin-Luther-Universität Halle-Wittenberg</p>
      </header>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto mt-10 px-6 sm:px-10 lg:px-16 py-12 bg-border shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
              src="https://fachschaft.wiwi.uni-halle.de/im/1603205731_616_00_420.png" // Passe den Pfad an dein Bild an
              alt="Überblick über den Fachschaftsrat" 
              className="rounded-lg shadow-lg size-fit bg-border mx-auto"
            />
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-text">Was ist die Fachschaft?</h2>
            <p className="mt-4 text-text-light">
              Mit der Immatrikulation an der Martin-Luther-Universität bist du automatisch Mitglied der Studierendenschaft
              Wirtschaftswissenschaften. Der Fachschaftsrat ist die gewählte Vertretung der Studierenden, die sich um eure
              Anliegen kümmert.
            </p>
            <p className="mt-4 text-text-light">
              Der Studierendenrat (StuRa) vertritt die Gesamtheit der Studierenden, während der Fachschaftsrat speziell
              für den Fachbereich Wirtschaftswissenschaften zuständig ist.
            </p>
          </div>
        </div>
      </section>

      {/* Project Funding Section */}
     

      {/* Contact Section */}
      <section className="mt-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-text">Kontakt</h2>
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
                      <ExternalLink className="mr-2 h-4 w-4" /> Stud.IP
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Econ Students Council</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe">
                        Besuchen
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Facebook className="mr-2 h-4 w-4" /> Facebook
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>FSR WiWi Halle</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="https://www.facebook.com/fsr.wiwi.halle" target="_blank" rel="noopener noreferrer">
                        Folgen
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Instagram className="mr-2 h-4 w-4" /> Instagram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>@fsr.wiwi.halle</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="https://www.instagram.com/fsr.wiwi.halle/?hl=de" target="_blank" rel="noopener noreferrer">
                        Folgen
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
    </div>
  );
}
