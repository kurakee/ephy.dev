import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { ArticlePager } from "~/components/article/article-pager";
import { CMS_ENDPOINTS, getClient } from "~/libs/micro-cms";
import type { Blog } from "~/types/blog";

export const useMicroCMS = routeLoader$(async ({ env }) => {
  const client = getClient(env);
  const { contents } = await client.getList<Blog>({
    endpoint: CMS_ENDPOINTS.Blog,
  });
  return contents;
});

export default component$(() => {
  const microCMS = useMicroCMS();

  const pager = {
    page: 1,
    pageCount: 1,
  };

  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
      <p class="text-md text-center text-gray-500">技術記事や日記</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      <ArticleList articles={microCMS.value} />
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
      content: "ephy.devブログ記事の一覧です。",
    },
  ],
};
