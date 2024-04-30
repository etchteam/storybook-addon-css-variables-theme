import cssVariablesTheme from '../dist';

import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../stories/assets/light.css';
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../stories/assets/dark.css';

const preview = {
  parameters: {
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
  },
  decorators: [cssVariablesTheme],
};

export default preview;
