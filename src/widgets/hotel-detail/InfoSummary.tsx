import React from "react";

/**
 * 호텔 제목, 위치, 배지, 요약 하이라이트를 표시합니다.
 * @returns 정보 요약 JSX
 */
export function InfoSummary(): React.ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl py-4 border border-zinc-200 px-4 rounded-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            니시테츠 그랜드 호텔 (Nishitetsu Grand Hotel)
          </h2>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            텐진, 후쿠오카 | 쇼핑가 접근성 우수 · 지하철 인접
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              위치 우수
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              청결도 우수
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              가성비 좋음
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              이용후기
            </div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
              8.8 우수
            </div>
          </div>
          <div className="rounded-md bg-zinc-900 px-2 py-1 text-white dark:bg-zinc-100 dark:text-zinc-900">
            8.8
          </div>
        </div>
      </div>
    </section>
  );
}
