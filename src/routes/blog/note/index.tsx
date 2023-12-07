import { component$ } from "@builder.io/qwik";
import { formatDate } from "~/libs/utils";

export default component$(() => {
  const notes = ["", "", ""];
  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Note</h1>
      <p class="text-md text-center text-gray-500">ちょっとした事や短めの記事など</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      <div class="mx-auto max-w-lg">
        <ul class="space-y-4">
          {notes.map((v) => {
            return (
              <li key={v} class="flex gap-4">
                <div class="flex-1">
                  <p class="mb-2 border-b pb-1 text-lg font-medium text-gray-900">
                    〇〇を読んだ<time class="mb-1 ml-2 text-sm text-gray-500">{formatDate(new Date().toString())}</time>
                  </p>
                  <p class="text-gray-700">
                    感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。感想を書く。
                  </p>
                </div>
                <img
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  class="h-20 w-20 rounded-lg object-cover"
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
});
