import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
      },
    },
  },
];
