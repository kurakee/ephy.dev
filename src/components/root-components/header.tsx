import { component$, useSignal } from "@builder.io/qwik";
import { BsGithub, BsJournals, BsList, BsSticky, BsXLg } from "@qwikest/icons/bootstrap";

export const Header = component$(() => {
  const isMobileHeaderVisible = useSignal(false);
  return (
    <>
      <header
        class="backdrop-blur bg-white/60 shadow-sm absolute top-0 left-0 right-0 z-50 py-4 md:fixed md:transition-all"
        id="header"
      >
        <div class="mx-auto max-w-8xl justify-between px-4 md:flex">
          <div class="flex items-center justify-between">
            <a href="/" title="ephy.dev" class="text-gray-700 font-bold">
              ephy.dev
            </a>
            <button
              id="toggleMenu"
              class="block md:hidden"
              onClick$={() => (isMobileHeaderVisible.value = !isMobileHeaderVisible.value)}
            >
              <BsList class={{ hidden: isMobileHeaderVisible.value }} />
              <BsXLg class={{ hidden: !isMobileHeaderVisible.value }} />
            </button>
          </div>
          <nav
            class={`${
              isMobileHeaderVisible.value ? "" : "hidden "
            }fixed inset-x-0 bottom-0 top-14 items-center gap-8 bg-white px-6 text-secondary-700 md:static md:flex md:bg-transparent md:p-0 h-screen md:h-auto`}
            id="mobile-menu"
          >
            <ul class="mt-5 items-center gap-8 space-y-6 font-medium md:mt-0 md:flex md:space-y-0">
              <li>
                <a href="/blog" class="block text-gray-700 hover:text-blue-500">
                  <p class="flex items-center gap-2">
                    <BsJournals />
                    <span>Blog</span>
                  </p>
                </a>
              </li>
              <li>
                <a href="/scrap" class="block text-gray-700 hover:text-blue-500">
                  <p class="flex items-center gap-2">
                    <BsSticky />
                    <span>Scrap</span>
                  </p>
                </a>
              </li>
              <li>
                <a href="https://github.com/kurakee" target="_blank" class="block text-gray-700 hover:text-blue-500">
                  <p class="flex items-center gap-2">
                    <BsGithub />
                    <span>GitHub</span>
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
});
