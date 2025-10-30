import React from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { InfoSummary } from "./InfoSummary";

/**
 * 탭 내 섹션(객실, 편의시설, 위치, 리뷰 등)의 스켈레톤을 간략히 구성합니다.
 * @returns 탭 섹션 JSX
 */
export function TabsSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto py-3 border border-zinc-200 px-4 rounded-sm">
        {["객실", "편의시설", "위치", "정책", "리뷰", "주변정보 보기"].map(
          (label) => (
            <button
              key={label}
              className={`font-semibold rounded-full px-4 py-2 text-sm cursor-pointer ${
                label === "주변정보 보기"
                  ? "bg-amber-600 text-white"
                  : "bg-transparent dark:bg-zinc-900 hover:bg-zinc-100 text-zinc-700 border border-zinc-200"
              }`}
            >
              {label}
            </button>
          )
        )}
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
