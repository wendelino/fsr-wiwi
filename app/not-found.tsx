import { Button } from "@/components/ui/button"; 
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col items-center mt-32 ">
      <div className="font-semibold text-xl p-4 bg-secondary rounded-lg m-16 ">
        404 | Page not found
      </div>
      <div className="font-semibold text-xl pb-8  ">
        Ooops... Seite nicht gefunden {":("}
      </div>
      <Button>
        <Link href="/">Zur Startseite {"–>"}</Link>
      </Button>
    </div>
  );
}
