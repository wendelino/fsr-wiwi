import { Header } from "@/components/TextComponents";
import WidthWrapper from "@/components/WidthWrapper"; 
import db from "@/db/db";
import { DB_Location } from "@prisma/client";
import dynamic from "next/dynamic";

export default async function Page() {
  const Map = dynamic(() => import("../../../components/MyMap"), {
    loading: () => (
      <div className="w-full h-full animate-pulse bg-secondary flex items-center justify-center text-xl font-semibold">
        Loading ...
      </div>
    ),
    ssr: false,
  });

  const locations: DB_Location[]  = await db.dB_Location.findMany();

  return (
    <div>
      <WidthWrapper>
        {locations &&
          locations.map((loc) => (
            <div key={loc.label}>
              <div>
                <span className="font-bold p-1">{loc.label}</span>
              </div>
            </div>
          ))}
        <Header>
          <span>
            Alle <span className="fsr-gradient">wichtigen Orte</span> für dich
          </span>
        </Header>
        <div className="w-full h-[50vh] rounded-lg shadow-xl z-0">
          <Map />
        </div>
      </WidthWrapper>
    </div>
  );
}
