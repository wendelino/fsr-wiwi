import Image from "next/image";
import React from "react";
import { Header } from "./TextComponents";
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
        {items.map((item) => (
          <a
            key={`${item.label}-${item.href}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border  bg-white/70 p-4 sm:p-5 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={`/sponsoring/${item.src}`}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                className="object-contain  grayscale contrast-100 brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition"
                priority={false}
              />
            </div>
            <div className="mt-3 text-center text-xs sm:text-sm text-zinc-700 line-clamp-1">
              {item.label}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
