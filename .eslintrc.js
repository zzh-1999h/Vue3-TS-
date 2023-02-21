module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    // "vue/singleline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    'vue/multiline-html-element-content-newline': 'off',
    'operator-linebreak': 'off'
  },
  globals: {
    defineProps: "readonly",
    defineOptions: "readonly",
  }
}
