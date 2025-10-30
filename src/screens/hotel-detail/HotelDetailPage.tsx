"use client";

import React from "react";
import { HeaderBar } from "@/src/widgets/hotel-detail/HeaderBar";
import { Gallery } from "@/src/widgets/hotel-detail/Gallery";
import { StickyBookCard } from "@/src/widgets/hotel-detail/StickyBookCard";
import { TabsSection } from "@/src/widgets/hotel-detail/TabsSection";
import { TopSearchBar } from "@/src/widgets/hotel-detail/TopSearchBar";
import { useLanguage } from "@/src/shared/i18n/use-language";

/**
 * 아고다 호텔 상세 페이지 형태를 모사한 합성 페이지 컴포넌트입니다.
 * @returns 호텔 상세 페이지 JSX
 */
export default function HotelDetailPage(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <HeaderBar />
      <TopSearchBar />
      <div className="truncate text-xs text-zinc-500 dark:text-zinc-400 mx-auto max-w-6xl px-4 pt-3 font-medium">
        {t("header.location")}
      </div>
      <Gallery />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[1fr_360px]">
        <div>
          <TabsSection />
        </div>
        <StickyBookCard />
      </div>
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {t("screen.footer")}
      </footer>
    </div>
  );
}
