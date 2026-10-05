import { verifyToken } from "@/app/_actions/verify";
import { HeroLead, PageHero } from "@/components/page-hero";
import { ResultState } from "@/components/result-state";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "E-Mail bestätigen",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function page({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return notFound();
  }

  const { sx, msg } = await verifyToken(token + "");

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Anmeldung" title="E-Mail-Bestätigung">
        <HeroLead>
          {sx
            ? "Danke fürs Bestätigen – damit ist deine Anmeldung vollständig."
            : "Beim Bestätigen deiner Anmeldung ist etwas schiefgegangen."}
        </HeroLead>
      </PageHero>

      <div className="mx-auto w-full max-w-lg rounded-3xl border bg-card p-6 sm:p-10">
        {sx ? (
          <ResultState
            status="success"
            title="Bestätigt!"
            detail={msg}
            steps={[
              { label: "Anmeldung abgeschickt", state: "done" },
              { label: "E-Mail bestätigt", state: "done" },
            ]}
            actions={
              <>
                <Button asChild size="lg" className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
                  <Link href="/kalender">Zum Kalender</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/anmeldung">Weitere Termine</Link>
                </Button>
              </>
            }
          >
            Wir freuen uns auf dich!
          </ResultState>
        ) : (
          <ResultState
            status="error"
            title="Das hat nicht geklappt"
            detail={msg}
            actions={
              <>
                <Button asChild size="lg" className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
                  <Link href="/anmeldung">Zur Anmeldung</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/kontakt">Kontakt</Link>
                </Button>
              </>
            }
          >
            Prüfe, ob du den vollständigen Link aus der E-Mail geöffnet hast. Wenn
            es weiter nicht klappt, melde dich einfach bei uns.
          </ResultState>
        )}
      </div>
    </div>
  );
}
