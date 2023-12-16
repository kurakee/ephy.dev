import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, type DocumentHeadProps } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { ArticlePager } from "~/components/article/article-pager";
import { arrayToChunks } from "~/libs/utils";
import { isNotUndefined } from "~/type-guards/utils";
import type { Article } from "~/types/article";
import type { Pager } from "~/types/pager";

export interface MDXArticles {
  articles?: Article[];
  pager: Pager;
}

/**
 * 記事MDXの収集とフロントに渡す情報の整理
 */
export const useArticles = routeLoader$(async ({ query }): Promise<MDXArticles> => {
  const mdxComponents: Record<string, any> = import.meta.glob("/src/routes/blog/**/index.mdx");

  const articleRecords = await Promise.all(
    Object.keys(mdxComponents).map(async (path) => {
      const doc = (await mdxComponents[path]()) as DocumentHeadProps;
      const href = path.match(/\/([^/]+)\/index\.mdx$/);
      const description = doc.head.meta.find((obj) => obj.name === "description");
      const imgSrc = doc.head.meta.find((obj) => obj.property === "og:image");

      if (!doc.head.frontmatter.publishedAt) return undefined;

      return {
        title: doc.head.title,
        description: description?.content,
        publishedAt: new Date(doc.head.frontmatter.publishedAt),
        href: `${href ? href[1] : ""}`,
        image: {
          src: imgSrc?.content,
          alt: `${doc.head.title}のカバー画像`,
        },
        tags: doc.head.frontmatter.tags,
      } as Article;
    }),
  );

  const filteredArticles = articleRecords
    .filter(isNotUndefined)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const page = query.has("page") ? Number(query.get("page")) : 1;
  const articleChunks = arrayToChunks(filteredArticles, 6);

  return {
    articles: articleChunks[page - 1],
    pager: {
      page: page,
      pageCount: articleChunks.length || 1,
    },
  };
});

export default component$(() => {
  const { articles, pager } = useArticles().value;

  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-md text-center text-gray-500">技術記事や日記</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      {articles && articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />
          <hr class="mx-auto my-8 h-1 w-60 border-0 bg-gray-100" />
          <ArticlePager pager={pager} />
        </>
      ) : (
        <>
          <p class="text-md my-10 text-center font-bold text-gray-500">記事が見つかりません。</p>
          <a href="/blog" class="text-gray-700 hover:text-blue-500" aria-label="ブログトップへ">
            <p class="text-md text-center">ブログトップへ</p>
          </a>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "記事一覧",
  meta: [
    {
      name: "description",
      content: "ephy.devブログ記事の一覧です。",
    },
  ],
};
