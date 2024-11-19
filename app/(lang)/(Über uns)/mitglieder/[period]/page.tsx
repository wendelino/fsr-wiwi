import { Metadata } from "next";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FC, useMemo } from "react";
import { legislaturData } from "@/lib/data";
import { redirect } from "next/navigation";
import { getTranslation } from "@/locales/getTranslation";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";

interface NavigationBarProps {
  currentPeriod: string;
}

// Statische URL-Generierung für jede Legislaturperiode
export async function generateStaticParams() {
  const t = legislaturData.map(({ period }) => ({ period: period }));
  return legislaturData.map(({ period }) => ({ period: period }));
}

// Metadaten-Generierung
export async function generateMetadata({
  params,
}: {
  params: { lang: string; period: string };
}): Promise<Metadata> {
  const { period } = params;
  const { mitglieder: t, global: gt } = await getTranslation(params.lang);

  const legislatur = legislaturData.find(({ period: p }) => p == period);

  return {
    title: `${t.title} ${legislatur?.period || gt["not-found"]}`,
    description: `${t.elected_members} ${legislatur?.period || ""}`,
    keywords: [
      "Legislatur",
      "FSR",
      legislatur!.period,
      "Halle",
      "Halle-Wittenberg",
      "Martin Luther Universität",
      "Universität",
      "MLU",
    ],
  };
}

// Navigationskomponente
const NavigationBar: FC<NavigationBarProps> = ({ currentPeriod }) => {
  return (
    <nav className="flex gap-4 flex-wrap mb-4">
      {legislaturData.map(({ period }) => (
        <Link key={period} href={period}>
          <Button
            variant={currentPeriod === period ? "default" : "outline"}
            className="px-6 h-9"
          >
            {period}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default async function page({
  params,
}: {
  params: { lang: string; period: string };
}) {
  const { mitglieder: t } = await getTranslation(params.lang);

  const { period } = params;
  const legislatur = legislaturData.find(({ period: p }) => p == period);

  if (!legislatur) redirect("./");

  return (
    <>
      <PageHeader
        title={t.title}
        subtitle={t.elected_members + " " + legislatur.legislatur_start}
      />

      <div>
        <NavigationBar currentPeriod={legislatur.period} />
        <Section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.name}</TableHead>
                <TableHead>{t.table.position}</TableHead>
                <TableHead>{t.table.tasks}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legislatur.members.map(({ name, position, tasks }, idx) => (
                <TableRow key={idx}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{position}</TableCell>
                  <TableCell>{tasks || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      </div>
    </>
  );
}
