import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <div class="max-w-8xl mx-auto px-4 lg:flex">
          <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
            <h1 class="my-4 border-b py-4 text-center text-4xl font-bold text-gray-900">Note Title</h1>
          </div>
        </div>
      </main>
    </>
  );
});
