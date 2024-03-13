import { addons, types } from '@storybook/manager-api';

import Dropdown from './component/Dropdown';
import { ADDON_ID } from './constants';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'CSS Variables Theme',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: Dropdown,
  });
});
