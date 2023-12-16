import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import prismStyle from "prism-themes/themes/prism-coldark-cold.min.css?inline";
import blogStyle from "~/styles/blog-body.css?inline";

export default component$(() => {
  useStyles$(blogStyle);
  useStyles$(prismStyle);
  const location = useLocation();

  return (
    <div class="max-w-8xl mx-auto px-4 lg:flex">
      <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
        {location.url.pathname === "/blog" ? (
          <Slot />
        ) : (
          <div class="markdown">
            <Slot />
          </div>
        )}
      </div>
    </div>
  );
});
