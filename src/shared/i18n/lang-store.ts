"use client";

import { create } from "zustand";

export type AppLanguage = "ko" | "ja" | "en";

type LanguageState = {
  lang: AppLanguage;
  setLang: (lang: AppLanguage) => void;
};

// zustand 전역 스토어
export const useLangStore = create<LanguageState>((set, get) => ({
  lang: "ko",
  setLang: (next) => {
    if (get().lang !== next) set({ lang: next });
  },
}));

// 호환 레이어: 기존 useSyncExternalStore 기반 훅과 동일한 API 제공
/**
 * 현재 언어를 반환합니다.
 * @returns 현재 설정된 언어 코드
 */
export function getLanguage(): AppLanguage {
  return useLangStore.getState().lang;
}

/**
 * 언어를 변경합니다.
 * @param lang 변경할 언어 코드
 * @returns 변경 후 언어 코드
 */
export function setLanguage(lang: AppLanguage): AppLanguage {
  useLangStore.getState().setLang(lang);
  return useLangStore.getState().lang;
}

/**
 * 언어 변경을 구독합니다. (언어 값 변경 시에만 콜백 호출)
 * @param cb 변경 콜백
 * @returns 구독 해제 함수
 */
export function subscribe(cb: () => void): () => void {
  // lang 값 변경에만 반응하도록 prev 비교
  return useLangStore.subscribe((state, prev) => {
    if (state.lang !== prev.lang) cb();
  });
}
