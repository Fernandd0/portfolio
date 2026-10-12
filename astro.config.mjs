import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://fernandojs.com",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/thanks"),
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
