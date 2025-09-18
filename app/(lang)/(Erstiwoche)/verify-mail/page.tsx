import { verifyToken } from "@/app/_actions/verify";
import { InfoCard } from "@/components/info-card";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function page({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return notFound();
  }

  const { sx, msg } = await verifyToken(token + "");

  return <InfoCard type={sx ? "success" : "warning"} className="mt-32">{msg}</InfoCard>;
}
