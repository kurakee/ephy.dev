import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <div class="max-w-8xl mx-auto px-4 lg:flex">
          <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
            <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Note</h1>
            <p class="text-md text-center text-gray-500">ちょっとした事や短めの記事など</p>
            <hr class="my-4 h-px border-0 bg-gray-300" />
            <ul>
              <li>list</li>
              <li>list</li>
              <li>list</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
});
