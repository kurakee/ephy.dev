import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Picture } from "~/components/utils/picture";
import { formatDate } from "~/libs/utils";
import type { Blog } from "~/types/blog";
import type { Tag } from "~/types/tag";
import { Badge } from "./badge";

interface ArticleProps {
  articles?: Blog[];
}

export const ArticleList = component$<ArticleProps>((props) => {
  return (
    <>
      <div class="mx-auto overflow-hidden rounded-lg bg-white">
        {props.articles ? (
          <ul class="grid gap-4 py-2 sm:grid-cols-1 md:grid-cols-2 md:px-8">
            {props.articles.map((article, idx) => {
              return (
                <li key={idx}>
                  <div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                    <Link prefetch href={`/blog/${article.id}`} title={article.title} aria-label={article.title}>
                      <Picture
                        src={article.thumbnail?.url || "https://storage.ephy.dev/default-cover.webp"}
                        alt={`${article.title}の記事サムネイル`}
                        height={200}
                        width={450}
                      />
                    </Link>
                    <div class="p-4">
                      <p class="mb-1 text-sm text-gray-500">
                        <time>{formatDate(article.publishedAt || article.createdAt)}</time>
                      </p>
                      <Link prefetch href={`/blog/${article.id}`} class="line-clamp-2 h-16 overflow-hidden">
                        <h1 class="text-lg font-medium text-gray-700 hover:text-blue-500">{article.title}</h1>
                      </Link>
                      <p class="mt-1 line-clamp-3 h-12 overflow-hidden text-xs text-gray-500">{article.description}</p>
                      <div class="mt-4 flex gap-2">
                        {article.tags.map((tag: Tag) => {
                          return <Badge key={tag.id} badgeName={tag.name} />;
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <p class="text-md my-10 text-center font-bold text-gray-500">記事がありません。</p>
            <a href="/blog" class="text-gray-700 hover:text-blue-500" aria-label="ブログトップへ">
              <p class="text-md text-center">ブログトップへ</p>
            </a>
          </>
        )}
      </div>
    </>
  );
});
