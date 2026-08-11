import en from "@/locales/en.json";
import ur from "@/locales/ur.json";
import rom from "@/locales/rom.json";

const resources: any = {
  en,
  ur,
  rom,
};

export function t(lang: string, key: string) {
  return resources?.[lang]?.[key] || key;
}