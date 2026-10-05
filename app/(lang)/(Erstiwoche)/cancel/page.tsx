import { ResultState } from "@/components/result-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function page({ searchParams }: PageProps) {
  const { participantId, eventId } = await searchParams;

  if (!participantId || !eventId) {
    return (
      <div className="mx-auto mt-8 w-full max-w-lg rounded-3xl border bg-card p-6 sm:p-10">
        <ResultState
          status="error"
          title="Ungültiger Link"
          actions={
            <Button asChild size="lg" variant="outline">
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          }
        >
          Der Link zum Stornieren ist unvollständig. Öffne ihn bitte direkt aus der E-Mail.
        </ResultState>
      </div>
    );
  }

  return <div>page</div>;
}
