export type TranslationKey =
  | "header.location"
  | "header.hotelName"
  | "header.rating"
  | "header.share"
  | "header.save"
  | "info.locationBadge"
  | "info.cleanBadge"
  | "info.valueBadge"
  | "info.review"
  | "info.ratingLabel"
  | "tabs.overview"
  | "tabs.rooms"
  | "tabs.trip"
  | "tabs.facilities"
  | "tabs.reviews"
  | "tabs.location"
  | "tabs.policy"
  | "tabs.nearby"
  | "sticky.lowestPrice"
  | "sticky.selectRoom"
  | "sticky.instant"
  | "screen.footer"
  | "search.destination"
  | "search.placeholder"
  | "search.checkin"
  | "search.checkout"
  | "search.guests"
  | "search.search"
  | "gallery.viewRooms"
  | "gallery.imageAltMain"
  | "gallery.imageAltItem";

type Table = Record<TranslationKey, string>;

export const translations: Record<"ko" | "ja" | "en", Table> = {
  ko: {
    "header.location": "일본 · 후쿠오카현 · 후쿠오카시",
    "header.hotelName": "니시테츠 그랜드 호텔 (Nishitetsu Grand Hotel)",
    "header.rating": "평점 8.8",
    "header.share": "공유",
    "header.save": "저장",

    "info.locationBadge": "위치 우수",
    "info.cleanBadge": "청결도 우수",
    "info.valueBadge": "가성비 좋음",
    "info.review": "이용후기",
    "info.ratingLabel": "8.8 우수",

    "tabs.overview": "개요",
    "tabs.rooms": "객실",
    "tabs.trip": "여행 추천",
    "tabs.facilities": "편의 시설/서비스",
    "tabs.reviews": "이용 후기",
    "tabs.location": "위치",
    "tabs.policy": "정책",
    "tabs.nearby": "주변정보 보기",

    "sticky.lowestPrice": "1박 최저가(세금 포함)",
    "sticky.selectRoom": "객실 선택하기",
    "sticky.instant": "즉시 확정 · 무료 취소(일부 객실)",

    "screen.footer": "본 페이지는 프로토타입 페이지 입니다.",

    "search.destination": "목적지",
    "search.placeholder": "예: 후쿠오카",
    "search.checkin": "체크인",
    "search.checkout": "체크아웃",
    "search.guests": "인원",
    "search.search": "검색",

    "gallery.viewRooms": "객실 사진 보기",
    "gallery.imageAltMain": "호텔 대표 이미지",
    "gallery.imageAltItem": "호텔 이미지",
  },
  ja: {
    "header.location": "日本・福岡県・福岡市",
    "header.hotelName": "西鉄グランドホテル (Nishitetsu Grand Hotel)",
    "header.rating": "評価 8.8",
    "header.share": "共有",
    "header.save": "保存",

    "info.locationBadge": "ロケーション良好",
    "info.cleanBadge": "清潔さ良好",
    "info.valueBadge": "コスパ良し",
    "info.review": "クチコミ",
    "info.ratingLabel": "8.8 すばらしい",

    "tabs.overview": "概要",
    "tabs.rooms": "客室",
    "tabs.trip": "旅行おすすめ",
    "tabs.facilities": "設備・サービス",
    "tabs.reviews": "クチコミ",
    "tabs.location": "ロケーション",
    "tabs.policy": "ポリシー",
    "tabs.nearby": "周辺情報を見る",

    "sticky.lowestPrice": "1泊の最安値(税込)",
    "sticky.selectRoom": "客室を選択",
    "sticky.instant": "即時確定・無料キャンセル(一部客室)",

    "screen.footer": "このページはプロトタイプです。",

    "search.destination": "目的地",
    "search.placeholder": "例: 福岡",
    "search.checkin": "チェックイン",
    "search.checkout": "チェックアウト",
    "search.guests": "人数",
    "search.search": "検索",

    "gallery.viewRooms": "客室写真を見る",
    "gallery.imageAltMain": "ホテル メイン画像",
    "gallery.imageAltItem": "ホテル画像",
  },
  en: {
    "header.location": "Japan · Fukuoka Prefecture · Fukuoka",
    "header.hotelName": "Nishitetsu Grand Hotel",
    "header.rating": "Rating 8.8",
    "header.share": "Share",
    "header.save": "Save",

    "info.locationBadge": "Great location",
    "info.cleanBadge": "Very clean",
    "info.valueBadge": "Good value",
    "info.review": "Reviews",
    "info.ratingLabel": "8.8 Excellent",

    "tabs.overview": "Overview",
    "tabs.rooms": "Rooms",
    "tabs.trip": "Trip picks",
    "tabs.facilities": "Facilities/Services",
    "tabs.reviews": "Reviews",
    "tabs.location": "Location",
    "tabs.policy": "Policy",
    "tabs.nearby": "View nearby",

    "sticky.lowestPrice": "Lowest price per night (tax incl.)",
    "sticky.selectRoom": "Select room",
    "sticky.instant": "Instant confirmation · Free cancellation (some rooms)",

    "screen.footer": "This page is a prototype.",

    "search.destination": "Destination",
    "search.placeholder": "e.g., Fukuoka",
    "search.checkin": "Check-in",
    "search.checkout": "Check-out",
    "search.guests": "Guests",
    "search.search": "Search",

    "gallery.viewRooms": "View room photos",
    "gallery.imageAltMain": "Hotel main image",
    "gallery.imageAltItem": "Hotel image",
  },
};


