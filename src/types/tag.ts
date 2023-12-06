import type { NewtSys } from "~/types/newt-sys";

export interface Tag {
  _id: string;
  _sys: NewtSys;
  name: string;
  slug: string;
}
