import Link from "next/link";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import type { Footer } from "@/payload-types";
import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { getCachedGlobal } from "@/utilities/getGlobals";

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();

  const navItems = footerData?.navItems || [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-border border-t bg-black text-white dark:bg-card">
      <div className="container flex flex-col gap-10 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6">
          <Link className="flex items-center" href="/">
            <Logo className="h-48 w-48" />
          </Link>

          <div className="flex flex-col gap-1 text-sm text-white/70">
            <a
              className="transition-colors hover:text-white"
              href="mailto:fachschaftsrat@wiwi.uni-halle.de"
            >
              fachschaftsrat@wiwi.uni-halle.de
            </a>
            <span>Große Steinstraße 73</span>
            <span>06108 Halle (Saale)</span>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <CMSLink
            className="text-muted-foreground/50 text-xs"
            label="Login"
            url="/admin"
          />
          <ThemeSelector />
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink className="text-white" key={link.label} {...link} />
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="container py-4 text-center text-white/50 text-xs">
          © Fachschaftsrat Wirtschaftswissenschaften {currentYear} | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
}
