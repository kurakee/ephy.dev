import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="max-w-8xl mx-auto px-4 lg:flex">
      <div class="mx-auto mt-4 max-w-4xl flex-1 lg:mt-0 lg:px-6">
        <Slot />
      </div>
    </div>
  );
});
