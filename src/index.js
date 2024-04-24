import { addons, makeDecorator } from '@storybook/preview-api';

import { ADDON_PARAM_KEY, CLEAR_LABEL, EVENT_NAME } from './constants';
import { getCookie, setCookie } from './cookie';

let currentCSS = null;

async function addBrandStyles(id, files) {
  const file = files[id];

  if (file) {
    file.use();

    // If we've got a CSS file in use, turn it off
    if (currentCSS) {
      currentCSS.unuse();
    }

    currentCSS = file;
  }

  if (currentCSS && id === CLEAR_LABEL) {
    currentCSS.unuse();
    currentCSS = null;
  }
}

function handleStyleSwitch({ id, files, save }) {
  addBrandStyles(id, files);

  if (save) {
    setCookie('cssVariables', id, 10);
  }

  const customEvent = new CustomEvent(EVENT_NAME, { detail: { theme: id } });
  document?.dispatchEvent(customEvent);
}

export default makeDecorator({
  name: 'CSS Variables Theme',
  parameterName: ADDON_PARAM_KEY,
  wrapper: (getStory, context, { parameters }) => {
    const { files, theme, defaultTheme } = parameters;
    const channel = addons.getChannel();
    const cookieId = getCookie('cssVariables');
    const hasSavedTheme =
      Object.hasOwn(files, cookieId) || cookieId === CLEAR_LABEL;
    const savedTheme = hasSavedTheme ? cookieId : null;
    const themeToLoad = theme || savedTheme || defaultTheme;

    handleStyleSwitch({
      id: themeToLoad,
      files,
      save: !theme || !savedTheme,
    });

    channel.on('cssVariablesChange', ({ id }) =>
      handleStyleSwitch({ id, files, save: true }),
    );

    return getStory(context);
  },
});
