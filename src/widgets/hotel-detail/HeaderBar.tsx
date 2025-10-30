"use client";

import React from "react";

/**
 * 호텔 상세 상단 헤더 바(브레드크럼, 호텔명, 평점, 미니 액션들)를 렌더링합니다.
 * @returns 헤더 바 JSX
 */
export function HeaderBar(): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:h-16">
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            일본 · 후쿠오카현 · 후쿠오카시
          </div>
          <h1 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
            니시테츠 그랜드 호텔 (Nishitetsu Grand Hotel)
          </h1>
        </div>
        <div className="ml-4 hidden items-center gap-3 sm:flex">
          <div className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            평점 8.8
          </div>
          <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">
            공유
          </button>
          <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">
            저장
          </button>
        </div>
      </div>
    </header>
  );
}
