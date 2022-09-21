module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        shippedProposals: true,
        useBuiltIns: "usage",
        corejs: "3",
        targets: { node: "14" },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
