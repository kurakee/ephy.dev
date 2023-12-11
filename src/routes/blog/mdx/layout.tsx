import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import prismStyle from "prism-themes/themes/prism-one-dark.css?inline";
import blogStyle from "~/styles/blog-body.css?inline";

export default component$(() => {
  useStyles$(blogStyle);
  useStyles$(prismStyle);
  return (
    <div class="markdown">
      <Slot />
    </div>
  );
});
