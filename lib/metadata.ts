import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const SITE_DESCRIPTION =
  "Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "FSR WiWi Halle – Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
};

type PageMetadata = Omit<Metadata, "title" | "description"> & {
  title: string | { absolute: string };
  description: string;
  /** Pfad der Seite, z. B. "/kalender" – wird zu canonical und og:url */
  path: string;
};

// Next ersetzt openGraph/twitter einer Seite komplett statt sie mit dem Layout
// zusammenzuführen – deshalb setzt jede Seite Vorschau und canonical hierüber.
export function pageMetadata({ title, description, path, ...rest }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "de_DE",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...rest,
  };
}
