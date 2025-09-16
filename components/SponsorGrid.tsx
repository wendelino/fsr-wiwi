import Image from "next/image";
import React from "react";
import { Header } from "./TextComponents";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
export type SponsorItem = {
  src: string;
  href: string;
  label: string;
};

type SponsorGridProps = {
  items: SponsorItem[];
  className?: string;
};

export default function SponsorGrid({ items, className }: SponsorGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Header>
        Unsere <span className="fsr-gradient">Sponsoren</span>
      </Header>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6   gap-6 sm:gap-8">
        {items.map((item) => (
          <a
            key={`${item.label}-${item.href}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl   bg-white/70 p-3 transition hover:-translate-y-0.5   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={`/sponsoring/${item.src}`}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                className="object-contain "// grayscale contrast-100 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition
                priority={false}
              />
            </div>
            {/* <div className="mt-3 text-center text-xs sm:text-sm text-zinc-700 line-clamp-1">
              {item.label}
            </div> */}
          </a>
        ))}
      </div>
    </div>
  );
}

interface SponsorOfferProps {
  link: string;
  label: string;
  image?: string;
  text?: string;
  orientation?: "left" | "right";
}
export function SponsorOffer({ link, label, image, text, orientation = "left" }: SponsorOfferProps) {
  return (
    <div className="grid md:grid-cols-2 gap-2 rounded-xl border justify-between overflow-hidden bg-muted/50">
      {image && (
        <Image
          src={`/sponsoring/${image}`}
          alt={label}
          width={400}
          height={600}
          className="h-full w-full object-cover"
        />
      )}
      <div className={cn("flex flex-col gap-8 p-4 sm:p-8 justify-center", orientation === "right" && "md:order-first")}>
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-muted-foreground whitespace-pre-wrap">{text}</p>

        <Button asChild>
        <Link href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
          Zum Angebot <ArrowRight className="h-5" />
        </Link>
        </Button>
      </div>
    </div>
  );
}

export function SponsorOfferGrid({ items }: { items: SponsorOfferProps[] }) {
  return (
    <div className="space-y-8 lg:space-y-16 mt-16">
      {items.map((item, i) => (
        <SponsorOffer key={item.label} {...item} orientation={i % 2 === 0 ? "left" : "right"} />
      ))}
    </div>
  );
}
