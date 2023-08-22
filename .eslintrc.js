module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "airbnb-base",
    "extends": ["@salesforce/eslint-config-lwc/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
              "sourceType": "module",
              "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
}
module.exports = {
  // ... Other ESLint configurations ...
  rules: {
    "no-alert": "off",
    // ... Other rules ...
  },
};
