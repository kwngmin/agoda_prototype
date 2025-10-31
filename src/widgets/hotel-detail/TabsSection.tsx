import React from "react";
import { InfoSummary } from "./InfoSummary";
import Link from "next/link";
import { useLanguage } from "@/src/shared/i18n/use-language";
import {
  WifiHighIcon,
  CarIcon,
  ClockIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";

/**
 * 탭 내 섹션(객실, 편의시설, 위치, 리뷰 등)과 호텔 개요 정보 카드를 표시합니다.
 * @returns 탭 섹션 JSX
 */
export function TabsSection({
  buttonStyle,
}: {
  buttonStyle: "default" | "primary";
}): React.ReactElement {
  const { t, lang } = useLanguage();
  return (
    <section className="mx-auto max-w-screen-2xl space-y-4">
      <div className="flex items-center overflow-x-auto py-3 border border-zinc-200 px-4 rounded-sm bg-white">
        {[
          t("tabs.overview"),
          t("tabs.rooms"),
          t("tabs.trip"),
          t("tabs.facilities"),
          t("tabs.reviews"),
          t("tabs.location"),
          t("tabs.policy"),
        ].map((label) => (
          <button
            key={label}
            className={`px-4 py-2 text-sm cursor-pointer shrink-0 ${
              label === t("tabs.overview")
                ? "font-bold border-b-2 border-blue-600  text-blue-700"
                : "font-medium hover:text-blue-700"
            }`}
          >
            {label}
          </button>
        ))}
        {buttonStyle === "default" ? (
          <Link
            href={`/listings?lang=${lang}`}
            target="_blank"
            className="px-4 py-2 text-sm cursor-pointer shrink-0 font-medium relative hover:text-blue-700"
          >
            {t("tabs.nearby")}
            <span className="absolute -top-2.5 right-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              NEW
            </span>
          </Link>
        ) : (
          <Link
            href={`/listings?lang=${lang}`}
            target="_blank"
            className="shrink-0 bg-red-600 text-white font-bold rounded-full px-4 py-2 text-sm cursor-pointer mx-2 hover:bg-red-700"
          >
            {t("tabs.nearby")}
          </Link>
        )}
      </div>
      <InfoSummary />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 overflow-hidden">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <WifiHighIcon
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                weight="bold"
              />
            </div>
            <div className="flex-1 space-y-0.5 pt-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("overview.wifi.title")}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t("overview.wifi.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <CarIcon
                className="h-5 w-5 text-green-600 dark:text-green-400"
                weight="bold"
              />
            </div>
            <div className="flex-1 space-y-0.5 pt-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("overview.parking.title")}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t("overview.parking.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
              <ClockIcon
                className="h-5 w-5 text-amber-600 dark:text-amber-400"
                weight="bold"
              />
            </div>
            <div className="flex-1 space-y-0.5 pt-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("overview.checkin.title")}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t("overview.checkin.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <CreditCardIcon
                className="h-5 w-5 text-purple-600 dark:text-purple-400"
                weight="bold"
              />
            </div>
            <div className="flex-1 space-y-0.5 pt-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("overview.payment.title")}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t("overview.payment.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
