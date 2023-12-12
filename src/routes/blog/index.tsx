import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, type DocumentHeadProps } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import { ArticleList } from "~/components/article/article-list";
import { isNotUndefined } from "~/type-guards/utils";
import type { Article } from "~/types/article";

export interface MDXArticles {
  articles: Article[];
}

/**
 * 記事MDXの収集とフロントに渡す情報の整理
 */
export const useArticles = routeLoader$(async (): Promise<MDXArticles> => {
  const mdxComponents: Record<string, any> = import.meta.glob("/src/routes/blog/**/index.mdx", {
    eager: isDev ? false : true,
  });

  const articles = await Promise.all(
    Object.keys(mdxComponents).map(async (path) => {
      const doc = (await mdxComponents[path]()) as DocumentHeadProps;

      // publishedAtの有無で表示のコントロールをする
      const publishedAt = doc.head.frontmatter.publishedAt;
      if (!publishedAt) return;

      const href = path.match(/\/([^/]+)\/index\.mdx$/);
      const description = doc.head.meta.find((obj) => obj.name === "description");
      const imgSrc = doc.head.meta.find((obj) => obj.property === "og:image");

      return {
        title: doc.head.title,
        description: description?.content,
        publishedAt: publishedAt,
        href: `${href ? href[1] : ""}`,
        image: {
          src: imgSrc?.content,
          alt: `${doc.head.title}のカバー画像`,
        },
        tags: doc.head.frontmatter.tags,
      } as Article;
    }),
  );

  return { articles: articles.filter(isNotUndefined) };
});

export default component$(() => {
  const { articles } = useArticles().value;

  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-md text-center text-gray-500">技術記事や日記</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      {articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />
          <hr class="mx-auto my-8 h-1 w-60 border-0 bg-gray-100" />
          {/* TODO: Pager */}
          {/* <ArticlePager pager={pager} /> */}
        </>
      ) : (
        <>
          <p class="text-md my-10 text-center font-bold text-gray-500">記事が見つかりません。</p>
          <a href="/blog" class="text-gray-700 hover:text-blue-500" aria-label="back to blog">
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
