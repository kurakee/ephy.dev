import { component$ } from "@builder.io/qwik";
import { Image as Unpic } from "@unpic/qwik";

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export const FigImage = component$<ImageProps>((props) => {
  return (
    <figure>
      <Unpic src={props.src} width={props.width || 680} height={props.width} alt={props.alt} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  );
});
