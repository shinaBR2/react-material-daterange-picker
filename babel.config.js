module.exports = {
  presets: [
    "@babel/react",
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [">0.25%"]
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ],
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {
          "modules": "commonjs"
        }]
      ]
    }
  }
};