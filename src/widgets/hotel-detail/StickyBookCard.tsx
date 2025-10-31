"use client";

import React from "react";
import { useLanguage } from "@/src/shared/i18n/use-language";

/**
 * 우측 고정 예약 카드: 1박 요금, 날짜/인원 입력 필드, CTA 버튼 등을 표시합니다.
 * @returns 예약 카드 JSX
 */
export function StickyBookCard(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <aside className="sticky top-20 hidden h-min w-full max-w-sm shrink-0 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:block">
      <div className="text-xs text-zinc-600 dark:text-zinc-400">{t("sticky.lowestPrice")}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        ₩ 165,000
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="group flex flex-col gap-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("search.checkin")}
          </span>
          <input
            type="date"
            className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
          />
        </label>
        <label className="group flex flex-col gap-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("search.checkout")}
          </span>
          <input
            type="date"
            className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
          />
        </label>
        <label className="group flex flex-col gap-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700 col-span-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("search.guests")}
          </span>
          <input
            type="number"
            min={1}
            defaultValue={2}
            className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
          />
        </label>
      </div>
      <button className="mt-4 w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
        {t("sticky.selectRoom")}
      </button>
      <div className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {t("sticky.instant")}
      </div>
    </aside>
  );
}


