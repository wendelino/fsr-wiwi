"use client";
import { siteConfig, type NavItem, type NavPage } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeButton } from "./ThemeToggle";
import WidthWrapper from "./WidthWrapper";


// Kontakt steht als Button rechts, nicht in der Linkleiste
const CTA_HREF = "/kontakt";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr";

/** Anker-Links (z. B. ERSTI_PROGRAM) und Dateien gelten nie als aktiv. */
function isActive(pathname: string, href: string) {
  if (href.includes("#") || href.includes(".")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isExternal(href: string) {
  return href.includes(".");
}

export default function NavBar({ lang: _lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pages = siteConfig.pages.filter((p) => !("href" in p) || p.href !== CTA_HREF);

  useEffect(() => setOpen(false), [pathname]);

  // Offenes Menü: Seite nicht scrollen, Escape schließt
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-colors",
        open
          ? "border-transparent bg-fsr-deep text-white"
          : "bg-background backdrop-blur supports-[backdrop-filter]:bg-background/90"
      )}
    >
      <WidthWrapper className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
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
              <DesktopDropdown key={page.label} label={page.label} items={page.dropdown} pathname={pathname} />
            ) : (
              <Link
                key={page.label}
                href={page.href}
                aria-current={isActive(pathname, page.href) ? "page" : undefined}
                className={cn(pillClass(isActive(pathname, page.href)), focusRing)}
              >
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
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </WidthWrapper>

      {open && <MobileMenu pages={siteConfig.pages} pathname={pathname} />}
    </header>
  );
}

function pillClass(active: boolean) {
  return cn(
    "inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold transition",
    active ? "bg-fsr/10 text-fsr" : "text-foreground/80 hover:bg-muted hover:text-foreground"
  );
}

function DesktopDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = items.some((i) => isActive(pathname, i.href));

  useEffect(() => setOpen(false), [pathname]);

  return (
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
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 opacity-60 transition-transform motion-reduce:transition-none", open && "rotate-180")}
        />
      </button>
      {/* pt-2 als Brücke, damit der Hover beim Wechsel ins Menü nicht abreißt */}
      <div className={cn("absolute left-0 top-full z-10 pt-2", !open && "hidden")}>
        <ul className="min-w-56 rounded-3xl border bg-card p-2 shadow-lg">
          {items.map((item) => {
            const itemActive = isActive(pathname, item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  aria-current={itemActive ? "page" : undefined}
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
      </div>
    </div>
  );
}

function MobileMenu({ pages, pathname }: { pages: NavPage[]; pathname: string }) {
  const singles = pages.flatMap((p) => ("href" in p ? [p] : []));
  const groups = pages.flatMap((p) => ("dropdown" in p ? [p] : []));

  const bigLink = (item: NavItem, key: string) => {
    const active = isActive(pathname, item.href);
    return (
      <li key={key}>
        <Link
          href={item.href}
          prefetch={item.prefetch}
          aria-current={active ? "page" : undefined}
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
      </li>
    );
  };

  return (
    <div
      id="mobile-menu"
      className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto overscroll-contain bg-fsr-deep text-white md:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]"
      />
      <Image
        src="/logo_outline.png"
        alt=""
        aria-hidden
        width={360}
        height={363}
        className="pointer-events-none absolute -bottom-16 -right-24 w-[360px] opacity-[0.07] invert"
      />
      <nav aria-label="Hauptnavigation" className="relative flex flex-col gap-8 px-4 pb-10 pt-6">
        <ul className="flex flex-col">
          {singles.map((page) => {
            const active = isActive(pathname, page.href);
            return (
              <li key={page.label}>
                <Link
                  href={page.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl py-1 text-[clamp(2.5rem,12vw,3.5rem)] font-black uppercase leading-[0.95] tracking-tighter transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    active ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {page.label}
                  {active && <span aria-hidden className="size-3 rounded-full bg-white" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {groups.map((group) => (
          <section key={group.label}>
            <p className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-widest text-white/60">
              {group.label}
            </p>
            <ul className="mt-2 flex flex-col">
              {group.dropdown.map((item) => bigLink(item, item.label))}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}
