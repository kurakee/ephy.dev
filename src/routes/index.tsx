import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { BsGithub, BsJournals, BsSteam } from "@qwikest/icons/bootstrap";
import { Picture } from "~/components/utils/picture";

export default component$(() => {
  return (
    <>
      <div class="mx-auto h-screen max-w-md pt-16">
        <div class="flex h-1/2 items-center justify-center">
          <div class="text-center">
            <Picture
              class="mx-auto my-4 rounded-full"
              width={128}
              height={128}
              src="https://storage.ephy.dev/icon-ephy.webp"
              alt="ephy icon"
              loading="eager"
            />
            <p class="text-5xl font-bold text-gray-900">kurake</p>
            <p class="my-2 text-lg text-gray-500">Web Developer / Software Engineer</p>
            <p class="my-2 text-lg text-gray-500">Computer Game Enthusiast</p>
            <hr class="my-4 h-px border-0 bg-gray-300" />
            <div class="my-4">
              <ul class="flex list-none items-center justify-center gap-8">
                <li>
                  <a href="/blog" class="font-medium text-blue-600 text-2xl" aria-label="ブログ">
                    <BsJournals />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/kurakee"
                    target="_blank"
                    class="font-medium text-blue-600 text-2xl"
                    aria-label="Github"
                  >
                    <BsGithub />
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/id/internet-yamero"
                    target="_blank"
                    class="font-medium text-blue-600 text-2xl"
                    aria-label="Steam Profile"
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
      content: "kurakeによる個人のウェブサイトです。",
    },
    // open graph
    {
      property: "og:title",
      content: "ephy.dev",
    },
    {
      property: "og:description",
      content: "kurakeによる個人のウェブサイトです。",
    },
    {
      property: "og:image",
      content: "https://storage.ephy.dev/default-cover.webp",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "ephy.dev",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: `https://ephy.dev`,
    },
  ],
};
