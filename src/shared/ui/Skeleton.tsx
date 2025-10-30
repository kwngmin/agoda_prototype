"use client";

import React from "react";

/**
 * 단색 또는 라운드된 스켈레톤 블록을 렌더링합니다.
 * @param props.width 가로 크기 (Tailwind class 또는 스타일)
 * @param props.height 세로 크기 (Tailwind class 또는 스타일)
 * @returns 스켈레톤 블록 JSX
 */
export function Skeleton({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 " + className
      }
    />
  );
}
