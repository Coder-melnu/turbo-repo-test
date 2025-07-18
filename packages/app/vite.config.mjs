// /// <reference types="vitest" />
// import { defineConfig } from "vitest/config";

// export default defineConfig({
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "./vitest.setup.ts",
//     include: ["src/**/*.{test,spec}.{ts,tsx}"],
//   },
// });

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";

export default defineProject({
  plugins: [react(), tsconfigPaths()],
  test: { environment: "jsdom" },
});
