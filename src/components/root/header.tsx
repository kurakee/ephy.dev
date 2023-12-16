import { $, component$, useStore, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { BsGithub, BsJournals, BsList, BsXLg } from "@qwikest/icons/bootstrap";

type HeaderStore = {
  visible: boolean;
  toggle: QRL<(this: HeaderStore) => void>;
  close: QRL<(this: HeaderStore) => void>;
};

export const Header = component$(() => {
  const headerState = useStore<HeaderStore>({
    visible: false,
    toggle: $(function (this: HeaderStore) {
      this.visible = !this.visible;
    }),
    close: $(function (this: HeaderStore) {
      this.visible = false;
    }),
  });

  return (
    <>
      <header
        class="absolute left-0 right-0 top-0 z-50 bg-white/60 py-4 shadow-sm backdrop-blur md:fixed md:transition-all"
        id="header"
      >
        <div class="max-w-8xl mx-auto justify-between px-4 md:flex">
          <div class="flex items-center justify-between">
            <Link
              onClick$={() => headerState.close()}
              prefetch
              href="/"
              title="ephy.dev"
              class="font-bold text-gray-700"
            >
              ephy.dev
            </Link>
            <button
              id="toggleMenu"
              class="block md:hidden"
              onClick$={() => headerState.toggle()}
              aria-label="モバイルヘッダーメニュー"
            >
              <BsList class={{ hidden: headerState.visible, "text-2xl": true }} />
              <BsXLg class={{ hidden: !headerState.visible, "text-2xl": true }} />
            </button>
          </div>
          <nav
            class={`${
              headerState.visible ? "" : "hidden "
            }fixed text-secondary-700 inset-x-0 bottom-0 top-14 h-screen items-center gap-8 bg-white px-6 md:static md:flex md:h-auto md:bg-transparent md:p-0`}
            id="mobile-menu"
          >
            <ul class="mt-5 items-center gap-8 space-y-6 font-medium md:mt-0 md:flex md:space-y-0">
              <li>
                <Link
                  onClick$={() => headerState.close()}
                  prefetch
                  href="/blog"
                  class="block text-lg text-gray-700 hover:text-blue-500"
                >
                  <p class="flex items-center gap-2">
                    <BsJournals />
                    <span>Blog</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  onClick$={() => headerState.close()}
                  href="https://github.com/kurakee"
                  target="_blank"
                  class="block text-lg text-gray-700 hover:text-blue-500"
                >
                  <p class="flex items-center gap-2">
                    <BsGithub />
                    <span>GitHub</span>
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
});
