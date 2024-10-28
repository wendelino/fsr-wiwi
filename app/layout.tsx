import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import WidthWrapper from "@/components/WidthWrapper";
import ScrollTop from "@/components/ScrollTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSR Wiwi",
  description: "Fachschaftsrat Wiwi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      
      <script
          defer
          src="https://analytics.lnio.de/script.js"
          data-website-id="d72a7bb9-59d3-40b7-934a-a48d8dceca3f"
        />
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <NavBar />
        <main className="flex-1 min-h-[53vh]">
          <WidthWrapper>{children}</WidthWrapper>
        </main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
