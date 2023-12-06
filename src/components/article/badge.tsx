import { component$ } from "@builder.io/qwik";

interface BadgeProps {
  badgeName: string;
}

export const Badge = component$<BadgeProps>((props) => {
  return (
    <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
      {props.badgeName}
    </span>
  );
});
