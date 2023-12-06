import type { NewtSys } from "~/types/newt-sys";
import type { NewtImage } from "~/types/newt-image";

export interface Author {
  _id: string;
  _sys: NewtSys;
  fullName: string;
  slug: string;
  biography: string;
  profileImage: NewtImage;
}
