import Link from "next/link";
import WidthWrapper from "./WidthWrapper";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary mt-16 ">
      <WidthWrapper className="min-h-32 py-4 flex flex-col justify-between">
        <h1>Footer</h1>
        <div className="flex gap-2 justify-end">
          <Link href="/datenschutz">Datenschutz</Link>|
          <Link href="/impressum">Impressum</Link>
        </div>
      </WidthWrapper>
    </footer>
  );
}
