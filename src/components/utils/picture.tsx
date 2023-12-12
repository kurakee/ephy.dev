import { component$ } from "@builder.io/qwik";
import { Image as Unpic } from "@unpic/qwik";

/**
 * @param width default: 680px
 * @param height default: 360px
 */
interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: string;
}

export const Picture = component$<PictureProps>((props) => {
  const src = props.src;

  if (!src) return <></>;

  return (
    <picture>
      <source
        srcSet={new URL("image.webp", src).href}
        class={props.class}
        width={props.width || 680}
        height={props.height || 360}
        type="image/webp"
      />
      <Unpic
        loading={props.loading}
        src={new URL("image.png", src).href}
        class={props.class}
        width={props.width || 680}
        height={props.height || 360}
        alt={props.alt}
      />
    </picture>
  );
});
