import React from "react";
import Image from "next/image";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { useLanguage } from "@/src/shared/i18n/use-language";
import { NISHITETSU_IMAGES } from "@/src/entities/hotel/mock/nishitetsu-grand-hotel-images";

/**
 * 호텔 메인 갤러리(대표 이미지 + 썸네일 그리드)를 표시합니다. 이미지가 없을 땐 스켈레톤을 노출합니다.
 * @returns 갤러리 JSX
 */
export function Gallery(): React.ReactElement {
  const images = NISHITETSU_IMAGES;
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-6xl gap-2 px-4 pt-3 flex flex-col sm:flex-row">
      <div className="relative overflow-hidden rounded-lg aspect-video w-full sm:w-1/2 lg:w-2/5">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={t("gallery.imageAltMain")}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
          />
        ) : (
          <Skeleton className="absolute inset-0" />
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
          {t("gallery.viewRooms")}
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 sm:hidden lg:grid lg:grid-cols-3 grid-rows-2 gap-2 grow">
        {[1, 2, 3, 4, 5, 6].map((idx: number) => (
          <div
            key={idx}
            className="relative aspect-4/3 overflow-hidden rounded-lg w-full sm:h-32 lg:h-36"
          >
            {images[idx] ? (
              <Image
                src={images[idx]}
                alt={`${t("gallery.imageAltItem")} ${idx + 1}`}
                fill
                className="w-full object-cover object-center"
                // sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <Skeleton className="absolute inset-0" />
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:grid grid-cols-3 sm:grid-cols-2 lg:hidden grid-rows-2 gap-2 grow">
        {[1, 2, 3, 4].map((idx: number) => (
          <div
            key={idx}
            className="relative aspect-4/3 overflow-hidden rounded-lg w-full sm:h-24 md:h-32 lg:h-36"
          >
            {images[idx] ? (
              <Image
                src={images[idx]}
                alt={`${t("gallery.imageAltItem")} ${idx + 1}`}
                fill
                className="w-full object-cover object-center"
                // sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <Skeleton className="absolute inset-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
