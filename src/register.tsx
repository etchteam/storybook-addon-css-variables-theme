import React, { useEffect, useState } from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel, useParameter } from '@storybook/api';
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from '@storybook/components';
import getCookie from './getCookie';
import { ADDON_ID, ADDON_PARAM_KEY, CLEAR_LABEL } from './constants';

type Files = {
  [key: string]: any
};

type Params = {
  files?: Files,
  theme?: string,
  defaultTheme?: string
};

const Dropdown = () => {
  const id = getCookie('cssVariables');
  const addonParams: Params = useParameter(ADDON_PARAM_KEY, {});
  const { theme, defaultTheme, files } = addonParams;
  const [selected, setSelected] = useState(theme || id);

  const emit = useChannel({});

  useEffect(() => {
    setSelected(theme || id || defaultTheme);
  }, [theme, defaultTheme]);

  function handleChange(onHide: () => void, value: string | null) {
    setSelected(value.indexOf(CLEAR_LABEL) > -1 ? null : value);
    emit('cssVariablesChange', { id: value });
    onHide();
  }

  function toLink(value: string, active: boolean, onHide: () => void) {
    return {
      id: value,
      title: !value ? CLEAR_LABEL : value,
      onClick: () => handleChange(onHide, value),
      active,
    };
  }
  function generateLinks(items: Files, onHide: () => void) {
    // eslint-disable-next-line max-len
    const result: any[] = Object.keys(items).map((value) => toLink(value, value === selected, onHide));
    if (selected) {
      result.unshift(toLink(CLEAR_LABEL, false, onHide));
    }
    return result;
  }
  if (files) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList
            links={generateLinks(files, onHide)}
          />
        )}
        closeOnClick
      >
        <IconButton key="css themes" title="CSS custom properties themes">
          <Icons icon="paintbrush" />
        </IconButton>
      </WithTooltip>
    );
  }
  return null;
};

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'CSS Variables Theme',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Dropdown />,
  });
});
