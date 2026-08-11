export type Lang = "en" | "ur" | "roman";

import { loginTranslations } from "./login";
import { commonTranslations } from "./common";
import { homeTranslations } from "./home";
import { authTranslations } from "./auth";
import { profileTranslations } from "./profile";
import { aboutTranslations } from "./about";
import { teamTranslations } from "./team";
import { healthTranslations } from "./health-check";
import { privacyTranslations } from "./privacy";
import { becomeDonorTranslations } from "./become-donor";

export const translations = {
  en: {
    ...commonTranslations.en,
    ...homeTranslations.en,
    ...loginTranslations.en,
    ...becomeDonorTranslations.en,
    ...authTranslations.en,
    ...profileTranslations.en,
    ...aboutTranslations.en,
    ...teamTranslations.en,
    ...healthTranslations.en,
    ...privacyTranslations.en,
  },

  ur: {
    ...commonTranslations.ur,
    ...homeTranslations.ur,
    ...authTranslations.ur,
    ...profileTranslations.ur,
    ...loginTranslations.ur,
    ...aboutTranslations.ur,
    ...teamTranslations.ur,
    ...healthTranslations.ur,
    ...becomeDonorTranslations.ur,
    ...privacyTranslations.ur,
  },

  roman: {
    ...commonTranslations.roman,
    ...homeTranslations.roman,
    ...authTranslations.roman,
    ...profileTranslations.roman,
    ...aboutTranslations.roman,
    ...teamTranslations.roman,
    ...healthTranslations.roman,
    ...becomeDonorTranslations.roman,
    ...privacyTranslations.roman,
    ...loginTranslations.roman,
  },
};

/**
 * Global translation function
 *
 * Accepts any translation key and safely falls back to English.
 */
export function t(lang: Lang, key: string): string {
  const currentLanguage = translations[lang] as Record<string, string>;
  const englishLanguage = translations.en as Record<string, string>;

  return currentLanguage?.[key] || englishLanguage?.[key] || key;
}