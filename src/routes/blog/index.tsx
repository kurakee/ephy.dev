import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { ArticlePager } from "~/components/article/article-pager";
import { generateClient } from "~/libs/newt";
import type { Article } from "~/types/article";
import type { Pager } from "~/types/pager";

interface ArticleAndPager {
  articles: Article[];
  pager: Pager;
}

export const useArticles = routeLoader$(async ({ env, query }): Promise<ArticleAndPager> => {
  const spaceUid = env.get("NEWT_SPACE_UID") || "";
  const token = env.get("NEWT_CDN_API_TOKEN") || "";
  const client = generateClient(spaceUid, token);

  const limit = 4;
  const page = query.has("page") ? Number(query.get("page")) : 1;
  const skip = Math.max(0, page - 1) * limit;

  const { total, items: articles } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "_sys", "title", "meta", "slug", "body", "coverImage", "tags"],
      limit: limit,
      skip: skip,
    },
  });
  const pager = {
    page: page,
    pageCount: Math.ceil(total / 4),
  };

  return { articles: articles, pager: pager };
});

export default component$(() => {
  const { articles, pager } = useArticles().value;

  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-md text-center text-gray-500">技術記事や日記</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      {articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />
          <hr class="mx-auto my-8 h-1 w-60 border-0 bg-gray-100" />
          <ArticlePager pager={pager} />
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
