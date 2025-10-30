"use client";

// 간단한 전역 언어 상태. 라이브러리 미사용, useSyncExternalStore로 구독.

export type AppLanguage = "ko" | "ja" | "en";

let currentLanguage: AppLanguage = "ko";
const listeners = new Set<() => void>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

/**
 * 현재 언어를 반환합니다.
 * @returns 현재 설정된 언어 코드
 */
export function getLanguage(): AppLanguage {
  return currentLanguage;
}

/**
 * 언어를 변경하고 구독자에게 알립니다.
 * @param lang 변경할 언어 코드
 * @returns 변경 후 언어 코드
 */
export function setLanguage(lang: AppLanguage): AppLanguage {
  if (currentLanguage !== lang) {
    currentLanguage = lang;
    emitChange();
  }
  return currentLanguage;
}

/**
 * 외부 저장소 구독을 등록/해제합니다.
 * @param cb 변경 콜백
 * @returns 해제 함수
 */
export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}


