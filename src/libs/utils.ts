import * as cheerio from "cheerio";
import { getHighlighter } from "shiki";

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

export const formatRichText = async (richText: string) => {
  const $ = cheerio.load(richText);
  const highlighter = await getHighlighter({ theme: "nord" });

  const highlight = (text: string, lang: string) => {
    try {
      return highlighter.codeToHtml(text, { lang: lang.replace(/^language-/, "") || "plaintext" });
    } catch (e) {
      return highlighter.codeToHtml(text, { lang: "plaintext" });
    }
  };

  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class") || "plaintext";
    const res = highlight($(elm).text(), lang);
    $(elm).html(res);
  });

  return $.html();
};
