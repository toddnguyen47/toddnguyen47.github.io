// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Optional: Add custom rules or overrides here
    rules: {
      // Example: Warn about unused variables
      "@typescript-eslint/no-unused-vars": "warn",
      // Example: Disable a specific rule
      // 'no-console': 'off',
    },
  },
);
