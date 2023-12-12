import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { Badge } from "~/components/article/badge";

export const Tags = component$(() => {
  const { frontmatter } = useDocumentHead();

  const tags = frontmatter.tags;

  if (tags && tags.length === 0) return <></>;

  return (
    <div class="mt-4 flex gap-2">
      {tags &&
        tags.map((tag: string) => {
          return <Badge key={tag} badgeName={tag} />;
        })}
    </div>
  );
});
