 import en from "./en.json";
import de from "./de.json";
import { cookies } from "next/headers";

const translations = { en, de }; 


export interface TranslationProps {
  lang: string;
  page: "home" | "awareness";
}


export async function setLocale(lang: string) {
  cookies().set("lang", lang) 
}

export async function getTranslation(lang: string) {
  const translation =
    translations[lang as keyof typeof translations] || translations["de"];

  return translation;
}
