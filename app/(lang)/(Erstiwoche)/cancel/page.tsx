import { ResultState } from "@/components/result-state";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anmeldung stornieren",
  robots: { index: false, follow: false },
};

// Stornieren per Link ist noch nicht ans CMS angebunden – bis dahin per Nachricht
export default function Page() {
  return (
    <div className="mx-auto mt-8 w-full max-w-lg rounded-3xl border bg-card p-6 sm:p-10">
      <ResultState
        status="error"
        title="Stornieren per Link geht gerade nicht"
        actions={
          <>
            <Button asChild size="lg" className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
              <Link href="/kontakt">Nachricht schreiben</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${siteConfig.company.mail}`}>E-Mail</a>
            </Button>
          </>
        }
      >
        Schreib uns kurz, für welchen Termin du dich abmelden möchtest – wir tragen dich dann aus.
      </ResultState>
    </div>
  );
}
