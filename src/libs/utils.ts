import * as cheerio from "cheerio";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

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

/**
 * 文字列をHTMLでパースし、シンタックスハイライトを入れる
 */
export const syntaxHighlight = (richText: string): string => {
  const $ = cheerio.load(richText);

  // Prismでの言語ハイライトの処理
  const highlight = (text: string, language?: string) => {
    if (!language || !Prism.languages[language]) {
      return Prism.highlight(text, Prism.languages.plain, "plain");
    }
    return Prism.highlight(text, Prism.languages[language], language);
  };

  $("pre code").each((_, elm) => {
    // 言語のクラス名を取得し、'language-' プレフィックスを削除
    const classAttr = $(elm).attr("class");
    const language = classAttr ? classAttr.replace(/^language-/, "") : "plain";
    const res = highlight($(elm).text(), language);
    $(elm).html(res);
  });

  return $.html();
};
