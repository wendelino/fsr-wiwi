import { getLocations } from "@/app/_actions/getLocations";
import { MapLoader } from "@/components/MapLoader";
import { Reveal } from "@/components/motion";
import { HeroLead, PageHero } from "@/components/page-hero";

export default async function Page() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Ersti-Woche" title="Lageplan" poster>
        <HeroLead>Alle wichtigen Orte für euch auf einer Karte.</HeroLead>
      </PageHero>
      <Reveal className="z-0 h-[60vh] overflow-hidden rounded-3xl border">
        <MapLoader locations={locations} />
      </Reveal>
    </div>
  );
}
