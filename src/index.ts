import { addons, makeDecorator } from '@storybook/addons';
import queryString from 'query-string';
import getCookie from './getCookie';

import { ADDON_PARAM_KEY, CLEAR_LABEL, EVENT_NAME } from './constants';

let currentCSS: any = null;

async function addBrandStyles(id: string, files: { [key:string]: any }) {
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

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function handleStyleSwitch({
  id,
  files,
  save,
}: {
  id: string,
  files: { [key:string]: any },
  save: boolean
}) {
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
    // eslint-disable-next-line max-len
    const savedTheme = cookieId && (Object.hasOwnProperty.call(files, cookieId) || cookieId === CLEAR_LABEL) ? cookieId : null;
    const parsed = queryString.parse(window.location.search);
    let urlTheme: string | undefined;
    if (parsed.theme) {
      if (!Array.isArray(parsed.theme)) {
        const parts = parsed.theme.split('--');
        urlTheme = `${parts[0]} ${parts[1]}`;
      }
    }
    const themeToLoad = urlTheme || theme || savedTheme || defaultTheme;
    handleStyleSwitch({ id: themeToLoad, files, save: !theme || !savedTheme });
    channel.on('cssVariablesChange', ({ id }: { id: string }) => handleStyleSwitch({ id, files, save: true }));

    return getStory(context);
  },
});
