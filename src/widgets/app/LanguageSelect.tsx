"use client";

import React from "react";
import { useLanguage, type AppLanguage } from "@/src/shared/i18n/use-language";

/**
 * 우측 상단 언어 선택 셀렉트 박스.
 * @returns 셀렉트 JSX
 */
export default function LanguageSelect(): React.ReactElement {
  const { lang, setLang } = useLanguage();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLang(e.target.value as AppLanguage);
  };

  return (
    <select
      aria-label="Language"
      className="cursor-pointer ml-auto h-8 rounded-md border border-zinc-200 bg-white px-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
      value={lang}
      onChange={onChange}
    >
      <option value="ko">한국어</option>
      <option value="ja">日本語</option>
      <option value="en">English</option>
    </select>
  );
}
