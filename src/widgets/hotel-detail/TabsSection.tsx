import React from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { InfoSummary } from "./InfoSummary";
import Link from "next/link";

/**
 * 탭 내 섹션(객실, 편의시설, 위치, 리뷰 등)의 스켈레톤을 간략히 구성합니다.
 * @returns 탭 섹션 JSX
 */
export function TabsSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-4">
      <div className="flex items-center overflow-x-auto py-3 border border-zinc-200 px-4 rounded-sm">
        {[
          "개요",
          "객실",
          "여행 추천",
          "편의 시설/서비스",
          "이용 후기",
          "위치",
          "정책",
        ].map((label) => (
          <button
            key={label}
            className={`px-4 py-2 text-sm cursor-pointer ${
              label === "개요"
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
          className="bg-red-600 text-white font-bold rounded-full px-4 py-2 text-sm cursor-pointer mx-2 hover:bg-red-700"
        >
          주변정보 보기
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
