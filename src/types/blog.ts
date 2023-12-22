import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";
import type { Tag } from "./tag";

export type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  tags: Tag[];
} & MicroCMSDate;
