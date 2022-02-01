import React, { useEffect, useState } from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel, useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import map from 'lodash/map';
import getCookie from './getCookie';

import { ADDON_ID, ADDON_PARAM_KEY } from './constants';

const StyledSelect = styled.select`
  align-self: center;
  border-color: white;
  border-radius: .25em;
  padding: .125em .5em;
`;

const Dropdown = () => {
  const id = getCookie('cssVariables');
  const addonParams: {
    files?: { [key:string]: any },
    theme?: string
  } = useParameter(ADDON_PARAM_KEY, {});
  const { theme } = addonParams;
  const [selected, setSelected] = useState(theme || id);

  const emit = useChannel({});

  useEffect(() => {
    setSelected(theme || id);
  }, [theme]);

  function handleChange(e: any) {
    setSelected(e.target.value);
    emit('cssVariablesChange', { id: e.target.value });
  }

  if (addonParams.files) {
    const { files } = addonParams;

    return (
      <StyledSelect onChange={handleChange} value={selected}>
        {map(files, (value, key) => (
          <option key={key}>{key}</option>
        ))}
      </StyledSelect>
    );
  }

  return null;
};

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'CSS Variables Theme',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => (<Dropdown />),
  });
});
