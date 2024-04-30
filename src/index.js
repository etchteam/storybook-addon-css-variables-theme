import { addons, makeDecorator } from '@storybook/preview-api';

import { ADDON_ID, CLEAR_LABEL, EVENT_NAME } from './constants';
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
    setCookie(ADDON_ID, id, 10);
  }

  const customEvent = new CustomEvent(EVENT_NAME, { detail: { theme: id } });
  document?.dispatchEvent(customEvent);
}

export default makeDecorator({
  name: 'CSS Variables Theme',
  parameterName: ADDON_ID,
  wrapper: (getStory, context, { parameters }) => {
    const { files, theme, defaultTheme } = parameters;
    const globalsTheme = context.globals[ADDON_ID];
    const channel = addons.getChannel();
    const cookieId = getCookie(ADDON_ID);
    const hasSavedTheme =
      Object.hasOwn(files, cookieId) || cookieId === CLEAR_LABEL;
    const savedTheme = hasSavedTheme ? cookieId : null;
    const themeToLoad = globalsTheme || theme || savedTheme || defaultTheme;

    context.globals[ADDON_ID] = themeToLoad;

    handleStyleSwitch({
      id: themeToLoad,
      files,
      save: !theme || !savedTheme,
    });

    channel.on(`${ADDON_ID}Change`, ({ id }) =>
      handleStyleSwitch({ id, files, save: true }),
    );

    return getStory(context);
  },
});
