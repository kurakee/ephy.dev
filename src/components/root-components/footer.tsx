import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <>
      <footer class="bg-white mt-10">
        <div class="mx-auto max-w-8xl">
          <div class="border-t py-10 text-center">© 2023 - ephy.dev</div>
        </div>
      </footer>
    </>
  );
});
