"use client";

import { useMemo } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import { restaurants } from "@/src/features/listings/lib/restaurants-data";
import { useLanguage } from "@/src/shared/i18n/use-language";

type Props = { className?: string };

function YouTubePlayer({ videoId }: { videoId: string }) {
  const src = useMemo(
    () => `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
    [videoId]
  );
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
  const { t } = useLanguage();
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
