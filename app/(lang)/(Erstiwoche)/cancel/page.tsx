import { InfoCard } from "@/components/info-card";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function page({ searchParams }: PageProps) {
  const { participantId, eventId } = await searchParams;

  if (!participantId || !eventId) {
    return <InfoCard type="warning">Keine gültige Anfrage.</InfoCard>;
  }

  return <div>page</div>;
}
