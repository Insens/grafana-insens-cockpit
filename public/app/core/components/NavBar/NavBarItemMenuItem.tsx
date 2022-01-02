import React, { ReactElement, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { useTheme2 } from '@grafana/ui';
import { GrafanaTheme2, NavModelItem } from '@grafana/data';
import { useMenuItem } from '@react-aria/menu';
import { useFocus } from '@react-aria/interactions';
import { TreeState } from '@react-stately/tree';
import { mergeProps } from '@react-aria/utils';
import { Node } from '@react-types/shared';

import { useNavBarItemMenuContext } from './context';

export interface NavBarItemMenuItemProps {
  item: Node<NavModelItem>;
  state: TreeState<NavModelItem>;
  onNavigate: (item: NavModelItem) => void;
}

export function NavBarItemMenuItem({ item, state, onNavigate }: NavBarItemMenuItemProps): ReactElement {
  const { onClose } = useNavBarItemMenuContext();
  const { key, rendered } = item;
  const ref = useRef<HTMLLIElement>(null);
  const isDisabled = state.disabledKeys.has(key);

  // style to the focused menu item
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused, isDisabled });
  const theme = useTheme2();
  const isSection = item.value.menuItemType === 'section';
  const styles = getStyles(theme, isFocused, isSection);
  const onAction = () => {
    onNavigate(item.value);
    onClose();
  };

  let { menuItemProps } = useMenuItem(
    {
      isDisabled,
      'aria-label': item['aria-label'],
      key,
      closeOnSelect: true,
      onClose,
      onAction,
    },
    state,
    ref
  );

  return (
    <li {...mergeProps(menuItemProps, focusProps)} ref={ref} className={styles.menuItem}>
      {rendered}
    </li>
  );
}

function getStyles(theme: GrafanaTheme2, isFocused: boolean, isSection: boolean) {
  let backgroundColor = 'transparent';
  // Does not seem to do shit
  let textColor = theme.colors.text.primary;
  if (isSection) {
    // Insens coloring of menu item header background
    backgroundColor = '#004688';
    textColor = '#e2e2e2';
  } else if (isFocused) {
    backgroundColor = theme.colors.action.hover;
  }

  return {
    menuItem: css`
      background-color: ${backgroundColor};
      color: ${textColor};

      &:focus-visible {
        background-color: ${backgroundColor};
        box-shadow: none;
        color: ${textColor};
        outline: 1px solid ${theme.colors.primary.main};
        // Need to add condition, header is 0, otherwise -2
        outline-offset: -0px;
        transition: none;
      }
    `,
  };
}
