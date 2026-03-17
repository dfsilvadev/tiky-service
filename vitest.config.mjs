import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/*.config.js",
        "**/*.d.ts",
        "src/server.ts",
        "src/infrastructure/logger/**.ts",
        "src/application/dtos/**/*.ts",
        "src/domain/**/**/*.ts",
        "src/generated",
        "src/shared/utils/http-error-mapper.ts"
      ],
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"]
    },
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/application/use-cases/**/*.{test,spec}.{ts,js}"],
          environment: "node"
        }
      },
      {
        test: {
          name: "e2e",
          include: [
            "src/presentation/http/controllers/**/*.{test,spec}.{ts,js}"
          ],
          environment: "node",
          setupFiles: [
            "prisma/vitest-environment-prisma/prisma-test-environment.ts"
          ],
          sequence: {
            concurrent: false
          }
        }
      }
    ]
  }
});
