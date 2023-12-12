import { component$ } from "@builder.io/qwik";
import { Picture } from "~/components/utils/picture";

/**
 * @param width default: 680px
 * @param height default: 360px
 */
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const FigImage = component$<ImageProps>((props) => {
  const src = props.src;

  if (!src) return <></>;

  return (
    <figure>
      <Picture alt={props.alt} src={props.src} width={props.width || 700} height={props.height || 400} />
      {props.alt && <figcaption>{props.alt}</figcaption>}
    </figure>
  );
});
