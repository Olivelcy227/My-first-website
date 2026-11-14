import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/My-first-website/",
  server: {
    port: 5173,
  },
});
