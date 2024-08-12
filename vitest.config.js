import { defineConfig } from "vitest/config";
// it should be on the top 
import { configDefaults } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue";
// remember we had to import vue without {} . find why 
import jsdom from "jsdom";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    // it allows  you to use the describe , expect and  it anywhere
    // setupFiles: "./setupTests.ts",
    // when you need to use beforeall and after all
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx,vue}"],
    exclude: [
      ...configDefaults.exclude,
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.git/**",
      "**/.vscode/**",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: "/src/components",
      views: "/src/views",
    },
  },
});
