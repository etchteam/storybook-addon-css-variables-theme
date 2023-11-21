import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import * as HeaderStories from './Header.stories';
import Page from './Page';

export default {
  title: 'Example/Page',
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => {
  document.addEventListener(
    'storybookcssvariables:theme:change',
    (event: CustomEvent) => {
      console.info(`The theme changed to ${event?.detail?.theme}`);
    },
  );

  return <Page {...args} />;
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
