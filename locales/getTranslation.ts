"use server";
import en from "./en.json";
import de from "./de.json";
import es from "./es.json";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const translations = { de, en, es };
const locales = Object.keys(translations) as Array<keyof typeof translations>;

export async function aviableLocales() {
  return locales;
}

function isAviableLocale(lang: string) { 
  return locales.includes(lang as keyof typeof translations)
}

export interface TranslationProps {
  lang: string;
  page: "home" | "awareness";
}

export async function getLocale(request: NextRequest) {
  let lang = request?.cookies.get("lang")?.value;

  if (!lang) {
    const device_lang = request.headers.get("accept-language");

    lang = device_lang?.split(",")[1].split(";")[0];
  }

  if (lang && lang in translations) return lang;
  return "de";
}

export async function setLocale(lang: string) { 
  console.log("DEPRECATED: setLocale function is deprecated");
  
  
  // if (!isAviableLocale(lang)) return;
  // cookies().set("lang", lang);
}

export async function getTranslation(lang: string) {
  const translation =
    translations[lang as keyof typeof translations] || translations["de"];

  return translation;
}
