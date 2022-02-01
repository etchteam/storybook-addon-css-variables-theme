# Storybook Addon CSS Variables Theme

Storybook CSS Variables Theme can be used to switch out CSS files in [Storybook](https://storybook.js.org).

![React Storybook Screenshot](https://raw.githubusercontent.com/etchteam/storybook-addon-css-variables-theme/master/screenshot.gif)

## Installation

```sh
npm install @etchteam/storybook-addon-css-variables-theme --save-dev
```

## Configuration

### Step 1: Add the addon

Create a file called `main.js` in your `.storybook` folder.

Add the following code to it:

```js
module.exports = {
  addons: ['@etchteam/storybook-addon-css-variables-theme'],
};
```

### Step 2: Include your CSS files

Create a file called `preview.js` in your `.storybook` folder.

In this file you will need to import your style files using a loader. Here's an example of how to do this:

```js
import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/light.css'
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/dark.css'
```

This code calls `style-loader` with `?injectType=lazyStyleTag` so that it doesn't run the CSS immediately.

You can swap out `css-loader` for your preferred SCSS/Less/etc loaders.

### Step 3: Add the Decorator

In the same `preview.js` file import the decorator from the CSS Variables Theme addon

```js
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

export const decorators = [
  cssVariablesTheme,
];
```

Then pass the CSS files to the addon via the exported parameters.

```js
export const parameters = {
  cssVariables: {
    files: {
      light,
      dark,
    }
  }
}
```

## Set a specific theme for a story

Pass the theme key as the `theme` parameter on the story to default to a specific theme:

```js
export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    cssVariables: {
      theme: 'dark'
    }
  }
};
```

Made with ☕ at [Etch](https://etch.co)

