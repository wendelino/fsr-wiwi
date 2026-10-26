import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import WidthWrapper from "@/components/WidthWrapper";
import ScrollTop from "@/components/ScrollTop";
import { MotionProvider } from "@/components/motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import { OG_IMAGE, SITE_DESCRIPTION } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: "/favicon.ico",
  title: {
    template: "%s | FSR Wiwi",
    default: "FSR Wiwi Halle",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Fachschaftsrat",
    "FSR",
    "Wirtschaftswissenschaften",
    "Halle",
    "Halle-Wittenberg",
    "Martin Luther Universität",
    "Universität",
    "MLU",
  ],
  // canonical und og:url setzt jede Seite selbst (pageMetadata), sonst erben alle die Startseite
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "de_DE",
    title: {
      template: "%s | FSR Wiwi",
      default: "FSR Wiwi Halle",
    },
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | FSR Wiwi",
      default: "FSR Wiwi Halle",
    },
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"de"} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script
          src="https://stats.fsr-wiwi-halle.de/script.js"
          data-website-id="d72a7bb9-59d3-40b7-934a-a48d8dceca3f"
          data-performance="true"
          async
        /> 
      </head>
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <a
              href="#inhalt"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fsr-deep focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Zum Inhalt springen
            </a>
            <NavBar />
            <main id="inhalt" tabIndex={-1} className="flex-1 min-h-[53vh] pt-8 focus:outline-none">
              <WidthWrapper className=" flex flex-col gap-8 lg:gap-16">
                {children}
              </WidthWrapper>
            </main>
            <Footer />
            <ScrollTop />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
