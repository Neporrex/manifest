import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const isReplit =
  process.env.NODE_ENV !== "production" && !!process.env.REPL_ID;

export default defineConfig({
  plugins: [
    react(),

    // Replit-only plugins (sync + safe)
    ...(isReplit
      ? [
          require("@replit/vite-plugin-runtime-error-modal").default(),
          require("@replit/vite-plugin-cartographer").cartographer(),
          require("@replit/vite-plugin-dev-banner").devBanner(),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
