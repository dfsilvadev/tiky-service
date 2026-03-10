import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/generated/**",
      "build/**",
      "coverage/**",
      "*.config.js"
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { prettier: prettierPlugin },
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,

      "no-console": "error",
      "no-unused-vars": [
        "error",
        { args: "after-used", argsIgnorePattern: "^_" }
      ],
      "prettier/prettier": "warn"
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  prettierConfig
]);
