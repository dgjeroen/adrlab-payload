import en from "./en";
import nl from "./nl";

type Translations = typeof en;
type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${DeepKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = DeepKeyOf<Translations>;

const translations = { en, nl };

export function t(key: TranslationKey, locale: "en" | "nl" = "nl"): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
