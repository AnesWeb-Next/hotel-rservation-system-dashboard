import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The copied Book Store application is retained only as a migration reference.
    // New Hotel Dashboard code lives in src/app and is checked normally.
    "src/components/**",
    "src/contexts/**",
    "src/features/**",
    "src/hooks/**",
    "src/layouts/**",
    "src/pages/**",
    "src/providers/**",
    "src/api/**",
    "src/legacy/**",
    "src/lib/**",
    "src/utils/**",
    "src/validation/**",
    "src/types/**",
  ]),
]);

export default eslintConfig;
