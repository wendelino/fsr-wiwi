"use client";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActivePill, Appear, Stagger, StaggerItem, Swap } from "@/components/motion";
import { HeroDeco } from "@/components/hero-deco";
import { type NavItem, type NavPage, siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { ThemeButton } from "./ThemeToggle";
import WidthWrapper from "./WidthWrapper";


// Kontakt steht als Button rechts, nicht in der Linkleiste
const CTA_HREF = "/kontakt";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr";

function isExternal(href: string) {
  return href.includes(".");
}

const allHrefs = siteConfig.pages.flatMap((p) => ("dropdown" in p ? p.dropdown.map((i) => i.href) : [p.href]));

/**
 * Genau ein aktiver Link: Teilen sich mehrere den Pfad (z. B. ERSTI_PAGE und
 * ERSTI_PROGRAM), gewinnt der mit passendem Hash, sonst der ohne Hash.
 */
function findActiveHref(pathname: string, hash: string) {
  const matches = allHrefs.filter((href) => {
    if (isExternal(href)) return false;
    const path = href.split("#")[0] || "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });
  return (
    matches.find((href) => hash !== "" && href.slice(href.indexOf("#")) === hash) ??
    matches.find((href) => !href.includes("#")) ??
    matches[0]
  );
}

/**
 * Aktueller Hash der URL. Next löst bei Links auf der eigenen Seite kein
 * `hashchange` aus, daher werden Klicks auf solche Anker mitgelesen.
 */
function useHash(pathname: string) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname) setHash(url.hash);
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return hash;
}

export default function NavBar({ lang: _lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeHref = findActiveHref(pathname, useHash(pathname));
  const pages = siteConfig.pages.filter((p) => !("href" in p) || p.href !== CTA_HREF);

  // Seitenwechsel schließt das Menü (State-Reset beim Rendern statt Effect);
  // Links auf die eigene Seite ändern den Pfad nicht und schließen es per onClick
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Offenes Menü: Seite nicht scrollen, Escape schließt
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // Nur html sperren: hätte auch body overflow, würde body zum Scroll-Container
    // und der sticky Header klebte daran statt am Fenster
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-colors",
        open
          ? "border-transparent bg-fsr-deep text-white"
          : // backdrop-filter macht den Header zum Bezugsrahmen für position:fixed – nur ohne Menü
            "bg-background backdrop-blur supports-[backdrop-filter]:bg-background/90"
      )}
    >
      <WidthWrapper className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-2.5 rounded-2xl",
            open ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" : focusRing
          )}
        >
          <span className={cn("flex size-11 items-center justify-center rounded-full", open && "bg-white")}>
            <Image
              src="/lion.png"
              alt=""
              width={44}
              height={44}
              priority
              className={cn("w-auto", open ? "h-9" : "h-11")}
            />
          </span>
          <span className="text-lg font-black leading-none tracking-tight">
            FSR WiWi
            <span
              className={cn(
                "mt-1 block text-xs font-semibold tracking-normal",
                open ? "text-white/70" : "text-muted-foreground"
              )}
            >
              MLU Halle
            </span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          {pages.map((page) =>
            "dropdown" in page ? (
              <DesktopDropdown
                key={page.label}
                label={page.label}
                items={page.dropdown}
                pathname={pathname}
                activeHref={activeHref}
              />
            ) : (
              <Link
                key={page.label}
                href={page.href}
                aria-current={page.href === activeHref ? "page" : undefined}
                className={cn(pillClass(page.href === activeHref), focusRing)}
              >
                {page.href === activeHref && <NavPill />}
                {page.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeButton
            className={cn(
              "size-10 rounded-full",
              open && "text-white hover:bg-white/10 hover:text-white focus-visible:ring-white"
            )}
          />
          <Link
            href={CTA_HREF}
            className={cn(
              "hidden h-10 items-center rounded-full bg-fsr-deep px-5 text-sm font-semibold text-white transition hover:bg-fsr-deep/90 md:inline-flex",
              focusRing,
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            Kontakt
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition md:hidden",
              open
                ? "border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                : cn("hover:bg-muted", focusRing)
            )}
          >
            <Swap swapKey={open ? "close" : "open"}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Swap>
          </button>
        </div>
      </WidthWrapper>

      <Appear
        show={open}
        variant="sheet"
        id="mobile-menu"
        // Höhe über dvh statt bottom-0: Mobile Browser rechnen bottom-0 sonst hinter die
        // eingeblendete Toolbar, und der letzte Link verschwindet darunter.
        className="fixed inset-x-0 top-[72px] h-[calc(100vh-72px)] overflow-hidden bg-fsr-deep text-white supports-[height:100dvh]:h-[calc(100dvh-72px)] md:hidden"
      >
        <MobileMenu pages={siteConfig.pages} activeHref={activeHref} onNavigate={() => setOpen(false)} />
      </Appear>
    </header>
  );
}

function pillClass(active: boolean) {
  return cn(
    "relative isolate inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors",
    active ? "text-fsr" : "text-foreground/80 hover:bg-muted hover:text-foreground"
  );
}

/** Markierung der aktiven Seite; gleitet beim Seitenwechsel zum neuen Eintrag. */
function NavPill() {
  return <ActivePill id="nav-active" className="rounded-full bg-fsr/10" />;
}

function DesktopDropdown({
  label,
  items,
  pathname,
  activeHref,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  activeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = items.some((i) => i.href === activeHref);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Hover-Rahmen, bedienbar ist der Button darin
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(pillClass(active), "pr-3", focusRing)}
      >
        {active && <NavPill />}
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 opacity-60 transition-transform motion-reduce:transition-none", open && "rotate-180")}
        />
      </button>
      {/* pt-2 als Brücke, damit der Hover beim Wechsel ins Menü nicht abreißt */}
      <Appear show={open} variant="drop" className="absolute left-0 top-full z-10 origin-top-left pt-2">
        <ul className="min-w-56 rounded-3xl border bg-card p-2 shadow-lg">
          {items.map((item) => {
            const itemActive = item.href === activeHref;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  aria-current={itemActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 text-sm font-semibold transition",
                    itemActive ? "bg-fsr/10 text-fsr" : "hover:bg-muted",
                    focusRing
                  )}
                >
                  {item.label}
                  {isExternal(item.href) && (
                    <ArrowUpRight aria-hidden className="size-4 text-muted-foreground" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Appear>
    </div>
  );
}

function MobileMenu({
  pages,
  activeHref,
  onNavigate,
}: {
  pages: NavPage[];
  activeHref?: string;
  onNavigate: () => void;
}) {
  const singles = pages.flatMap((p) => ("href" in p ? [p] : []));
  const groups = pages.flatMap((p) => ("dropdown" in p ? [p] : []));

  const bigLink = (item: NavItem, key: string) => {
    const active = item.href === activeHref;
    return (
      <StaggerItem as="li" variant="left" key={key}>
        <Link
          href={item.href}
          prefetch={item.prefetch}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "flex min-h-12 items-center justify-between gap-3 rounded-2xl py-1.5 text-2xl font-black tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            active ? "text-white" : "text-white/75 hover:text-white"
          )}
        >
          <span className="flex items-center gap-3">
            {active && <span aria-hidden className="size-2 rounded-full bg-white" />}
            {item.label}
          </span>
          {isExternal(item.href) && <ArrowUpRight aria-hidden className="size-5 text-white/60" />}
        </Link>
      </StaggerItem>
    );
  };

  return (
    <>
      {/* Hintergrund und Deko stehen fest, nur die Liste darüber scrollt */}
      <HeroDeco logo="bottom-right" parallax={false} />
      {/* Links laufen nacheinander ein, sobald das Menü ausgerollt ist */}
      <Stagger
        as="nav"
        trigger="mount"
        delay={0.07}
        step={0.03}
        aria-label="Hauptnavigation"
        className="absolute inset-0 flex flex-col gap-8 overflow-y-auto overscroll-contain px-4 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] pt-6"
      >
        <ul className="flex flex-col gap-1">
          {singles.map((page) => {
            const active = page.href === activeHref;
            return (
              <StaggerItem as="li" variant="left" key={page.label}>
                <Link
                  href={page.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl py-1 text-[clamp(1.5rem,10vw,2.5rem)] font-black uppercase leading-[0.95] tracking-tighter transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    active ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {page.label}
                  {active && <span aria-hidden className="size-3 rounded-full bg-white" />}
                </Link>
              </StaggerItem>
            );
          })}
        </ul>

        {groups.map((group) => (
          <section key={group.label}>
            <StaggerItem
              as="p"
              variant="fade"
              className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-widest text-white/60"
            >
              {group.label}
            </StaggerItem>
            <ul className="mt-2 flex flex-col">
              {group.dropdown.map((item) => bigLink(item, item.label))}
            </ul>
          </section>
        ))}
      </Stagger>
    </>
  );
}
