import en from "./en.json";
import de from "./de.json";
import es from "./es.json";

const translations = { de, en, es };

export function clientTranslation(lang: string) {
  const translation =
    translations[lang as keyof typeof translations] || translations["de"];

  return translation;
}
