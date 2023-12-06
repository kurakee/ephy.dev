import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { generateClient } from "~/libs/newt";
import type { Article } from "~/types/article";

export const useArticles = routeLoader$(async ({ env }) => {
  const spaceUid = env.get("NEWT_SPACE_UID") || "";
  const token = env.get("NEWT_CDN_API_TOKEN") || "";
  const client = generateClient(spaceUid, token);

  const { items: articles } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "_sys", "title", "meta", "slug", "body", "coverImage", "tags"],
    },
  });

  return articles;
});

export default component$(() => {
  const articles = useArticles();
  return (
    <main>
      <div class="max-w-8xl mx-auto px-4 lg:flex">
        <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
          <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Blog</h1>
          <p class="text-md text-center text-gray-500">技術記事や日記など</p>
          <hr class="my-4 h-px border-0 bg-gray-300" />
          <ArticleList articles={articles.value} />
        </div>
      </div>
    </main>
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
