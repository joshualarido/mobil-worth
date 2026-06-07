import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "404.html",
      "index.html",
      "*.txt",
      "_next/**",
      "_not-found/**",
      "_not-found.html",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
