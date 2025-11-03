"use client";

import { useEffect, useState } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import type { RestaurantItem } from "@/src/features/listings/model/listings-store";
import { fetchRestaurants } from "@/src/features/listings/lib/restaurants-data";
import { CaretDownIcon, CaretUpIcon, ListIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLanguage } from "@/src/shared/i18n/use-language";

type Props = {
  className?: string;
  expanded: boolean;
  onToggle: () => void;
};

export default function RestaurantList({
  className,
  expanded,
  onToggle,
}: Props) {
  const {
    selectedMainId,
    expandedById,
    toggleExpanded,
    selectMain,
    selectSub,
  } = useListingsStore();

  const { t } = useLanguage();
  const [items, setItems] = useState<RestaurantItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      setLoading(true);
      try {
        const data = await fetchRestaurants();
        setItems(data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRestaurants();
  }, []);

  return (
    <aside
      className={`${
        expanded ? "flex" : "hidden sm:flex!"
      } border-r border-gray-200 flex-col w-dvw sm:w-auto bg-white z-20 ${
        className ?? ""
      } `}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-3 px-4 py-3 shrink-0 h-16 w-full border-b border-gray-200 group select-none cursor-pointer"
      >
        <ListIcon
          className="size-8 text-gray-800 shrink-0 bg-gray-100 rounded-full p-1.5 group-hover:bg-gray-200 transition-colors duration-100 ease-in-out"
          weight="bold"
        />
        <h2 className="text-base font-semibold group-hover:underline underline-offset-4">
          {t("listings.title")}
        </h2>
      </button>

      <ul className="h-full overflow-x-hidden overflow-y-scroll divide-y divide-gray-200">
        {loading ? (
          <li className="px-4 py-8 text-center text-gray-500">로딩 중...</li>
        ) : items.length === 0 ? (
          <li className="px-4 py-8 text-center text-gray-500">
            데이터가 없습니다.
          </li>
        ) : (
          items.map((item, idx) => {
            const active = selectedMainId === item.id;
            const expanded = Boolean(expandedById[item.id]);
            const count = item.subItems.length;
            return (
              <li key={item.id} className="group overflow-hidden">
                <div
                  className={`flex items-center gap-2 px-3 h-16 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      selectMain(item.id);
                      onToggle();
                    }}
                    className="flex-1 text-left flex items-center gap-2 cursor-pointer group min-w-0"
                  >
                    <span className="text-xs font-medium text-gray-500 w-4 text-center shrink-0">
                      {idx + 1}
                    </span>

                    {item.icon === "youtube" ? (
                      <Image
                        src="/YouTube.svg"
                        alt="video icon"
                        width={20}
                        height={20}
                        className="shrink-0"
                      />
                    ) : (
                      <div className="flex w-5 justify-center items-center shrink-0">
                        <Image
                          src="/Youtube_shorts.svg"
                          alt="video icon"
                          width={18}
                          height={18}
                        />
                      </div>
                    )}
                    <span className="text-sm font-bold group-hover:underline underline-offset-4 line-clamp-2 min-w-0 flex-1 px-1">
                      {item.name}
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full text-amber-600 tracking-tight text-sm font-semibold shrink-0">
                      {count}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.id)}
                    aria-label={expanded ? "접기" : "펼치기"}
                    className="text-xs px-2 py-1 rounded hover:ring ring-gray-400 hover:bg-gray-50 cursor-pointer"
                  >
                    {expanded ? (
                      <CaretUpIcon
                        className="size-4 text-gray-800"
                        weight="bold"
                      />
                    ) : (
                      <CaretDownIcon
                        className="size-4 text-gray-800"
                        weight="bold"
                      />
                    )}
                  </button>
                </div>

                {expanded && count > 0 && (
                  <ul className="px-3 pb-3 space-y-2">
                    {item.subItems.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <button
                          type="button"
                          onClick={() => {
                            selectSub(item.id, subIdx);
                            onToggle();
                          }}
                          className="w-full flex items-center gap-3 rounded border border-gray-400 p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer group active:scale-95 transition-all duration-100 ease-in-out"
                        >
                          {/* <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" /> */}
                          <div className="flex-1 flex flex-col space-y-1">
                            <div className="text-sm font-bold text-gray-900 text-left">
                              {subItem.name}
                            </div>
                            <div className="text-xs text-gray-600 text-left">
                              {subItem.address}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })
        )}
      </ul>
      <div className="shrink-0 h-18 w-full flex items-center gap-3 px-4 border-t border-gray-200 select-none group">
        <Image
          src="/flixovia.png"
          alt="flixovia logo"
          width={72}
          height={100}
        />
        <span className="text-sm text-gray-800 group-hover:underline underline-offset-4 cursor-pointer group-hover:text-gray-900">
          Provided by Flixovia, Inc
        </span>
      </div>
    </aside>
  );
}
