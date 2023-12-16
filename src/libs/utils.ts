/**
 * 日付をフォーマットする
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("ja-jp", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  });
};

/**
 * 配列をチャンク状の配列に変換する
 * @param arr
 * @param size
 * @returns
 */
export const arrayToChunks = <T>(arr: T[], size: number): T[][] => {
  return arr.reduce((newArray, _, i) => (i % size ? newArray : [...newArray, arr.slice(i, i + size)]), [] as T[][]);
};
