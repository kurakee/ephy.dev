import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import syntax from "prism-themes/themes/prism-vsc-dark-plus.min.css?inline";
import { Badge } from "~/components/article/badge";
import { Picture } from "~/components/utils/picture";
import { CMS_ENDPOINTS, getClient } from "~/libs/micro-cms";
import { formatDate, syntaxHighlight } from "~/libs/utils";
import blogStyle from "~/styles/blog-body.css?inline";
import type { Blog } from "~/types/blog";
import type { Tag } from "~/types/tag";

export const useArticle = routeLoader$(async ({ env, params, query, status }) => {
  if (!params.articleId) {
    throw new Error("articleId is required");
  }

  const client = getClient(env);

  try {
    const article = await client.getListDetail<Blog>({
      endpoint: CMS_ENDPOINTS.Blog,
      contentId: params.articleId,
      queries: {
        draftKey: query.get("draftKey") || undefined,
      },
    });
    // 記事のシンタックスハイライトなど
    article.content = await syntaxHighlight(article.content);
    return article;
  } catch {
    status(404);
  }
});

export default component$(() => {
  useStyles$(blogStyle);
  useStyles$(syntax);
  const article = useArticle().value;
  if (!article)
    return (
      <div class="mx-auto text-center">
        <h1 class="text-center text-lg text-gray-900">コンテンツがありません</h1>
        <p class="mt-8">
          <Link class="hover:text-blue-500" href="/blog" aria-label="一覧へ戻る">
            一覧へ戻る
          </Link>
        </p>
      </div>
    );

  return (
    <div class="article">
      <div class="lg:w-4/5 mx-auto">
        <Picture loading="eager" width={480} height={256} src={article.thumbnail?.url || ""} alt={"title"} />
        <h1 class="text-center text-3xl font-bold text-gray-900">{article.title}</h1>
        <p class="text-md text-center text-gray-500">{formatDate(article.publishedAt || article.createdAt)}</p>
        <div class="flex items-center justify-center">
          <div class="flex gap-2">
            {article.tags.map((tag: Tag) => {
              return <Badge key={tag.id} badgeName={tag.name} />;
            })}
          </div>
        </div>
        <p class="text-md text-center text-gray-500">{article.description}</p>
        <hr class="my-4 h-px border-0 bg-gray-300" />
      </div>
      <div dangerouslySetInnerHTML={article.content} />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const article = resolveValue(useArticle);
  return {
    title: article?.title,
    meta: [
      {
        name: "description",
        content: article?.description,
      },
      // open graph
      {
        property: "og:title",
        content: article?.title,
      },
      {
        property: "og:description",
        content: article?.description,
      },
      {
        property: "og:image",
        content: article?.thumbnail?.url,
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
        href: `https://ephy.dev/blog/${article?.id}`,
      },
    ],
  };
};
