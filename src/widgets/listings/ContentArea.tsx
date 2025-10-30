"use client";

import { useEffect, useMemo, useState } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import { restaurants } from "@/src/features/listings/lib/restaurants-data";
import { AppLanguage, useLanguage } from "@/src/shared/i18n/use-language";
import { useSearchParams } from "next/navigation";

type Props = { className?: string };

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

export default function ContentArea({ className }: Props) {
  const { selectedMainId, selectedSub } = useListingsStore();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { t, setLang } = useLanguage();

  useEffect(() => {
    if (lang) {
      setLang(lang as AppLanguage);
    }
  }, [lang, setLang]);

  const selected = useMemo(() => {
    if (!selectedMainId) return null;
    return restaurants.find((r) => r.id === selectedMainId) ?? null;
  }, [selectedMainId]);

  if (!selected) {
    return (
      <section className={`w-full h-full ${className ?? ""}`}>
        <div className="w-full h-full grid place-items-center">
          <p className="text-sm text-gray-500">{t("listings.selectPrompt")}</p>
        </div>
      </section>
    );
  }

  const showMap = Boolean(selectedSub);
  return (
    <section className={`w-full h-full ${className ?? ""}`}>
      {showMap ? (
        <GoogleMap query={selected.mapQuery} />
      ) : (
        <YouTubePlayer videoId={selected.videoId} />
      )}
    </section>
  );
}
