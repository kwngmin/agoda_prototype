"use client";

import { useEffect, useMemo, useState } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import type { RestaurantItem } from "@/src/features/listings/model/listings-store";
import { fetchRestaurants } from "@/src/features/listings/lib/restaurants-data";
import { AppLanguage, useLanguage } from "@/src/shared/i18n/use-language";
import { useSearchParams } from "next/navigation";
import { ListIcon } from "@phosphor-icons/react";

type Props = { className?: string; onToggle: () => void };

function YouTubePlayer({ videoId }: { videoId: string }) {
  const [showFallback, setShowFallback] = useState(false);
  const src = useMemo(() => {
    if (videoId.startsWith("search:")) {
      const query = encodeURIComponent(videoId.replace(/^search:/, ""));
      return `https://www.youtube-nocookie.com/embed?listType=search&list=${query}&autoplay=0&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0`;
  }, [videoId]);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 2500);
    return () => clearTimeout(timer);
  }, [src]);

  if (showFallback && videoId.startsWith("search:")) {
    const query = encodeURIComponent(videoId.replace(/^search:/, ""));
    return (
      <div className="w-full h-full grid place-items-center p-4 text-center">
        <a
          href={`https://www.youtube.com/results?search_query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          YouTube에서 후쿠오카 음식 영상을 확인하세요
        </a>
      </div>
    );
  }

  return (
    <iframe
      className="w-full h-full"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

function GoogleMap({ query }: { query: string }) {
  const src = useMemo(
    () => `https://www.google.com/maps?q=${query}&output=embed`,
    [query]
  );
  return (
    <iframe
      className="w-full h-full"
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      aria-label="Google Map"
    />
  );
}

export default function ContentArea({ className, onToggle }: Props) {
  const { selectedMainId, selectedSub } = useListingsStore();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { t, setLang } = useLanguage();
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);

  useEffect(() => {
    async function loadRestaurants() {
      const data = await fetchRestaurants();
      setRestaurants(data);
    }
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (lang) {
      setLang(lang as AppLanguage);
    }
  }, [lang, setLang]);

  const selected = useMemo(() => {
    if (!selectedMainId) return null;
    return restaurants.find((r) => r.id === selectedMainId) ?? null;
  }, [selectedMainId, restaurants]);

  // 서브 아이템이 선택된 경우 해당 주소를 사용
  const mapQuery = useMemo(() => {
    if (selectedSub && selected) {
      const subItem = selected.subItems[selectedSub.index];
      if (subItem?.address) {
        return encodeURIComponent(subItem.address);
      }
    }
    return selected?.mapQuery || "";
  }, [selected, selectedSub]);

  if (!selected) {
    return (
      <section className={`w-full h-full ${className ?? ""}`}>
        <button
          type="button"
          onClick={onToggle}
          className="flex sm:hidden items-center gap-3 px-4 py-3 shrink-0 h-16 w-full border-b border-gray-200 group select-none cursor-pointer"
        >
          <ListIcon
            className="size-8 text-gray-800 shrink-0 bg-gray-100 rounded-full p-1.5 group-hover:bg-gray-200 transition-colors duration-100 ease-in-out"
            weight="bold"
          />
          <h2 className="text-base font-semibold group-hover:underline underline-offset-4">
            {t("listings.title")}
          </h2>
        </button>
        <div className="w-full h-full grid place-items-center">
          <p className="text-sm text-gray-500">{t("listings.selectPrompt")}</p>
        </div>
      </section>
    );
  }

  const showMap = Boolean(selectedSub);
  return (
    <section className={`w-full h-full ${className ?? ""}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex sm:hidden items-center gap-3 px-4 py-3 shrink-0 h-16 w-full border-b border-gray-200 group select-none cursor-pointer"
      >
        <ListIcon
          className="size-8 text-gray-800 shrink-0 bg-gray-100 rounded-full p-1.5 group-hover:bg-gray-200 transition-colors duration-100 ease-in-out"
          weight="bold"
        />
        <h2 className="text-base font-semibold group-hover:underline underline-offset-4">
          {t("listings.title")}
        </h2>
      </button>
      {showMap ? (
        <GoogleMap query={mapQuery} />
      ) : selected.videoId ? (
        <YouTubePlayer videoId={selected.videoId} />
      ) : (
        <div className="w-full h-full grid place-items-center p-4 text-center">
          <p className="text-sm text-gray-500">동영상 정보가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
