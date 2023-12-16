import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { Tags } from "~/components/article/tag";
import { Picture } from "~/components/utils/picture";

export const ArticleHead = component$(() => {
  const { title, meta, frontmatter } = useDocumentHead();

  const src = meta.find((obj) => obj.property === "og:image")?.content;
  const description = meta.find((obj) => obj.name === "description")?.content;
  const publishedAt = frontmatter.publishedAt;

  return (
    <>
      <div class="lg:w-4/5 mx-auto">
        <p class="text-md text-center text-gray-500">{publishedAt}</p>
        <h1 class="my-1 text-center text-3xl font-bold text-gray-900">{title}</h1>
        <Picture loading="eager" width={480} height={256} src={src || ""} alt={title} />
        <p class="text-md text-center text-gray-500">{description}</p>
        <div class="flex items-center justify-center">
          <Tags />
        </div>
        <hr class="my-4 h-px border-0 bg-gray-300" />
      </div>
    </>
  );
});
