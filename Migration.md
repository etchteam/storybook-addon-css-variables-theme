# Migration guide

First, uninstall the current addon and install the [official one](https://storybook.js.org/addons/@storybook/addon-themes).

```sh
npm uninstall @etchteam/storybook-addon-css-variables-theme
npm install -D @storybook/addon-themes
```

Update the addons list in Storybook config in `.storybook/main.ts`

```ts
-  addons: ['@etchteam/storybook-addon-css-variables-theme'],
+  addons: ['@storybook/addon-themes'],
```

Replace the `cssVariablesTheme` with your own custom decorator, you can create it in a separate file, for example `.storybook/cssVariablesTheme.decorator.tsx`:

```ts
import { DecoratorHelpers } from '@storybook/addon-themes';
import { DecoratorFunction } from 'storybook/internal/types';

import lightCssLoader from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/light.css'
import darkCssLoader from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/styles/dark.css'

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

type StyleLoaderModule = {
  use: () => void;
  unuse: () => void;
};
let currentCss: StyleLoaderModule | undefined;

// The keys will be displayed in the Storybook UI, the themes addon will add a suffix with "Theme" automatically
export const CSSVariablesThemes = {
    Light: lightCssLoader,
    Dark: darkCssLoader,
}
const defaultTheme = 'Light';

const cssVariablesTheme: DecoratorFunction = (storyFn, context) => {
  initializeThemeState(Object.keys(CSSVariablesThemes), defaultTheme);
  const themeFromContext = (pluckThemeFromContext(context) as keyof typeof CSSVariablesThemes) || defaultTheme;
  const themeCssLoader = CSSVariablesThemes[themeFromContext];

  themeCssLoader.use();
  if (currentCss) {
    currentCss.unuse();
  }
  currentCss = themeCssLoader;

  return storyFn();
};

export default cssVariablesTheme;
```

Replace the decorator and remove the `cssVariables` parameters in your Storybook preview config in `.storybook/preview.tsx`:

```ts
- import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
+ import cssVariablesTheme from './cssVariablesTheme.decorator';

export const decorators = [
  cssVariablesTheme,
];

export const parameters = {
-  cssVariables: {
-    files: {
-      'Light Theme': light,
-      'Dark Theme': dark,
-    }
-  }
}
```

Update the stories that have specific themes applied to them, for example:

```ts
export default {
  title: 'Example/Header',
  component: Header,
-  parameters: {
-    cssVariables: {
-      theme: 'dark'
-    }
-  }
+  globals: {
+    theme: 'Dark', // Use the key from CSSVariablesThemes
+  },
};
```

There are a couple of ways to get the currently enabled theme within stories:

1. Context globals

```ts
const Template: ComponentStory<typeof Button> = (args, context) => (
  <Button {...args}>{context.globals.theme ?? 'No theme'}</Button>
);
```

2. `pluckThemeFromContext`

```ts
import { DecoratorHelpers } from "@storybook/addon-themes";

const Template: ComponentStory<typeof Button> = (args, context) => (
  <Button {...args}>{DecoratorHelpers.pluckThemeFromContext(context) ?? 'No theme'}</Button>
);
```

3. Event handling/cookies

If you previously watched the custom `storybookcssvariables:theme:change` event on the `document`, this could be recreated in the decorator.

4. Query parameters

The theme is also available to get/set through query parameters: `&globals=themes:my+theme`
