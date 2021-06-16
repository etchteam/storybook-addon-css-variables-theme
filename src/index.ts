import addons, { makeDecorator } from '@storybook/addons';
import getCookie from './getCookie';

import { ADDON_PARAM_KEY } from './constants';

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
}

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function handleStyleSwitch({ id, files }: { id: string, files: { [key:string]: any } }) {
  addBrandStyles(id, files);
  setCookie('cssVariables', id, 10);
}

export default makeDecorator({
  name: 'CSS Variables Theme',
  parameterName: ADDON_PARAM_KEY,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    const cookieId = getCookie('cssVariables');
    const { files } = parameters;

    handleStyleSwitch({ id: cookieId, files });

    channel.on('cssVariablesChange', ({ id }: { id: string }) => handleStyleSwitch({ id, files }));

    return getStory(context);
  },
});
