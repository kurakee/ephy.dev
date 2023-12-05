import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>ephy.dev</h1>
      <img
        src="https://ephy.assets.newt.so/v1/f43f79d6-316e-4ba4-b9db-c40a6ed0bb0e/icon-2045450479.png"
        height={128}
        width={128}
        alt="icon"
      />
      <p>Web Developer / Software Engineer</p>
      <p>Nagano / Japan</p>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/articles">Articles</a></li>
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
