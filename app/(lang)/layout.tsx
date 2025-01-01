import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import WidthWrapper from "@/components/WidthWrapper";
import ScrollTop from "@/components/ScrollTop";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "https://fsr-wiwi-halle.de/favicon.ico",
  title: {
    template: "%s | FSR Wiwi",
    default: "FSR Wiwi Halle",
  },
  description:
    "Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
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
  openGraph: {
    url: "https://fsr-wiwi-halle.de",
    siteName: "FSR Wiwi",
    type: "website",
    title: {
      template: "%s | FSR Wiwi",
      default: "FSR Wiwi Halle",
    },
    description:
      "Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | FSR Wiwi",
      default: "FSR Wiwi Halle",
    },
    description:
      "Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  },
  alternates: {
    canonical: "https://fsr-wiwi-halle.de",
  },
};
// export async function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "de" }];
// }

// export default function RootLayout({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode;
//   params: { lang: string };
// }>) {
//   return (
//     <html lang={params.lang}>
//       <head>
//         <script
//           defer
//           src="https://analytics.lnio.de/script.js"
//           data-website-id="d72a7bb9-59d3-40b7-934a-a48d8dceca3f"
//         />
//       </head>
//       <body className={cn(inter.className, "flex flex-col min-h-screen")}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <NavBar lang={params.lang} />
//           <main className="flex-1 min-h-[53vh]">
//             <WidthWrapper className=" flex flex-col gap-16 lg:gap-32">{children}</WidthWrapper>
//           </main>
//           <Footer />
//           <ScrollTop />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"de"} suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://analytics.lnio.de/script.js"
          data-website-id="d72a7bb9-59d3-40b7-934a-a48d8dceca3f"
        />
      </head>
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          <NavBar lang={"de"} />
          <main className="flex-1 min-h-[53vh]">
            <WidthWrapper className=" flex flex-col gap-16 lg:gap-32">
              {children}
            </WidthWrapper>
          </main>
          <Footer />
          <ScrollTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
