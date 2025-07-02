import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    rules: {
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "unknown",
            "type",
            ["parent", "index", "sibling", "object"],
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "server-only",
              group: "builtin",
              position:"before",
            },
            {
              pattern: "client-only",
              group: "builtin",
              position:"before",
            },
          ],
          pathGroupsExcludedImportTypes: ["server-only","client-only"],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
            caseInsensitive: true,
          },

          warnOnUnassignedImports: true,
        },
      ],
    },
  },
];
