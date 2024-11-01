"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { setLocale } from "@/locales/getTranslation";

export function LangToggle() {
  const path = usePathname();
  const router = useRouter();

  const [lang, setLang] = React.useState(path.split("/")[1]);

  const languages = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" }, 
    { value: "es", label: "Spanisch", flag: "🇪🇸" }, 
  ]; 
  

  const setLanguage = async (new_lang: string) => {
    if (new_lang === lang) return
    const redirect = path.split("/").slice(2).join("/")
    await setLocale(new_lang)
    router.push(`/${new_lang}/${redirect}`) 

    setLang(new_lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 h-8 font-mono">
          {lang} <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className="flex justify-between"
          >
            {lang.label}
            <span>{lang.flag}</span>
            
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
