import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
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
      select: ["_id", "title", "slug", "body"],
    },
  });

  return articles;
});

export default component$(() => {
  const articles = useArticles();
  return (
    <main>
      <div class="mx-auto max-w-8xl px-4 lg:flex">
        <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
          <h1 class="text-center my-2 text-3xl font-bold text-gray-900">Blog</h1>
          <p class="text-center text-md text-gray-500">技術記事や日記など</p>
          <hr class="my-4 h-px border-0 bg-gray-300" />
          <ul>
            {articles.value.map((article) => {
              return (
                <li key={article._id}>
                  <a href={`${article.slug}`} class="font-medium text-blue-600 hover:underline">
                    {article.title}
                  </a>
                </li>
              );
            })}
          </ul>
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
