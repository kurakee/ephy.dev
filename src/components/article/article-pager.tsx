import { component$ } from "@builder.io/qwik";

import { BsChevronLeft, BsChevronRight } from "@qwikest/icons/bootstrap";
import type { Pager } from "~/types/pager";

interface PagerProps {
  pager: Pager;
}

export const ArticlePager = component$<PagerProps>((props) => {
  const pager = props.pager;
  const prevQuery = new URLSearchParams({ page: Math.max(1, pager.page - 1).toString() }).toString();
  const nextQuery = new URLSearchParams({ page: Math.max(1, pager.page + 1).toString() }).toString();

  return (
    <div class="flex justify-center">
      <nav aria-label="Pagination">
        <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
          {pager.page > 1 && (
            <li>
              <a
                href={`/blog?${prevQuery}`}
                class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50"
              >
                <BsChevronLeft />
                <span>Previous</span>
              </a>
            </li>
          )}
          <li>
            <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">
              Page <b class="mx-1">{pager.page}</b> of <b class="ml-1">{pager.pageCount}</b>
            </span>
          </li>
          {pager.page < pager.pageCount && (
            <li>
              <a
                href={`/blog?${nextQuery}`}
                class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Next</span>
                <BsChevronRight />
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
});
