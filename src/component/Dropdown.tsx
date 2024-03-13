import { WithTooltip, TooltipLinkList } from '@storybook/components';
import { PaintBrushIcon } from '@storybook/icons';
import { useChannel, useParameter, useGlobals } from '@storybook/manager-api';
import React, { useEffect, useCallback } from 'react';

import { ADDON_PARAM_KEY, CLEAR_LABEL } from '../constants';
import { getCookie } from '../helpers';
import { Files, Params } from '../types';

import ActiveViewportLabel from './ActiveViewportLabel';
import IconButtonWithLabel from './IconButtonWithLabel';

const Dropdown = () => {
  const [globals, updateGlobals] = useGlobals();
  const cookieTheme = getCookie('cssVariables');
  const addonParams: Params = useParameter(ADDON_PARAM_KEY, {});
  const { theme, defaultTheme, files } = addonParams;
  const id =
    files && Object.hasOwnProperty.call(files, cookieTheme) && cookieTheme;

  const selected = globals.cssVariables || theme || id;

  const setSelected = useCallback(
    (value: string | null) => {
      updateGlobals({
        cssVariables: value,
      });
    },
    [updateGlobals],
  );

  const emit = useChannel({});

  useEffect(() => {
    if (!selected) {
      setSelected(theme || id || defaultTheme);
    }
  }, [selected, theme, defaultTheme, id, setSelected]);

  function handleChange(onHide: () => void, value: string | null) {
    const newValue = value.indexOf(CLEAR_LABEL) > -1 ? CLEAR_LABEL : value;
    setSelected(newValue);
    emit('cssVariablesChange', { id: newValue });
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
    const result: any[] = Object.keys(items).map((value) =>
      toLink(value, value === selected, onHide),
    );
    if (selected !== CLEAR_LABEL && !defaultTheme) {
      result.unshift(toLink(CLEAR_LABEL, false, onHide));
    }
    return result;
  }

  if (files) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }: any) => (
          <TooltipLinkList links={generateLinks(files, onHide)} />
        )}
      >
        <IconButtonWithLabel
          key="css themes"
          title="CSS custom properties themes"
          active={Object.hasOwnProperty.call(files, selected)}
        >
          <PaintBrushIcon />
          <ActiveViewportLabel title="Theme">
            {selected || 'No theme'}
          </ActiveViewportLabel>
        </IconButtonWithLabel>
      </WithTooltip>
    );
  }
  return null;
};

export default Dropdown;
