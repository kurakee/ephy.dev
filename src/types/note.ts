import type { NewtImage } from "~/types/newt-image";
import type { NewtSys } from "~/types/newt-sys";

export interface Note {
  _id: string;
  _sys: NewtSys;
  title: string;
  slug: string;
  body: string;
  image: NewtImage;
}
