import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "build/**",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
