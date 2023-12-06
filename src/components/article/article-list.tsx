import { component$ } from "@builder.io/qwik";
import { formatDate } from "~/libs/utils";
import type { Article } from "~/types/article";
import { Badge } from "~/components/article/badge";

interface ArticleProps {
  articles: Article[];
}

export const ArticleList = component$<ArticleProps>((props) => {
  return (
    <>
      <div class="mx-auto overflow-hidden rounded-lg bg-white">
        <ul class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:px-8">
          {props.articles.map((article) => {
            return (
              <>
                <li>
                  <div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                    <a href={`${article.slug}`}>
                      <img
                        src={article.coverImage.src}
                        class="aspect-w-2 aspect-h-1 h-48 w-full object-cover"
                        alt={article.coverImage.altText}
                        height={120}
                        width={120}
                      />
                    </a>
                    <div class="p-4">
                      <p class="mb-1 text-sm text-gray-500">
                        <time>{formatDate(article._sys.createdAt)}</time>
                      </p>
                      <a href={`${article.slug}`} class="line-clamp-2 h-16 overflow-hidden">
                        <h3 class="text-lg font-medium text-gray-700">{article.title}</h3>
                      </a>
                      <p class="mt-1 line-clamp-2 h-12 overflow-hidden text-xs text-gray-500">
                        {article.meta.description}
                      </p>
                      <div class="mt-4 flex gap-2">
                        {article.tags.map((tag) => {
                          return <Badge key={tag._id} badgeName={tag.name} />;
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
