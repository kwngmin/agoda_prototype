"use client";

import { useMemo } from "react";
import { useListingsStore } from "@/src/features/listings/model/listings-store";
import { restaurants } from "@/src/features/listings/lib/restaurants-data";

type Props = {
  className?: string;
  title?: string;
};

export default function RestaurantList({ className, title = "Restaurants" }: Props) {
  const { isExpanded, toggleExpanded, selectItem, selectedId } = useListingsStore();

  const items = useMemo(() => restaurants, []);

  return (
    <aside className={`border-r border-gray-200 ${className ?? ""}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <button
          type="button"
          onClick={toggleExpanded}
          className="text-sm text-blue-600 hover:underline"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "접기" : "펼치기"}
        </button>
      </div>

      <ul className="max-h-[calc(100dvh-140px)] overflow-auto divide-y">
        {items.map((item) => {
          const active = selectedId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => selectItem(item.id)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 outline-none ${
                  active ? "bg-gray-50" : ""
                }`}
              >
                <p className="text-sm font-medium">{item.name}</p>
              </button>
            </li>
          );
        })}
      </ul>

      {isExpanded && (
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-gray-600">
          목록을 펼친 상태에서는 식당 클릭 시 콘텐츠 영역에 구글지도가 표시됩니다.
        </div>
      )}
    </aside>
  );
}


