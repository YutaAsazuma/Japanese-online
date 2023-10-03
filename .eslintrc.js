module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true,
  },
  "settings": {
    "react": {
      "version": "detect",
    },
    "jest": {
      "version": 29,
    },
  },

  "extends": [
    "airbnb-base",
    "@salesforce/eslint-config-lwc/recommended",
    "plugin:react/recommended",
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  "plugins": ["react"],
  "overrides":
    {
      "files": [".eslintrc.{js,cjs}"],
      files: ['.eslintrc.{js,cjs}'],
      rules: {
        'quote-props': 'off',
        'quotes': 'off',
      // If you want any specific rules or configurations for these files, add them here
      },
    },
  "rules": {
    "no-alert": "off"
    // ... Add other rules here ...
  }
}
