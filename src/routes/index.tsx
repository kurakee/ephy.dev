import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BsGithub, BsJournals, BsSteam, BsSticky } from "@qwikest/icons/bootstrap";
import ProfileImage from "~/media/images/profile.png?jsx";

export default component$(() => {
  return (
    <>
      <div class="mx-auto h-screen max-w-md">
        <div class="flex h-1/2 items-center justify-center">
          <div class="text-center">
            <ProfileImage
              style={{ width: "128px", height: "128px" }}
              class="mx-auto my-4 rounded-full"
              alt="profile image"
            />
            <p class="text-4xl font-bold text-gray-900">kurake</p>
            <p class="my-2 text-sm text-gray-500">Web Developer / Software Engineer</p>
            <p class="my-2 text-sm text-gray-500">Computer Game Enthusiast</p>
            <hr class="my-4 h-px border-0 bg-gray-300" />
            <div class="my-4">
              <ul class="flex list-none items-center justify-center gap-4">
                <li>
                  <a href="/blog" class="font-medium text-blue-600">
                    <BsJournals />
                  </a>
                </li>
                <li>
                  <a href="/note" class="font-medium text-blue-600">
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
