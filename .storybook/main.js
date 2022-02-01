module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "../register.js",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react"
}