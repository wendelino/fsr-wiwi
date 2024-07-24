"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WidthWrapper from "./WidthWrapper";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

function NavLayout() {
  return (
    <>
      <NavDropdown title={"Über uns"}>
        <NavLink href="/go">Geschäftsordnung</NavLink>
        <NavLink href="/about">Mitglieder:innen</NavLink>
      </NavDropdown>
      <NavDropdown title={"Erstiwoche"}>
        <NavLink href="/erstiwoche">Programm</NavLink>
        <NavLink href="/erstiwoche/lageplan">Lageplan</NavLink>
        <NavLink href="/erstiwoche/anmeldung">Anmeldung</NavLink>
        <NavLink href="/erstiwoche/ressorts">Ressorts</NavLink>
        <NavLink href="/erstiwoche/kontakt">Kontakt</NavLink>
      </NavDropdown>
      <NavDropdown title={"Veranstaltungen"}>
        <NavLink href="/erstiwoche">Erstiwoche</NavLink>
        <NavLink href="/events">Eisparty</NavLink>
        <NavLink href="/events">LNDW</NavLink>
      </NavDropdown>

      <NavLink href="/kontakt">Kontakt</NavLink>
      <ThemeToggle />
    </>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="w-screen h-[72px] py-3 border-b fixed bg-background  z-50">
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
              <div className="w-full h-full flex flex-col gap-2 p-4">
                <NavLayout />
              </div>
            </aside>
          </nav>

          <nav className="hidden md:flex items-center gap-6">
            <NavLayout />
          </nav>
        </WidthWrapper>
        <div />
      </div>
      <div className="h-[72px]" />
    </>
  );
}

function NavLink(props: any) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-secondary",
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
      <div className="hidden md:flex relative group p-2 py-4">
        <div className="flex items-center gap-0.5 ">
          {title}
          <ChevronDown className="group-hover:rotate-180 transition" />
        </div>
        <div className="absolute z-10 hidden group-hover:flex flex-col gap-1 left-0 mt-10 w-48 bg-background rounded-md shadow-lg p-2">
          {children}
        </div>
      </div>

      <div className=" md:hidden border-b  p-2">
        <div className="flex font-semibold items-center gap-0.5 ">
          {title}
          <ChevronDown />
        </div>
        <div className="flex flex-col  m-2  ">{children}</div>
      </div>
    </>
  );
}
