/**
 * 日付文字列をフォーマット
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ja-jp", { year: "numeric", month: "numeric", day: "numeric" });
};
