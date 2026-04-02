"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "es";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggle: () => {},
});

export function LanguageProvider({
  defaultLang = "en",
  children,
}: {
  defaultLang?: string;
  children: React.ReactNode;
}) {
  const initial: Lang = defaultLang === "es" ? "es" : "en";
  const [lang, setLang] = useState<Lang>(initial);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "es" : "en";
      try {
        localStorage.setItem("ll_lang", next);
      } catch {}
      document.cookie = `ll_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
