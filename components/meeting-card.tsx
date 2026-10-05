import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

/** Dunkles Band zur öffentlichen Sitzung, mit Wann/Uhrzeit/Wo als Poster-Fakten. */
export function MeetingCard({
  title = "Interesse? Dann sei bei der nächsten Sitzung dabei!",
  showContact = true,
  className,
}: {
  title?: string;
  showContact?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      as="section"
      variant="scale"
      className={cn(
        "grid gap-10 overflow-hidden rounded-[2rem] bg-zinc-950 p-6 text-white sm:p-10 md:grid-cols-2 md:gap-12 md:p-14",
        className
      )}
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-fsr-foreground">Öffentliche Sitzung</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-4 text-white/75">
          Unsere Sitzungen sind öffentlich. Studierende der Wirtschaftswissenschaften
          sind herzlich eingeladen – schreibt uns gern übers Kontaktformular, per
          Mail oder auf Instagram. Wir freuen uns auf euch!
        </p>
        {showContact && (
          <Button asChild size="lg" className="mt-8 bg-white text-zinc-950 hover:bg-white/90">
            <Link href="/kontakt">
              <MessageCircle className="mr-2 size-4" /> Schreib uns
            </Link>
          </Button>
        )}
      </div>
      {/* Fakten laufen nach der Karte einzeln ein */}
      <Stagger as="dl" delay={0.25} step={0.1} className="self-center border-b border-white/15">
        <MeetingFact term="Wann" value="Jeden 2. Dienstag" />
        <MeetingFact term="Uhrzeit" value="19 Uhr" />
        <MeetingFact term="Wo" value="Raum 201" detail={`${siteConfig.company.strasse}, WiWi-Fakultät`} />
      </Stagger>
    </Reveal>
  );
}

function MeetingFact({ term, value, detail }: { term: string; value: string; detail?: string }) {
  return (
    <StaggerItem variant="right" className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-t border-white/15 py-4">
      <dt className="text-xs font-bold uppercase tracking-widest text-white/60">{term}</dt>
      <dd>
        <span className="block text-2xl font-black uppercase leading-none tracking-tight sm:text-4xl">{value}</span>
        {detail && <span className="mt-1 block text-sm text-white/70">{detail}</span>}
      </dd>
    </StaggerItem>
  );
}
