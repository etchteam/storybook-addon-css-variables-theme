import { addons, makeDecorator } from '@storybook/preview-api';

import { ADDON_PARAM_KEY, CLEAR_LABEL } from './constants';
import { getCookie, handleStyleSwitch, transformFiles } from './helpers';

export default makeDecorator({
  name: 'CSS Variables Theme',
  parameterName: ADDON_PARAM_KEY,

  wrapper: (getStory, context, { parameters }) => {
    const { theme, defaultTheme } = parameters;
    const files = transformFiles(parameters.files);
    const globalsTheme = context.globals.cssVariables;
    const channel = addons.getChannel();
    const cookieId = getCookie('cssVariables');
    // eslint-disable-next-line max-len
    const savedTheme =
      cookieId &&
      (Object.hasOwnProperty.call(files, cookieId) || cookieId === CLEAR_LABEL)
        ? cookieId
        : null;

    const themeToLoad = globalsTheme || theme || savedTheme || defaultTheme;

    handleStyleSwitch({ id: themeToLoad, files, save: !theme || !savedTheme });
    channel.on('cssVariablesChange', ({ id }: { id: string }) => {
      handleStyleSwitch({ id, files, save: true });
    });

    return getStory(context);
  },
});
