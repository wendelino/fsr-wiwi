"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Header as HeaderType } from "@/payload-types";
import { cn } from "@/utilities/ui";

export interface MenuItem {
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
  newTab?: boolean;
  title: string;
  url: string;
}

const renderMenuItem = (item: MenuItem) => {
  const newTabProps = item.newTab
    ? { rel: "noopener noreferrer", target: "_blank" as const }
    : {};

  return (
    <NavigationMenuItem key={item.title}>
      {item.items ? (
        <>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild className="w-80" key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </>
      ) : (
        <NavigationMenuLink
          asChild
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-accent-foreground"
        >
          <Link href={item.url} {...newTabProps}>
            {item.title}
          </Link>
        </NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  const newTabProps = item.newTab
    ? { rel: "noopener noreferrer", target: "_blank" as const }
    : {};

  if (item.items) {
    return (
      <AccordionItem className="border-b-0" key={item.title} value={item.title}>
        <AccordionTrigger className="py-0 font-semibold text-md hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} key={subItem.title} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      className="font-semibold text-md"
      href={item.url}
      key={item.title}
      {...newTabProps}
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  const newTabProps = item.newTab
    ? { rel: "noopener noreferrer", target: "_blank" as const }
    : {};

  return (
    <Link
      className="flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
      href={item.url}
      {...newTabProps}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="font-semibold text-sm">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

const fallbackLabel = "Link";

const mapLinkToHref = (
  link: NonNullable<HeaderType["navItems"]>[number]["link"]
): string => {
  const referenceValue = link?.reference?.value;

  if (
    link?.type === "reference" &&
    typeof referenceValue === "object" &&
    referenceValue?.slug
  ) {
    return `${link.reference?.relationTo !== "pages" ? `/${link.reference?.relationTo}` : ""}/${referenceValue.slug}`;
  }

  return link?.url || "#";
};

const mapNavItem = (
  item: NonNullable<HeaderType["navItems"]>[number]
): MenuItem => {
  const subpages = item?.subpages ?? [];

  return {
    title: item?.link?.label || fallbackLabel,
    url: mapLinkToHref(item.link),
    newTab: item?.link?.newTab ?? false,
    items: subpages.length
      ? subpages
          .filter((subpage) => Boolean(subpage?.link))
          .map((subpage) => ({
            title: subpage?.link?.label || fallbackLabel,
            url: mapLinkToHref(subpage.link),
            newTab: subpage?.link?.newTab ?? false,
          }))
      : undefined,
  };
};

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || [];
  const menu: MenuItem[] = navItems
    .filter((item) => Boolean(item?.link))
    .map(mapNavItem);

  const logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "FSR Wiwi Halle",
  };

  return (
    <section
      className={cn(
        "fixed top-0 z-50 w-full bg-gradient-to-t from-background/50 to-background py-4 backdrop-blur-sm"
      )}
    >
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex w-full items-center justify-between gap-6">
            {/* Logo */}
            <a className="flex items-center gap-2" href={logo.url}>
              <Image
                alt={logo.alt}
                className="aspect-square w-12 object-contain"
                height={100}
                src={logo.src}
                width={100}
              />
              <span className="font-semibold text-lg tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center rounded-lg bg-background">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link href="/search">
                        <Search className="w-5 text-primary" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a className="flex items-center gap-2" href={logo.url}>
              <Image
                alt={logo.alt}
                className="max-h-8 w-auto"
                height={100}
                src={logo.src}
                width={100}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a className="flex items-center gap-2 p-4" href={logo.url}>
                      <Image
                        alt={logo.alt}
                        className="max-h-8 w-auto"
                        height={100}
                        src={logo.src}
                        width={100}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    className="flex w-full flex-col gap-4"
                    collapsible
                    type="single"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
