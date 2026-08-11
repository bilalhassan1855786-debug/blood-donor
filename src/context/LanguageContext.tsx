"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "en" | "ur" | "roman";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] =
    useState<Language>("en");

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (
      saved === "en" ||
      saved === "ur" ||
      saved === "roman"
    ) {
      setLangState(saved);
    }
  }, []);

  const setLang = (language: Language) => {
    setLangState(language);
    localStorage.setItem(
      "language",
      language
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}