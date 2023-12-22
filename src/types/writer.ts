import type { MicroCMSDate } from "microcms-js-sdk";

export type Writer = {
  id: string;
  name: string;
  profile: string;
} & MicroCMSDate;
