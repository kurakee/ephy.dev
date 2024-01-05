import { partytownVite } from "@builder.io/partytown/utils";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { join } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        trailingSlash: false,
      }),
      qwikVite(),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
    ],
    dev: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
