import { getMensaMeals } from "@/app/_actions/mensa";
import MensaView from "./view";

export default async function MensaPage() {

    const data = await getMensaMeals("2025-10-16");

    if (!data || data.length === 0) {
        return <div>No data</div>;
    }

    return (
        <MensaView mensaData={data} />
    );
}