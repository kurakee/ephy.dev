import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { generateClient } from "~/libs/newt";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Article } from "~/types/article";

export const useArticle = routeLoader$(async ({ env, params, fail }) => {
  const spaceUid = env.get("NEWT_SPACE_UID") || "";
  const token = env.get("NEWT_CDN_API_TOKEN") || "";
  const client = generateClient(spaceUid, token);

  const article = await client.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug: params.slug,
      select: ["_id", "title", "slug", "body"],
    },
  });
  if (!article) {
    return fail(404, {
      errorMessage: "Not found",
    });
  }

  return article;
});

export default component$(() => {
  const article = useArticle();
  if (article.value.errorMessage) {
    return <h1>{article.value.errorMessage}</h1>;
  }

  return (
    <>
      <div class="mx-auto max-w-8xl px-4 lg:flex">
        <article class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
          <h1 class="text-center border-b py-4 my-4 text-4xl font-bold text-gray-900">{article.value.title}</h1>
          <div dangerouslySetInnerHTML={article.value.body} />
        </article>
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const article = resolveValue(useArticle);
  return {
    title: article.title,
    meta: [
      {
        name: "description",
        content: "投稿詳細ページです",
      },
    ],
  };
};
