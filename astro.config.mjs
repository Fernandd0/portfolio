import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
