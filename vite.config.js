import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// The "test" part is for Vitest. jsdom pretends to be a browser so I can test components.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",

    // My laptop is slow to start the test workers (the project is inside OneDrive),
    // so I run one test file at a time instead of all of them together.
    fileParallelism: false,
    maxWorkers: 1,

    // give slow tests more time before they count as failed
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
