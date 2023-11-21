import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Header from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    cssVariables: {
      theme: 'Dark Theme',
    },
    docs: {
      description: {
        component: 'This story defaults to the dark theme',
      },
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
