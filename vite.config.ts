import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),

    // Replit-only plugins (DEV ONLY, NEVER on Vercel)
    !isProd &&
      process.env.REPL_ID &&
      (await import("@replit/vite-plugin-runtime-error-modal")).default(),

    !isProd &&
      process.env.REPL_ID &&
      (await import("@replit/vite-plugin-cartographer")).then((m) =>
        m.cartographer(),
      ),

    !isProd &&
      process.env.REPL_ID &&
      (await import("@replit/vite-plugin-dev-banner")).then((m) =>
        m.devBanner(),
      ),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  root: ".",

  build: {
    outDir: "dist",          // ✅ REQUIRED for Vercel
    emptyOutDir: true
  },

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
