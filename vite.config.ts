import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",    // fe-ci.yml artifact path, fe-cd.yml S3 sync path 와 일치
    emptyOutDir: true, // 빌드 전 dist/ 초기화
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
