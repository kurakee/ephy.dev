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
  return (
    <picture>
      <source
        srcSet={`${props.src}?fm=webp`}
        class={props.class}
        width={props.width || 680}
        height={props.height || 360}
        type="image/webp"
      />
      <Unpic
        loading={props.loading}
        src={`${props.src}?fm=png`}
        class={props.class}
        width={props.width || 680}
        height={props.height || 360}
        alt={props.alt}
      />
    </picture>
  );
});
