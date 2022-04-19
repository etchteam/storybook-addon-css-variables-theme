import cssVariablesTheme from '../src';

import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../stories/assets/light.css';
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../stories/assets/dark.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssVariables: {
    files: {
      'Light Theme': light,
      'Dark Theme': dark,
    },
  }
};

export const decorators = [
  cssVariablesTheme,
];
