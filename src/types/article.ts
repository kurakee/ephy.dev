import type { Author } from "~/types/author";
import type { NewtImage } from "~/types/newt-image";
import type { NewtSys } from "~/types/newt-sys";
import type { Tag } from "~/types/tag";

export interface Article {
  _id: string;
  _sys: NewtSys;
  title: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage: NewtImage;
  };
  body: string;
  coverImage: NewtImage;
  author: Author;
  tags: Tag[];
}
