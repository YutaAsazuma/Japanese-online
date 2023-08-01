module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
  ];

  const plugins = [
    'babel-plugin-macros',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-destructuring',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true
      }
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-private-property-in-object',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
        corejs: false
      }
    ],
    [
      '@babel/plugin-transform-regenerator',
      {
        async: false
      }
    ],
    'babel-plugin-transform-react-remove-prop-types',
    '@babel/plugin-syntax-jsx'
  ];

  return {
    presets,
    plugins
  }
}
