import { translations } from "./translations";

export function t(lang: string, key: string) {
  return (
    translations[lang as keyof typeof translations]?.[
      key as keyof (typeof translations)["en"]
    ] || key
  );
}