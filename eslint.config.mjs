import next from "eslint-config-next"; // Configuración de Next.js
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin"; // Configuración de TypeScript

export default [
  // Configuración de ESLint para JavaScript/TypeScript
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Aplica a archivos JS/TS
    languageOptions: {
      ecmaVersion: 2020, // Soporta ES2020
      sourceType: "module", // Permite 'import/export'
      parser: "@typescript-eslint/parser", // Usa el parser de TypeScript
      parserOptions: {
        project: "./tsconfig.json", // Vincula ESLint con TypeScript
        ecmaFeatures: {
          jsx: true, // Habilita JSX
        },
      },
    },
    rules: {
      ...tsConfigs.recommended.rules, // Reglas recomendadas para TypeScript
      "@typescript-eslint/no-unused-vars": ["warn"], // Advertencias para variables no usadas
      "react/react-in-jsx-scope": "off", // No exige importar React en JSX
    },
    plugins: {
      "@typescript-eslint": tsConfigs.recommended, // Configuración del plugin de TypeScript
    },
  },
  // Configuración específica de Next.js
  ...next.overrides.map((config) => ({
    ...config,
    files: config.files || ["*.js", "*.jsx", "*.ts", "*.tsx"],
  })),
];
