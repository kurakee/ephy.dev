import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Badge } from "~/components/article/badge";
import { Picture } from "~/components/utils/picture";
import { formatDate } from "~/libs/utils";
import type { Article } from "~/types/article";

interface ArticleProps {
  articles: Article[];
}

export const ArticleList = component$<ArticleProps>((props) => {
  return (
    <>
      <div class="mx-auto overflow-hidden rounded-lg bg-white">
        <ul class="grid gap-4 py-2 sm:grid-cols-1 md:grid-cols-2 md:px-8">
          {props.articles.map((article) => {
            return (
              <>
                <li>
                  <div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                    <Link prefetch href={`/blog/d/${article.href}`} title={article.title} aria-label={article.title}>
                      <Picture src={article.image.src} alt={article.image.alt} height={200} width={400} />
                    </Link>
                    <div class="p-4">
                      <p class="mb-1 text-sm text-gray-500">
                        <time>{formatDate(article.publishedAt)}</time>
                      </p>
                      <Link prefetch href={`/blog/d/${article.href}`} class="line-clamp-2 h-16 overflow-hidden">
                        <h1 class="text-lg font-medium text-gray-700">{article.title}</h1>
                      </Link>
                      <p class="mt-1 line-clamp-2 h-12 overflow-hidden text-xs text-gray-500">{article.description}</p>
                      <div class="mt-4 flex gap-2">
                        {article.tags &&
                          article.tags.map((tag) => {
                            return <Badge key={tag} badgeName={tag} />;
                          })}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
});
