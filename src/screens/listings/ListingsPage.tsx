"use client";

import RestaurantList from "@/src/widgets/listings/RestaurantList";
import ContentArea from "@/src/widgets/listings/ContentArea";

export default function ListingsPage() {
  return (
    <div className="grid grid-cols-[320px_minmax(0,1fr)] h-dvh overflow-hidden">
      <RestaurantList className="h-dvh" />
      <div className="flex flex-col">
        <ContentArea className="flex-1" />
      </div>
    </div>
  );
}
