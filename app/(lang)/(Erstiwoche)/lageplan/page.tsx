 
import { getLocations } from "@/app/_actions/getLocations";
import { MapLoader } from "@/components/MapLoader";
import MyMap from "@/components/MyMap";
import { Header } from "@/components/TextComponents";

export default async function Page() {

  const locations = await getLocations();
 

  return (
    <div>
      <Header>
        <span>
          Alle <span className="fsr-gradient">wichtigen Orte</span> für dich
        </span>
      </Header>
      <div className="w-full h-[50vh] rounded-lg shadow-xl z-0">
        <MapLoader locations={locations} />
      </div>
    </div>
  );
}
