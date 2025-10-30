"use client";

import { useSyncExternalStore, useMemo } from "react";
import { getLanguage, setLanguage, subscribe, type AppLanguage } from "./lang-store";
import { translations, type TranslationKey } from "./translations";

export type { AppLanguage, TranslationKey };

/**
 * 전역 언어 상태를 구독하고 번역 함수 `t`를 제공합니다.
 * @returns 현재 언어, 설정자, 번역 함수
 */
export function useLanguage(): {
  lang: AppLanguage;
  setLang: (lang: AppLanguage) => void;
  t: (key: TranslationKey) => string;
} {
  const lang = useSyncExternalStore(subscribe, getLanguage, getLanguage);

  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      const table = translations[lang] ?? translations.ko;
      return table[key] ?? key;
    };
  }, [lang]);

  return {
    lang,
    setLang: setLanguage,
    t,
  };
}


