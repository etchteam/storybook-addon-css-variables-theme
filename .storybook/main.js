module.exports = {
  "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "../manager.js",
    "@storybook/addon-essentials",
    "@storybook/addon-webpack5-compiler-babel"
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};
