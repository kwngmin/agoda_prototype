"use client";

import React from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";

/**
 * 우측 고정 예약 카드: 1박 요금, 날짜/인원 입력(스켈레톤), CTA 버튼 등을 표시합니다.
 * @returns 예약 카드 JSX
 */
export function StickyBookCard(): React.ReactElement {
  return (
    <aside className="sticky top-20 hidden h-min w-full max-w-sm shrink-0 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:block">
      <div className="text-xs text-zinc-600 dark:text-zinc-400">1박 최저가(세금 포함)</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        ₩ 165,000
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full col-span-2" />
      </div>
      <button className="mt-4 w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
        객실 선택하기
      </button>
      <div className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
        즉시 확정 · 무료 취소(일부 객실)
      </div>
    </aside>
  );
}


