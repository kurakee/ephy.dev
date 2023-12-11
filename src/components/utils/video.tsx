import { component$ } from "@builder.io/qwik";

/**
 * @param src 自動でwebm,mp4対応したいのでCloudflareR2のパス指定にする
 */
interface VideoProps {
  src: string;
  autoPlay?: boolean;
  playsInline?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const Video = component$<VideoProps>((props) => {
  return (
    <video
      autoPlay={props.autoPlay || true}
      playsInline={props.playsInline || true}
      loop={props.loop || true}
      muted={props.muted || true}
    >
      <source src={new URL("video.webm", props.src).href} type="video/webm" />
      <source src={new URL("video.mp4", props.src).href} type="video/mp4" />
    </video>
  );
});
