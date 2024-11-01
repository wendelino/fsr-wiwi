import Link from "next/link";
import WidthWrapper from "./WidthWrapper";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary mt-16 ">
      <WidthWrapper className="  pt-16 pb-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
          <div className="flex justify-center">
            <img src="/logo.png" className="max-w-40" />
          </div>
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Link href="/kontakt" className="text-lg font-semibold">
              Kontakt
            </Link>
            <Link href="mailto:fachschaftsrat@wiwi.uni-halle.de">
              fachschaftsrat@wiwi.uni-halle.de
            </Link>
            <p className="text-center lg:text-start">
              Grosse Steinstrasse 73 <br />
              06108 Halle (Saale)
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center lg:items-start"> 
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/impressum">Impressum</Link>
          </div>
        </div>
        <p className="opacity-50 pt-8">
          © Fachschaftsrat Wirtschafswissenschaften 2024 | All Rights Reserved 
        </p>
      </WidthWrapper>
    </footer>
  );
}
