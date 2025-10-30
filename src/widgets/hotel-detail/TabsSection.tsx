import React from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { InfoSummary } from "./InfoSummary";
import Link from "next/link";
import { useLanguage } from "@/src/shared/i18n/use-language";

/**
 * 탭 내 섹션(객실, 편의시설, 위치, 리뷰 등)의 스켈레톤을 간략히 구성합니다.
 * @returns 탭 섹션 JSX
 */
export function TabsSection(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-screen-2xl space-y-4">
      <div className="flex items-center overflow-x-auto py-3 border border-zinc-200 px-4 rounded-sm">
        {[
          t("tabs.overview"),
          t("tabs.rooms"),
          t("tabs.trip"),
          t("tabs.facilities"),
          t("tabs.reviews"),
          t("tabs.location"),
          t("tabs.policy"),
        ].map((label) => (
          <button
            key={label}
            className={`px-4 py-2 text-sm cursor-pointer shrink-0 ${
              label === t("tabs.overview")
                ? "font-bold border-b-2 border-blue-600  text-blue-700"
                : "font-medium"
            }`}
          >
            {label}
          </button>
        ))}
        <Link
          href="/listings"
          target="_blank"
          className="shrink-0 bg-red-600 text-white font-bold rounded-full px-4 py-2 text-sm cursor-pointer mx-2 hover:bg-red-700"
        >
          {t("tabs.nearby")}
        </Link>
      </div>
      <InfoSummary />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </section>
  );
}
