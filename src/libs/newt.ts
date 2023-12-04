import fetchAdapter from "konfig-axios-fetch-adapter";
import { createClient } from "newt-client-js";

export const generateClient = (spaceUid: string, token: string) => {
  return createClient({
    spaceUid,
    token,
    apiType: "cdn",
    adapter: fetchAdapter,
  });
};
