import { component$ } from "@builder.io/qwik";
import { Image as Unpic } from "@unpic/qwik";

interface BodyTitleProps {
  title: string;
  description: string;
  thumbnailSrc: string;
}

export const BodyTitle = component$<BodyTitleProps>((props) => {
  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">{props.title}</h1>
      <p class="text-md text-center text-gray-500">{props.description}</p>
      <Unpic width={300} src={props.thumbnailSrc} />
      <hr class="my-4 h-px border-0 bg-gray-300" />
    </>
  );
});
