import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import prismStyle from "prism-themes/themes/prism-one-dark.css?inline";
import blogStyle from "~/styles/blog-body.css?inline";

export default component$(() => {
  useStyles$(blogStyle);
  useStyles$(prismStyle);

  return (
    <div class="max-w-8xl mx-auto px-4 lg:flex">
      <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
        <div class="markdown">
          <Slot />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ head }) => {
  // TODO: frontmatter.publishedAtが無いものを表示しない処理?
  return {
    ...head,
    frontmatter: {
      ...head.frontmatter,
    },
    meta: [...head.meta],
  };
};
