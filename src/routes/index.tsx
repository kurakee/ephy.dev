import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BsGithub, BsJournals, BsSteam, BsSticky } from "@qwikest/icons/bootstrap";
import { Image } from "@unpic/qwik";

export default component$(() => {
  return (
    <>
      <div class="mx-auto h-screen max-w-md">
        <div class="flex h-1/2 items-center justify-center">
          <div class="text-center">
            <Image
              width={128}
              height={128}
              class="mx-auto my-4 rounded-full"
              src="https://storage.ephy.dev/icons/ephy/image.webp"
            />
            <p class="text-5xl font-bold text-gray-900">kurake</p>
            <p class="my-2 text-lg text-gray-500">Web Developer / Software Engineer</p>
            <p class="my-2 text-lg text-gray-500">Computer Game Enthusiast</p>
            <hr class="my-4 h-px border-0 bg-gray-300" />
            <div class="my-4">
              <ul class="flex list-none items-center justify-center gap-8">
                <li>
                  <a href="/blog" class="font-medium text-blue-600 text-2xl">
                    <BsJournals />
                  </a>
                </li>
                <li>
                  <a href="/blog/note" class="font-medium text-blue-600 text-2xl">
                    <BsSticky />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/kurakee" target="_blank" class="font-medium text-blue-600 text-2xl">
                    <BsGithub />
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/id/internet-yamero"
                    target="_blank"
                    class="font-medium text-blue-600 text-2xl"
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
