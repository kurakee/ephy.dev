import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { createClient } from "microcms-js-sdk";

export const CMS_ENDPOINTS = {
  Blog: "blog",
  Writer: "writer",
  Tag: "tag",
} as const;

/**
 * MicroCMSのクライアントを取得
 */
export const getClient = (env: EnvGetter) => {
  return createClient({
    serviceDomain: env.get("MICRO_CMS_SERVICE_DOMAIN") || "",
    apiKey: env.get("MICRO_CMS_API_KEY") || "",
  });
};
