import Link from "next/link";

import { Logo } from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-32 h-72 w-72 rounded-full bg-red-400/50 blur-3xl" /> 
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-red-400/50 blur-3xl" />
      </div>
      <div className="container relative flex min-h-[90vh] items-center py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-8">
           
            <div className="space-y-4">
              <p className="text-xl font-semibold uppercase text-muted-foreground">
                404
              </p>
              <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Diese Seite konnte nicht gefunden werden.
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Der Link ist veraltet oder die Seite wurde verschoben. Wir bringen
                dich zurück zu etwas Nützlichem.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default" className="px-6">
                <Link href="/">Zur Startseite</Link>
              </Button>
              <Button asChild variant="outline" className="px-6">
                <Link href="/search">Suche</Link>
              </Button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
