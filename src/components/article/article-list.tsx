import { component$ } from "@builder.io/qwik";
import { Badge } from "~/components/article/badge";
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
                    <a href={`/blog/${article.slug}`} title={article.title} aria-label={article.title}>
                      <picture>
                        <source
                          srcSet={
                            article.coverImage.src + "?format=webp&width=400&download=" + article.coverImage.fileName
                          }
                          type="image/webp"
                        />
                        <img
                          src={article.coverImage.src + "?format=jpg&width=400&download=" + article.coverImage.fileName}
                          class="aspect-w-2 aspect-h-1 h-48 w-full object-cover"
                          alt={article.coverImage.altText}
                          height={200}
                          width={400}
                        />
                      </picture>
                    </a>
                    <div class="p-4">
                      <p class="mb-1 text-sm text-gray-500">
                        <time>{formatDate(article._sys.createdAt)}</time>
                      </p>
                      <a href={`/blog/${article.slug}`} class="line-clamp-2 h-16 overflow-hidden">
                        <h1 class="text-lg font-medium text-gray-700">{article.title}</h1>
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
