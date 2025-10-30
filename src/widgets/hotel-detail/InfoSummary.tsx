import React from "react";
import { useLanguage } from "@/src/shared/i18n/use-language";

/**
 * 호텔 제목, 위치, 배지, 요약 하이라이트를 표시합니다.
 * @returns 정보 요약 JSX
 */
export function InfoSummary(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-screen-2xl py-4 border border-zinc-200 px-4 rounded-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            {t("header.hotelName")}
          </h2>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("header.location")}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {t("info.locationBadge")}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {t("info.cleanBadge")}
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              {t("info.valueBadge")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("info.review")}
            </div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-none shrink-0">
              {t("info.ratingLabel")}
            </div>
          </div>
          <div className="rounded-md bg-zinc-900 px-2 py-2 w-12 text-center text-lg font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            8.8
          </div>
        </div>
      </div>
    </section>
  );
}
