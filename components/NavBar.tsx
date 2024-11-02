"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WidthWrapper from "./WidthWrapper";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { clientTranslation } from "@/locales/clientTranslation";

function NavLayout({ lang }: { lang: string }) {
  const { global } = clientTranslation(lang);
  const t = global.nav
  return (
    <> 
        <NavLink href="/about">{t.about}</NavLink>
        <NavLink href="/asq">ASQ</NavLink>
      
      <NavDropdown title={t.about_us}>
        <NavLink href="/mitglieder">{t.members}</NavLink>
        <NavLink href="/go">{t.rules_of_procedure}</NavLink>
        <NavLink href="/awareness">{t.awareness}</NavLink>
      </NavDropdown>

      <NavDropdown title={t.first_week}>
        <NavLink href="/files/guide.pdf">{t.guide}</NavLink>
        <NavLink href="/erstiwoche">{t.program}</NavLink>
        <NavLink href="/lageplan">{t.site_map}</NavLink>
        <NavLink href="/anmeldung">{t.registration}</NavLink>
      </NavDropdown>

      <NavLink href="/kontakt">{t.contact}</NavLink>

      <div className="flex items-center gap-3 md:ml-2  border-t md:border-t-transparent p-3 md:p-0  justify-center ">
        <ThemeToggle />
        <div className="h-6 border-r" />
        <LangToggle />
      </div>
    </>
  );
}

export default function NavBar({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="w-screen h-[72px] py-3 border-b fixed bg-background z-50">
        <WidthWrapper className="flex h-full justify-between">
          <Link href="/" className="h-full flex items-center gap-2 ">
            <img src="/lion.png" className="h-full" />
            <span className="font-semibold">FSR Wiwi</span>
          </Link>

          <nav className="md:hidden">
            {!isOpen ? (
              <Button
                variant={"ghost"}
                className="p-0 m-0 hover:bg-transparent md:hidden"
                aria-label="Open Menu"
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </Button>
            ) : (
              <div className="z-10 fixed inset-0  transition-opacity">
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black opacity-50"
                  tabIndex={0}
                ></div>
              </div>
            )}
            <aside
              className={`transform top-0 right-0 w-64 bg-background fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="w-full h-full justify-center flex flex-col gap-2 p-2 pt-12">
                <NavLayout lang={lang} />
              </div>
            </aside>
          </nav>

          <nav className="hidden md:flex items-center gap-2">
            <NavLayout lang={lang}/>
          </nav>
        </WidthWrapper>
        <div />
      </div>
      <div className="h-[72px]" />
    </>
  );
}

function NavLink(props: any) {
  const pathname = usePathname() + " d";
  const active = pathname.includes(props.href);
  return (
    <Link
      {...props}
      className={cn(
        `p-2 rounded-lg hover:underline underline-offset-2  bg-${active ? "secondary" : "transparent"}  focus-visible:bg-secondary focus-visible:text-secondary-foreground`,

        props.className
      )}
    />
  );
}

interface NavDropdownProps {
  title: string;
  children: React.ReactNode;
}

function NavDropdown({ children, title }: NavDropdownProps) {
  return (
    <>
      <div className="hidden md:flex hover:underline underline-offset-2 relative group p-2 rounded-lg">
        <div className="flex items-center gap-0.5 ">
          {title}
          <ChevronDown className="group-hover:rotate-180 transition w-6 text-foreground/50" />
        </div>
        <div className="absolute z-10 hidden group-hover:flex flex-col gap-1 left-0 bottom-0 min-w-40  translate-y-full  pt-2">
          <div className="flex flex-col gap-1 bg-background border rounded-md shadow-lg p-2">
            {children}
          </div>
        </div>
      </div>

      <div className=" md:hidden border-b pb-2">
        <h2 className="font-semibold text-sm text-foreground/40 p-2 pt-4">
          {title}
        </h2>
        <div className="flex flex-col gap-1 ">{children}</div>
      </div>
    </>
  );
}
