import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import prismStyle from "prism-themes/themes/prism-one-dark.css?inline";
import { generateClient } from "~/libs/newt";
import blogBodyStyle from "~/styles/blog-body.css?inline";
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

  useStyles$(blogBodyStyle);
  useStyles$(prismStyle);

  return (
    <>
      <div class="max-w-8xl mx-auto px-4 lg:flex">
        <article class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
          <h1 class="my-4 border-b py-4 text-center text-4xl font-bold text-gray-900">{article.value.title}</h1>
          <div class="markdown" dangerouslySetInnerHTML={article.value.body} />
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
