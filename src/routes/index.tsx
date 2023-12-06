import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BsGithub, BsJournals, BsSteam, BsSticky } from "@qwikest/icons/bootstrap";

export default component$(() => {
  return (
    <>
      <div class="mx-auto max-w-md h-screen">
        <div class="h-1/2 flex items-center justify-center">
          <div class="text-center">
            <img
              class="mx-auto my-4 rounded-full"
              src="https://ephy.assets.newt.so/v1/f43f79d6-316e-4ba4-b9db-c40a6ed0bb0e/icon-2045450479.png?format=auto"
              height={128}
              width={128}
              alt="icon"
            />
            <p class="text-4xl font-bold text-gray-900">kurake</p>
            <p class="text-sm text-gray-500 my-2">Web Developer / Software Engineer</p>
            <hr class="my-4 h-px border-0 bg-gray-300" />
            <div class="my-4">
              <ul class="flex items-center justify-center gap-4 list-none">
                <li>
                  <a href="/blog" class="font-medium text-blue-600">
                    <BsJournals />
                  </a>
                </li>
                <li>
                  <a href="/scrap" class="font-medium text-blue-600">
                    <BsSticky />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/kurakee" target="_blank" class="font-medium text-blue-600">
                    <BsGithub />
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/id/internet-yamero"
                    target="_blank"
                    class="font-medium text-blue-600"
                  >
                    <BsSteam />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center"></div>
    </>
  );
});

export const head: DocumentHead = {
  title: "ephy.dev",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
