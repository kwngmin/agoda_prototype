import { NextResponse } from "next/server";
import { parseSpreadsheetData } from "@/src/features/listings/lib/fetch-spreadsheet-data";

const SPREADSHEET_ID = "1uce43RJ5O182QiDJHOu-EE8M_PM3Bm2IU5JpBPB7x6E";

/**
 * Google 스프레드시트 CSV export URL 생성 (여러 형식 시도)
 */
function getCSVExportUrls(): string[] {
  return [
    // gid 없이 첫 번째 시트 가져오기
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`,
    // gid=0으로 첫 번째 시트 가져오기
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`,
    // 시트 이름 지정 (첫 번째 시트가 "Sheet1"인 경우)
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`,
    // 원본 시트 이름이 다른 경우를 대비
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv`,
  ];
}

/**
 * Google 스프레드시트에서 레스토랑 데이터를 가져오는 API 엔드포인트
 */
export async function GET() {
  const urls = getCSVExportUrls();
  let lastError: Error | null = null;

  // 여러 URL 형식을 순차적으로 시도
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // 1시간 캐시
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/csv",
        },
      });

      if (!response.ok) {
        // 400번대 에러는 URL 형식이 잘못된 것이므로 다음 URL 시도
        if (response.status >= 400 && response.status < 500) {
          continue;
        }
        throw new Error(`Failed to fetch spreadsheet: ${response.status} ${response.statusText}`);
      }

      const csvText = await response.text();
      
      // HTML 에러 페이지가 반환된 경우 (예: 로그인 요구)
      if (csvText.includes("<!DOCTYPE html>") || csvText.includes("<html")) {
        throw new Error("Spreadsheet is not publicly accessible. Please make it public.");
      }
      
      if (!csvText || csvText.trim().length === 0) {
        throw new Error("Empty CSV data received");
      }

      const restaurants = parseSpreadsheetData(csvText);
      
      if (restaurants.length === 0) {
        throw new Error("No restaurants parsed from CSV data");
      }

      return NextResponse.json(restaurants);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      // 네트워크 에러나 파싱 에러가 아닌 경우 다음 URL 시도
      if (error instanceof Error && !error.message.includes("fetch")) {
        continue;
      }
    }
  }

  // 모든 URL이 실패한 경우
  console.error("Error fetching spreadsheet data:", lastError);
  return NextResponse.json(
    { 
      error: "Failed to fetch restaurant data",
      details: lastError?.message || "All export URL formats failed",
      hint: "Please ensure the spreadsheet is set to 'Anyone with the link can view'"
    },
    { status: 500 }
  );
}

