import { latestLegislatur } from "@/lib/data";
import { redirect } from "next/navigation";

// Immer auf die aktuellste Legislatur aus lib/data.ts
export default function page() {
  redirect(`/mitglieder/${latestLegislatur.period}`);
}
