import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import googleLint from "eslint-config-google";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      googleLint
    }
  },
  {
    ignores: ["dist/", "node_modules/"]
  }
];