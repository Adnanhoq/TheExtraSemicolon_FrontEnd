import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", 
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  {
    ignores: ["dist/", "node_modules/", "eslint.config.mjs", "test/", ".github/CODEOWNERS"]
  }
);