"use client";

import { useMemo } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import { restaurants } from "@/src/features/listings/lib/restaurants-data";

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
  const { selectedId, isExpanded } = useListingsStore();
  const selected = useMemo(() => {
    if (!selectedId) return restaurants[0];
    return restaurants.find((r) => r.id === selectedId) ?? restaurants[0];
  }, [selectedId]);

  return (
    <section className={`w-full h-[calc(100dvh-64px)] ${className ?? ""}`}>
      {/* Expanded 상태: 지도, 기본 상태: 유튜브 */}
      {isExpanded ? (
        <GoogleMap query={selected.mapQuery} />
      ) : (
        <YouTubePlayer videoId={selected.videoId} />
      )}
    </section>
  );
}


