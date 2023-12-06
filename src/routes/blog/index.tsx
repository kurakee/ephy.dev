import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ArticleList } from "~/components/article/article-list";
import { generateClient } from "~/libs/newt";
import type { Article } from "~/types/article";

export const useArticles = routeLoader$(async ({ env, query }) => {
  const spaceUid = env.get("NEWT_SPACE_UID") || "";
  const token = env.get("NEWT_CDN_API_TOKEN") || "";
  const client = generateClient(spaceUid, token);
  // ページング
  const page = query.has("page") ? Number(query.get("page")) : 1;
  const skip = Math.max(0, page - 1) * 4;

  const { total, items: articles } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "_sys", "title", "meta", "slug", "body", "coverImage", "tags"],
      limit: 4,
      skip: skip,
    },
  });

  // TODO ページネーション
  console.log(total);

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
          {/* TODO ページネーション */}

          <hr class="mx-auto my-8 h-1 w-60 border-0 bg-gray-100" />

          <div class="flex justify-center">
            <nav aria-label="Pagination">
              <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
                <li>
                  <a
                    href="#"
                    class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Previous</span>
                  </a>
                </li>
                <li>
                  <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">
                    Page <b class="mx-1">1</b> of <b class="ml-1">10</b>
                  </span>
                </li>
                <li>
                  <a
                    href="#"
                    class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span>Next</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
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
