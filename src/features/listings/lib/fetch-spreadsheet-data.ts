import type { RestaurantItem } from "@/src/features/listings/model/listings-store";

/**
 * Google 스프레드시트의 CSV 데이터를 파싱하여 RestaurantItem 배열로 변환
 * @param csvText - CSV 형식의 텍스트 데이터
 * @returns RestaurantItem 배열
 */
export function parseSpreadsheetData(csvText: string): RestaurantItem[] {
  // CSV 파싱: 따옴표 내부의 줄바꿈을 고려하여 라인 분리
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // 이스케이프된 따옴표
        currentLine += '"';
        i++; // 다음 문자 건너뛰기
      } else {
        // 따옴표 시작/끝
        insideQuotes = !insideQuotes;
      }
      currentLine += char;
    } else if (char === "\n" && !insideQuotes) {
      // 따옴표 밖에서만 줄바꿈 처리
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = "";
    } else {
      currentLine += char;
    }
  }

  // 마지막 라인 추가
  if (currentLine.trim()) {
    lines.push(currentLine);
  }

  if (lines.length < 2) {
    return [];
  }

  // 헤더 파싱
  const headerLine = parseCSVLine(lines[0]);

  // 디버깅: 헤더 출력
  console.log(
    "CSV Headers:",
    headerLine.map((h, i) => `${String.fromCharCode(65 + i)}: ${h}`).join(", ")
  );

  // 헤더 인덱스 찾기 (대소문자 구분 없이, 공백 제거)
  let idIndex = headerLine.findIndex((h) => {
    const normalized = h.trim().toLowerCase();
    return normalized === "id" || normalized === "아이디";
  });
  let titleIndex = headerLine.findIndex((h) => {
    const normalized = h.trim().toLowerCase();
    return (
      normalized === "title" || normalized === "타이틀" || normalized === "제목"
    );
  });
  let urlIndex = headerLine.findIndex((h) => {
    const normalized = h.trim().toLowerCase();
    return normalized === "url" || normalized === "링크";
  });
  let typeIndex = headerLine.findIndex((h) => {
    const normalized = h.trim().toLowerCase();
    return (
      normalized === "type" || normalized === "타입" || normalized === "종류"
    );
  });

  // Fallback: 헤더를 찾지 못한 경우 알파벳 인덱스로 직접 지정
  // A=id (0), B=title (1), C=url (2), V=type (21)
  if (idIndex < 0 && headerLine.length > 0) {
    idIndex = 0; // A열
    console.log("Warning: id header not found, using column A (index 0)");
  }
  if (titleIndex < 0 && headerLine.length > 1) {
    titleIndex = 1; // B열
    console.log("Warning: title header not found, using column B (index 1)");
  }
  if (urlIndex < 0 && headerLine.length > 2) {
    urlIndex = 2; // C열
    console.log("Warning: url header not found, using column C (index 2)");
  }
  if (typeIndex < 0 && headerLine.length > 21) {
    typeIndex = 21; // V열
    console.log("Warning: type header not found, using column V (index 21)");
  }

  /**
   * 알파벳을 인덱스로 변환 (A=0, B=1, ..., Z=25)
   */
  function columnLetterToIndex(letter: string): number {
    return letter.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
  }

  // 알파벳 컬럼 쌍 정의 (앞=상호, 뒤=주소)
  // 사용자가 제공한 쌍: g,h / j,l / k,l / m,n / o,p / q,r / s,t / u,v / w,x / x,y / y,z
  const columnPairs: Array<{ nameCol: string; addressCol: string }> = [
    { nameCol: "g", addressCol: "h" },
    { nameCol: "j", addressCol: "l" },
    { nameCol: "k", addressCol: "l" },
    { nameCol: "m", addressCol: "n" },
    { nameCol: "o", addressCol: "p" },
    { nameCol: "q", addressCol: "r" },
    { nameCol: "s", addressCol: "t" },
    { nameCol: "u", addressCol: "v" },
    { nameCol: "w", addressCol: "x" },
    { nameCol: "x", addressCol: "y" },
    { nameCol: "y", addressCol: "z" },
  ];

  // 상호와 주소 컬럼 인덱스 쌍 생성
  // 먼저 헤더 이름으로 찾고, 없으면 알파벳 인덱스로 직접 접근
  const restaurantPairs: Array<{
    nameIndex: number;
    addressIndex: number;
    nameCol: string;
    addressCol: string;
  }> = [];

  // 헤더에서 상호/주소 패턴 찾기 (상호1, 주소1, 상호2, 주소2 등)
  const headerBasedPairs: Array<{ nameIndex: number; addressIndex: number }> =
    [];
  for (let i = 0; i < headerLine.length; i++) {
    const header = headerLine[i]?.trim().toLowerCase() || "";
    if (header.startsWith("상호")) {
      const numMatch = header.match(/\d+/);
      if (numMatch) {
        const num = parseInt(numMatch[0], 10);
        // 해당 상호에 맞는 주소 찾기
        const addressHeader = `주소${num}`;
        const addressIdx = headerLine.findIndex(
          (h) => h.trim().toLowerCase() === addressHeader
        );
        if (addressIdx >= 0) {
          headerBasedPairs.push({ nameIndex: i, addressIndex: addressIdx });
        }
      }
    }
  }

  // 헤더 기반으로 찾은 쌍이 있으면 사용, 없으면 알파벳 인덱스 사용
  if (headerBasedPairs.length > 0) {
    console.log(
      `Found ${headerBasedPairs.length} restaurant pairs from headers`
    );
    headerBasedPairs.forEach((pair, idx) => {
      const nameHeader = headerLine[pair.nameIndex] || "";
      const addressHeader = headerLine[pair.addressIndex] || "";
      restaurantPairs.push({
        nameIndex: pair.nameIndex,
        addressIndex: pair.addressIndex,
        nameCol: nameHeader,
        addressCol: addressHeader,
      });
      console.log(
        `  ${idx + 1}. ${nameHeader}(${pair.nameIndex}) / ${addressHeader}(${
          pair.addressIndex
        })`
      );
    });
  } else {
    // 헤더로 찾지 못한 경우 알파벳 인덱스 사용
    console.log("Using alphabet-based column indexing");
    for (const pair of columnPairs) {
      const nameIdx = columnLetterToIndex(pair.nameCol);
      const addressIdx = columnLetterToIndex(pair.addressCol);

      // CSV 필드 범위 내에 있는지만 확인 (헤더 길이를 기준으로)
      if (nameIdx < headerLine.length && addressIdx < headerLine.length) {
        restaurantPairs.push({
          nameIndex: nameIdx,
          addressIndex: addressIdx,
          nameCol: pair.nameCol.toUpperCase(),
          addressCol: pair.addressCol.toUpperCase(),
        });
      }
    }
  }

  // 디버깅: 컬럼 쌍 매핑 정보 출력
  console.log("Restaurant column pairs mapping:");
  restaurantPairs.forEach((pair, idx) => {
    const nameHeader = headerLine[pair.nameIndex] || "";
    const addressHeader = headerLine[pair.addressIndex] || "";
    console.log(
      `  ${idx + 1}. ${pair.nameCol}(${pair.nameIndex})="${nameHeader}" / ${
        pair.addressCol
      }(${pair.addressIndex})="${addressHeader}"`
    );
  });

  // 첫 번째 줄은 헤더이므로 제외
  const dataLines = lines.slice(1);
  const restaurants: RestaurantItem[] = [];

  for (const line of dataLines) {
    // CSV 파싱: 따옴표로 감싸진 필드 처리
    const fields = parseCSVLine(line);

    if (
      idIndex < 0 ||
      titleIndex < 0 ||
      idIndex >= fields.length ||
      titleIndex >= fields.length
    ) {
      continue;
    }

    const id = fields[idIndex]?.trim() || "";
    const title = fields[titleIndex]?.trim() || "";
    const type =
      typeIndex >= 0 && typeIndex < fields.length
        ? fields[typeIndex]?.trim().toLowerCase() || "long"
        : "long";

    // 디버깅: 첫 번째 항목의 title 출력
    if (restaurants.length === 0 && title) {
      console.log("First title value:", title);
      console.log(
        "Title index:",
        titleIndex,
        "Title field length:",
        title.length
      );
    }

    if (!id || !title) continue;

    // YouTube URL에서 videoId 추출
    const url =
      urlIndex >= 0 && urlIndex < fields.length
        ? fields[urlIndex]?.trim() || ""
        : "";
    const videoId = extractVideoId(url);

    // 상호와 주소 데이터 수집 (알파벳 컬럼 쌍 기반)
    const subItems: { name: string; address: string }[] = [];

    for (const pair of restaurantPairs) {
      const nameRaw =
        pair.nameIndex < fields.length ? fields[pair.nameIndex] || "" : "";
      const addressRaw =
        pair.addressIndex < fields.length
          ? fields[pair.addressIndex] || ""
          : "";

      // 공백 제거 및 빈값 체크
      const name = nameRaw.trim();
      const address = addressRaw.trim();

      // 상호와 주소가 모두 있고, 실제 내용(공백이 아닌 문자)이 있는 경우만 추가
      // 빈 문자열, 공백만 있는 경우 제외
      // /\S/ = 공백이 아닌 문자가 하나라도 있는지 확인
      const hasValidName = name.length > 0 && /\S/.test(name);
      const hasValidAddress = address.length > 0 && /\S/.test(address);

      // 디버깅: 첫 번째 항목의 각 쌍 읽기 과정 출력
      if (restaurants.length === 0) {
        const nameHeader = headerLine[pair.nameIndex] || "";
        const addressHeader = headerLine[pair.addressIndex] || "";
        console.log(
          `  Reading [${pair.nameCol}(${pair.nameIndex})="${nameHeader}"] = "${name}" / [${pair.addressCol}(${pair.addressIndex})="${addressHeader}"] = "${address}"`
        );
        console.log(
          `    -> Valid: name=${hasValidName}, address=${hasValidAddress}`
        );
      }

      if (hasValidName && hasValidAddress) {
        subItems.push({ name, address });
      } else {
        // 디버깅: 첫 번째 항목에서 유효하지 않은 쌍 출력
        if (restaurants.length === 0) {
          console.log(
            `    -> SKIPPED: name="${name}" (valid: ${hasValidName}), address="${address}" (valid: ${hasValidAddress})`
          );
        }
      }
    }

    // 디버깅: 첫 번째 항목의 subItems 개수 출력
    if (restaurants.length === 0) {
      console.log(
        `\nRestaurant "${title}": Found ${subItems.length} valid restaurant pairs`
      );
      subItems.forEach((item, idx) => {
        console.log(`  ${idx + 1}. ${item.name} - ${item.address}`);
      });
    }

    const icon: "youtube" | "shorts" = type === "shorts" ? "shorts" : "youtube";

    // 첫 번째 주소를 mapQuery로 사용 (없으면 title 사용)
    const mapQuery = encodeURIComponent(subItems[0]?.address || title);

    restaurants.push({
      id,
      name: title,
      videoId,
      mapQuery,
      icon,
      subItems,
    });
  }

  return restaurants;
}

/**
 * CSV 라인을 파싱하여 필드 배열 반환
 * @param line - CSV 라인 텍스트
 * @returns 필드 배열
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = "";
  let insideQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // 이스케이프된 따옴표
        currentField += '"';
        i += 2;
      } else {
        // 따옴표 시작/끝
        insideQuotes = !insideQuotes;
        i++;
      }
    } else if (char === "," && !insideQuotes) {
      // 필드 구분자
      fields.push(currentField);
      currentField = "";
      i++;
    } else {
      currentField += char;
      i++;
    }
  }

  // 마지막 필드 추가
  fields.push(currentField);

  return fields;
}

/**
 * YouTube URL에서 videoId 추출
 * @param url - YouTube URL
 * @returns videoId 또는 빈 문자열
 */
function extractVideoId(url: string): string {
  if (!url) return "";

  // https://www.youtube.com/watch?v=VIDEO_ID 형태
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return watchMatch[1];
  }

  // https://youtu.be/VIDEO_ID 형태
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  return "";
}
