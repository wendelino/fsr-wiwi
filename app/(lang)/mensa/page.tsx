import { getMensaMeals } from "@/app/_actions/mensa";
import MensaView from "./view";
import { notFound } from "next/navigation";

export default async function MensaPage() {

    const data = await getMensaMeals("2025-10-16");

    return notFound();

    if (!data || data.length === 0) {
        return <div>No data</div>;
    }

    return (
        <MensaView mensaData={data} />
    );
}