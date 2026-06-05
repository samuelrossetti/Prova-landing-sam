import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isVercel = !!process.env.VERCEL;
const isDev = process.env.NODE_ENV !== "production" && !isVercel;

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH ?? "/";

if (isDev && !rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const devPlugins = isDev && process.env.REPL_ID
  ? [
      await import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
      await import("@replit/vite-plugin-cartographer").then((m) =>
        m.cartographer({ root: path.resolve(import.meta.dirname, "..") })
      ),
      await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
    ]
  : [];

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), ...devPlugins],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: import.meta.dirname,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
