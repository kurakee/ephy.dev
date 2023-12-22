import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import blogStyle from "~/styles/blog-body.css?inline";

export default component$(() => {
  useStyles$(blogStyle);

  return (
    <div class="max-w-8xl mx-auto px-4 lg:flex">
      <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
        <Slot />
      </div>
    </div>
  );
});
