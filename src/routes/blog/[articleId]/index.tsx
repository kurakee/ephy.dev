import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Badge } from "~/components/article/badge";
import { Picture } from "~/components/utils/picture";
import { CMS_ENDPOINTS, getClient } from "~/libs/micro-cms";
import { formatDate, formatRichText } from "~/libs/utils";
import blogStyle from "~/styles/blog-body.css?inline";
import type { Blog } from "~/types/blog";
import type { Tag } from "~/types/tag";

export const useArticle = routeLoader$(async ({ env, params, status }) => {
  if (!params.articleId) {
    throw new Error("articleId is required");
  }

  const client = getClient(env);

  try {
    const article = await client.getListDetail<Blog>({
      endpoint: CMS_ENDPOINTS.Blog,
      contentId: params.articleId,
    });
    // 記事のシンタックスハイライトなど
    article.content = await formatRichText(article.content);
    return article;
  } catch {
    status(404);
  }
});

export default component$(() => {
  useStyles$(blogStyle);
  const article = useArticle().value;

  // TODO: 値が空のときの表示
  if (!article) return <>no content</>;

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

export const head: DocumentHead = {
  title: "記事一覧",
  meta: [
    {
      name: "description",
      content: "ephy.devブログ記事の一覧です。",
    },
  ],
};
