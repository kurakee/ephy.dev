import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { generateClient } from "~/libs/newt";
import { formatDate } from "~/libs/utils";
import type { Note } from "~/types/note";

export const useNotes = routeLoader$(async ({ env }) => {
  const spaceUid = env.get("NEWT_SPACE_UID") || "";
  const token = env.get("NEWT_CDN_API_TOKEN") || "";
  const client = generateClient(spaceUid, token);

  const { items: notes } = await client.getContents<Note>({
    appUid: "blog",
    modelUid: "note",
    query: {
      select: ["_id", "_sys", "slug", "title", "body", "image"],
    },
  });

  return notes;
});

export default component$(() => {
  const notes = useNotes();
  return (
    <>
      <h1 class="my-2 text-center text-3xl font-bold text-gray-900">Note</h1>
      <p class="text-md text-center text-gray-500">ちょっとした事や短めの記事など</p>
      <hr class="my-4 h-px border-0 bg-gray-300" />
      <div class="mx-auto max-w-lg">
        <ul class="space-y-4">
          {notes.value.map((note) => {
            return (
              <li key={note._id} class="flex gap-4">
                <div class="flex-1">
                  <p class="mb-2 border-b pb-1 text-lg font-medium text-gray-900">
                    {note.title}
                    <time class="mb-1 ml-2 text-sm text-gray-500">{formatDate(note._sys.createdAt)}</time>
                  </p>
                  <div class="text-sm text-gray-700">
                    <p dangerouslySetInnerHTML={note.body} />
                  </div>
                </div>
                <picture>
                  <source
                    srcSet={note.image.src + "?format=webp&width=200&download=" + note.image.fileName}
                    type="image/webp"
                  />
                  <img
                    src={note.image.src + "?format=jpg&width=200&download=" + note.image.fileName}
                    class="h-24 w-24 rounded-lg object-cover"
                    alt={note.image.altText}
                    height={200}
                    width={200}
                  />
                </picture>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Note一覧",
  meta: [
    {
      name: "description",
      content: "Note一覧です。",
    },
  ],
};
