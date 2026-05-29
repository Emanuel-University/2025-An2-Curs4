import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.js"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      include: ["**/*.js"],
      exclude: [
        "**/*.test.js",
        "node_modules/**",
        "coverage/**",
        "vitest.config.js",
        "vitest.setup.js",
      ],
    },
  },
});
