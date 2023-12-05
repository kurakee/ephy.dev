import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main>
      <p>About page</p>
      <img
        src="https://ephy.assets.newt.so/v1/f43f79d6-316e-4ba4-b9db-c40a6ed0bb0e/icon-2045450479.png"
        height={128}
        width={128}
        alt="icon"
      />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Newt・Qwik Cityブログ",
  meta: [
    {
      name: "description",
      content: "NewtとQwik Cityを利用したブログです",
    },
  ],
};
