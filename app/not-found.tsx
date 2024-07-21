import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import Link from "next/link";

export default function page() {
  return (
    <WidthWrapper className="flex flex-col items-center">
      <div className="font-semibold text-xl p-4 bg-secondary rounded-lg m-24 ">
        404 | Page not found
      </div>
      <div className="font-semibold text-xl pb-8  ">
        Ooops... Seite nicht gefunden {":("}
      </div>
      <Button>
        <Link href="/">Zur Startseite {"–>"}</Link>
      </Button>
    </WidthWrapper>
  );
}
