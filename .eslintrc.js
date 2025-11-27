// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require("fs")

// module.exports = {
//   root: true,
//   extends: [
//     "next",
//     "prettier",
//     "react-app",
//     "react-app/jest",
//     "plugin:storybook/recommended",
//     "plugin:tailwindcss/recommended",
//   ],
//   parserOptions: {
//     babelOptions: {
//       presets: [require.resolve("next/babel")],
//     },
//   },
//   rules: {
//     "no-console": "off",
//     "tailwindcss/no-custom-classname": "off",
//     "testing-library/prefer-screen-queries": "off",
//     "@next/next/no-html-link-for-pages": "off",
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
//       {
//         argsIgnorePattern: "^_",
//         varsIgnorePattern: "^_",
//       },
//     ],
//     "sort-imports": [
//       "error",
//       {
//         ignoreCase: true,
//         ignoreDeclarationSort: true,
//       },
//     ],
//     "tailwindcss/classnames-order": "off",
//     "import/order": [
//       1,
//       {
//         groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
//         pathGroups: [
//           ...getDirectoriesToSort().map((singleDir) => ({
//             pattern: `${singleDir}/**`,
//             group: "internal",
//           })),
//           {
//             pattern: "env",
//             group: "internal",
//           },
//           {
//             pattern: "theme",
//             group: "internal",
//           },
//           {
//             pattern: "public/**",
//             group: "internal",
//             position: "after",
//           },
//         ],
//         pathGroupsExcludedImportTypes: ["internal"],
//         alphabetize: {
//           order: "asc",
//           caseInsensitive: true,
//         },
//       },
//     ],
//   },
// }

// function getDirectoriesToSort() {
//   const ignoredSortingDirectories = [".git", ".next", ".vscode", "node_modules"]
//   return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f))
// }

// function getDirectories(path) {
//   return fs.readdirSync(path).filter(function (file) {
//     return fs.statSync(path + "/" + file).isDirectory()
//   })
// }

module.exports = {
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    Engine: "readonly", // Define custom global objects
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  ignorePatterns: ["public/**/*", "storybook-static/**/*"], // Ignore both public and storybook-static directories
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Suppress "undefined variables"
    "no-undef": "off",
    // Suppress "unused variables"
    "@typescript-eslint/no-unused-vars": "off",
    // Suppress "Property does not exist" errors
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off", // For React (if needed)
  },
  overrides: [
    {
      files: ["*.js", "*.ts", "*.tsx"],
      rules: {
        // Atomics and other global issues
        "no-undef": "off",
        "no-unused-vars": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
}
