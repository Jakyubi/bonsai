import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about.html"),
        product: resolve(import.meta.dirname, "product.html"),
        projects: resolve(import.meta.dirname, "projects.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
        plants: resolve(import.meta.dirname, "plants.html"),
        bonsai: resolve(import.meta.dirname, "bonsai.html"),
      },
    },
  },
});
