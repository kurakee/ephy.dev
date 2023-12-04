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
      <h1>{article.value.title}</h1>
      <div dangerouslySetInnerHTML={article.value.body} />
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
