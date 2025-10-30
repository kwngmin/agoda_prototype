"use client";

import React from "react";

/**
 * 아고다 상단과 유사한 컴팩트 검색 바.
 * 목적지, 날짜, 인원 입력 필드를 배치하고 CTA를 제공.
 * @returns 검색 바 JSX
 */
export function TopSearchBar(): React.ReactElement {
  return (
    <div className="sticky top-0 w-full bg-indigo-900 backdrop-blur dark:border-zinc-800 dark:bg-black/50 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
          <label className="group flex items-center gap-3 rounded-md h-12 bg-white px-3 py-2 text-sm shadow-sm ring-offset-0 transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
            <span className="shrink-0 text-zinc-500">목적지</span>
            <input
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="예: 후쿠오카"
            />
          </label>
          <label className="group flex items-center gap-3 rounded-md h-12 border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
            <span className="shrink-0 text-zinc-500">체크인</span>
            <input
              type="date"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
          <label className="group flex items-center gap-3 rounded-md h-12 border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
            <span className="shrink-0 text-zinc-500">체크아웃</span>
            <input
              type="date"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
          <div className="flex items-stretch gap-2">
            <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-md h-12 border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus-within:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-700">
              <span className="shrink-0 text-zinc-500">인원</span>
              <input
                type="number"
                min={1}
                defaultValue={2}
                className="min-w-0 w-16 bg-transparent text-right outline-none"
              />
            </label>
            <button className="shrink-0 rounded-md h-12 w-32 bg-blue-400 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 cursor-pointer dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
