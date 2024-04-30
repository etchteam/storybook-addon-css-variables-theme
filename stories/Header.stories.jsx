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
};

const Template = (args, context) => (
  <Header {...args}>
    The current theme is: {context.globals.cssVariables ?? 'No theme'}
  </Header>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
