import globals from "globals";
import pluginJs from "@eslint/js";
import js from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      ignores: [".config/*", ".env"],
    },
  },
];
