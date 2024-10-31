 
import { getLocations } from "@/app/_actions/getLocations";
import { Header } from "@/components/TextComponents"; 
import dynamic from "next/dynamic";

export default async function Page() {

  const locations = await getLocations();

  const Map = dynamic(() => import("@/components/MyMap"), {
    loading: () => (
      <div className="w-full h-full animate-pulse bg-secondary flex items-center justify-center text-xl font-semibold">
        Loading ...
      </div>
    ),
    ssr: false,
  });

  return (
    <div>
      <Header>
        <span>
          Alle <span className="fsr-gradient">wichtigen Orte</span> für dich
        </span>
      </Header>
      <div className="w-full h-[50vh] rounded-lg shadow-xl z-0">
        <Map locations={locations} />
      </div>
    </div>
  );
}
