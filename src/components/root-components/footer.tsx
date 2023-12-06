import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <>
      <footer class="mt-10 bg-white">
        <div class="max-w-8xl mx-auto">
          <div class="border-t py-10 text-center">© 2023 - ephy.dev</div>
        </div>
      </footer>
    </>
  );
});
