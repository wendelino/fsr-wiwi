"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Header } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { HeaderNav } from "./Nav";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient = ({ data }: HeaderClientProps) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setHeaderTheme(null);
    }
  }, [pathname, setHeaderTheme]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme, theme]);

  return (
    <header
      className="relative z-20"
      {...(theme ? { "data-theme": theme } : {})}
    >
      <HeaderNav data={data} />
    </header>
  );
};
