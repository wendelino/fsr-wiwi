import { MeetingCard } from "@/components/meeting-card";
import { HeroLead, PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { FsrMember, legislaturData, latestLegislatur } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getTranslation } from "@/locales/getTranslation";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

// Statische URL-Generierung für jede Legislaturperiode
export async function generateStaticParams() {
  return legislaturData.map(({ period }) => ({ period: period }));
}

// Metadaten-Generierung
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; period: string }>;
}): Promise<Metadata> {
  const { period, lang } = await params;
  const { mitglieder: t, global: gt } = await getTranslation(lang);

  const legislatur = legislaturData.find(({ period: p }) => p == period);
  const title = `${t.title} ${legislatur?.period || gt["not-found"]}`;
  const description = `${t.elected_members} ${legislatur?.legislatur_start || ""}`;

  return {
    title,
    description,
    keywords: [
      "Legislatur",
      "FSR",
      legislatur?.period ?? "",
      "Halle",
      "Halle-Wittenberg",
      "Martin Luther Universität",
      "Universität",
      "MLU",
    ],
    openGraph: { title, description },
    twitter: { title, description },
  };
}

// Vorsitz zuerst, dann Stellvertretung, dann weitere Ämter
const rank = (position: string) =>
  /stellv/i.test(position) ? 1 : /vorsitz/i.test(position) ? 0 : 2;

const initials = (name: string) => {
  const parts = name.split(" ");
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

export default async function page({
  params,
}: {
  params: Promise<{ lang: string; period: string }>;
}) {
  const p = await params;
  const { mitglieder: t } = await getTranslation(p.lang);

  const legislatur = legislaturData.find(({ period }) => period == p.period);
  if (!legislatur) redirect("/mitglieder");

  const withRole = legislatur.members
    .filter((m) => m.position)
    .sort((a, b) => rank(a.position) - rank(b.position));
  const others = legislatur.members.filter((m) => !m.position);
  const periods = [...legislaturData].sort((a, b) => Number(b.period) - Number(a.period));
  const isCurrent = legislatur.period === latestLegislatur.period;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero
        eyebrow={isCurrent ? "Über uns · Aktueller Fachschaftsrat" : "Über uns · Frühere Legislatur"}
        title={
          <>
            {t.title}{" "}
            <span className="text-transparent [-webkit-text-stroke:2px_white]">{legislatur.period}</span>
          </>
        }
        poster
      >
        <HeroLead>
          {t.elected_members} {legislatur.legislatur_start} · {legislatur.members.length} Mitglieder
        </HeroLead>
        <nav aria-label="Legislaturen" className="mt-8 flex flex-wrap gap-2">
          {periods.map(({ period }) => {
            const active = period === legislatur.period;
            return (
              <Link
                key={period}
                href={`/mitglieder/${period}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  active
                    ? "bg-white text-fsr-deep ring-white"
                    : "bg-white/15 ring-white/25 hover:bg-white/25"
                )}
              >
                {period}
              </Link>
            );
          })}
        </nav>
      </PageHero>

      {withRole.length > 0 && (
        <section>
          <SectionHeading eyebrow="Mit Amt" title="Vorstand & Ämter" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {withRole.map((m) => (
              <MemberCard key={m.name} member={m} featured />
            ))}
          </ul>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <SectionHeading eyebrow="Gewählte Mitglieder" title="Das Team" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </ul>
        </section>
      )}

      {isCurrent && <MeetingCard title="Lust mitzumachen? Komm zur Sitzung!" />}
    </div>
  );
}

function MemberCard({ member, featured }: { member: FsrMember; featured?: boolean }) {
  return (
    <li className="flex items-center gap-4 rounded-3xl border bg-card p-5">
      <span
        aria-hidden
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black",
          featured ? "bg-fsr-deep text-white" : "bg-fsr/10 text-fsr"
        )}
      >
        {initials(member.name)}
      </span>
      <div className="min-w-0">
        {member.position && (
          <p className="text-xs font-bold uppercase tracking-widest text-fsr">{member.position}</p>
        )}
        <p className="text-lg font-bold leading-tight">{member.name}</p>
        {member.tasks && <p className="mt-0.5 text-sm text-muted-foreground">{member.tasks}</p>}
      </div>
    </li>
  );
}
