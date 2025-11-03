import type { RestaurantItem } from "@/src/features/listings/model/listings-store";

/**
 * Google 스프레드시트에서 레스토랑 데이터를 가져옵니다.
 * @returns RestaurantItem 배열
 */
export async function fetchRestaurants(): Promise<RestaurantItem[]> {
  try {
    const response = await fetch("/api/restaurants", {
      cache: "no-store", // 실시간 데이터를 위해 캐시 비활성화
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    // 에러 발생 시 빈 배열 반환
    return [];
  }
}
