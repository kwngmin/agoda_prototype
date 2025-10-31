"use client";

import { useMemo } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import { restaurants } from "@/src/features/listings/lib/restaurants-data";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function RestaurantList({ className }: Props) {
  const {
    selectedMainId,
    expandedById,
    toggleExpanded,
    selectMain,
    selectSub,
  } = useListingsStore();

  const items = useMemo(() => restaurants, []);

  const getSubCount = (id: string) => {
    // deterministic: based on id char codes → 6 or 9 or 12
    const sum = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const mod = sum % 3; // 0,1,2
    return mod === 0 ? 6 : mod === 1 ? 9 : 12;
  };

  return (
    <aside className={`border-r border-gray-200 ${className ?? ""}`}>
      {/* <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
      </div> */}

      <ul className="h-full overflow-auto divide-y divide-gray-200">
        {items.map((item) => {
          const active = selectedMainId === item.id;
          const expanded = Boolean(expandedById[item.id]);
          const count = getSubCount(item.id);
          return (
            <li key={item.id} className="group">
              <div
                className={`flex items-center gap-2 px-3 py-4 ${
                  active ? "bg-gray-50" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectMain(item.id)}
                  className="flex-1 text-left flex items-center gap-2 cursor-pointer group"
                >
                  <span className="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 size-7 text-sm font-semibold ring ring-gray-300">
                    {count}
                  </span>
                  <span className="text-sm font-bold group-hover:underline underline-offset-4">
                    {item.name}
                  </span>
                  <Image
                    src={
                      item.icon === "youtube" ? "/youtube.svg" : "/shorts.svg"
                    }
                    alt="video icon"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => toggleExpanded(item.id)}
                  aria-label={expanded ? "접기" : "펼치기"}
                  className="text-xs px-2 py-1 rounded hover:border hover:bg-gray-50 cursor-pointer"
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

              {expanded && (
                <ul className="px-3 pb-3 space-y-2">
                  {Array.from({ length: count }).map((_, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => selectSub(item.id, idx)}
                        className="w-full flex items-center gap-3 rounded border border-gray-400 p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer group active:scale-95 transition-all duration-100 ease-in-out"
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
