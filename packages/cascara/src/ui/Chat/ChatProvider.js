import React, { useState } from 'react';
import {
  Dropdown,
  Flex,
  Provider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsTheme,
} from '@fluentui/react-northstar';

import { barista, slack } from './themes';

const DEFAULT_THEME_INDEX = 0;

const items = [
  /*
   * {
   *   header: 'Barista',
   *   key: 'barista',
   *   value: 'barista',
   * },
   * {
   *   header: 'Slack',
   *   key: 'slack',
   *   value: 'slack',
   * },
   */
  {
    header: 'Teams Light',
    key: 'light',
    value: 'teamsTheme',
  },
  {
    header: 'Teams Dark',
    key: 'dark',
    value: 'teamsDarkTheme',
  },
  {
    header: 'Teams High Contrast',
    key: 'hc',
    value: 'teamsHighContrastTheme',
  },
];

const overrideTheme = {
  fontFaces: [],
  staticStyles: [],
};

const themes = {
  barista: barista,
  slack: slack,
  teamsDarkTheme: {
    ...teamsDarkTheme,
    ...overrideTheme,
  },
  teamsHighContrastTheme: {
    ...teamsHighContrastTheme,
    ...overrideTheme,
  },
  teamsTheme: {
    ...teamsTheme,
    ...overrideTheme,
  },
};

const ChatProvider = ({ children, inputComponent, isThemeSelectable }) => {
  const [theme, setTheme] = useState(items[DEFAULT_THEME_INDEX].value);

  return (
    <Provider theme={themes[theme]}>
      <Flex column gap='gap.small' style={{ maxHeight: '100vh' }}>
        {isThemeSelectable && (
          <div>
            <Dropdown
              defaultValue={items[DEFAULT_THEME_INDEX]}
              fluid
              items={items.map((option) => ({
                ...option,
              }))}
              onChange={(e, data) => setTheme(data.value.value)}
              placeholder='Select a theme'
            />
          </div>
        )}

        <div style={{ overflowY: 'auto' }}>{children}</div>

        {inputComponent}
      </Flex>
    </Provider>
  );
};

export default ChatProvider;
