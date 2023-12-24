import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { ArticlePager } from "~/components/article/article-pager";
import { CMS_ENDPOINTS, getClient } from "~/libs/micro-cms";
import type { Blog } from "~/types/blog";

type ArticleAndPager = {
  articles: Blog[];
  pager: Pager;
};

type Pager = {
  page: number;
  pageTotal: number;
};

export const useMicroCMS = routeLoader$(async ({ env, query }): Promise<ArticleAndPager> => {
  const client = getClient(env);
  const page = Number(query.get("page")) || 1;
  const pageContentSize = 6;
  const { contents, totalCount } = await client.getList<Blog>({
    endpoint: CMS_ENDPOINTS.Blog,
    queries: {
      offset: (page - 1) * pageContentSize,
    },
  });
  return {
    articles: contents,
    pager: { page: page, pageTotal: Math.ceil(totalCount / pageContentSize) },
  };
});

export default component$(() => {
  const { articles, pager } = useMicroCMS().value;

  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-md text-center text-gray-500">技術記事や日記</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      <ArticleList articles={articles} />
      <hr class="mx-auto my-8 h-1 w-60 border-0 bg-gray-100" />
      <ArticlePager pager={pager} />
    </>
  );
});

export const head: DocumentHead = {
  title: "記事一覧",
  meta: [
    {
      name: "description",
      content: "kurakeによる、個人ブログ記事の一覧です。",
    },
    // open graph
    {
      property: "og:title",
      content: "記事一覧",
    },
    {
      property: "og:description",
      content: "kurakeによる、個人ブログ記事の一覧です。",
    },
    {
      property: "og:image",
      content: "https://storage.ephy.dev/default-cover.webp",
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: "ephy.dev",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: `https://ephy.dev/blog`,
    },
  ],
};
