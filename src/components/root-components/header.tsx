import { component$ } from "@builder.io/qwik";
import { GoMarkGithub16 } from "@qwikest/icons/octicons";

export const Header = component$(() => {
  return (
    <>
      <header
        class="backdrop-blur bg-white/60 shadow-sm absolute top-0 left-0 right-0 z-50 py-4 md:fixed md:transition-all"
        id="header"
      >
        <div class="mx-auto max-w-8xl justify-between px-4 md:flex">
          <div class="flex items-center justify-between">
            <a href="/" title="ephy.dev" class="text-grey-900 font-bold">
              ephy.dev
            </a>
            <a href="#" id="toggleMenu" class="block md:hidden">
              ≡
            </a>
          </div>
          <nav
            class="fixed inset-x-0 bottom-0 top-14 hidden items-center gap-8 bg-white px-6 text-secondary-700 md:static md:flex md:bg-transparent md:p-0 h-screen md:h-auto"
            id="mobile-menu"
          >
            <ul class="mt-5 items-center gap-8 space-y-6 font-medium md:mt-0 md:flex md:space-y-0">
              <li>
                <a href="/blog" class="block text-grey-900 hover:text-blue-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/scrap" class="block text-grey-900 hover:text-blue-500">
                  Scrap
                </a>
              </li>
            </ul>
            <div class="hidden h-5 w-px bg-secondary-500/10 md:block"></div>
            <ul class="mt-6 items-center gap-5 space-y-6 font-medium md:mt-0 md:flex md:space-y-0">
              <li>
                <a
                  href="https://github.com/kurakee"
                  target="_blank"
                  class="block hover:text-blue-500"
                  aria-label="GitHub"
                >
                  <span class="blcok md:hidden">GitHub</span>
                  <GoMarkGithub16 />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
});
