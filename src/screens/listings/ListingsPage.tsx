"use client";

import RestaurantList from "@/src/widgets/listings/RestaurantList";
import ContentArea from "@/src/widgets/listings/ContentArea";
import { useState } from "react";

export default function ListingsPage() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="grid sm:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)] h-dvh overflow-hidden">
      <RestaurantList
        className="h-dvh"
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      />
      <div className="flex flex-col">
        <ContentArea
          className="flex-1"
          onToggle={() => setExpanded((prev) => !prev)}
        />
      </div>
    </div>
  );
}
