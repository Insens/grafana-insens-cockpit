import { GrafanaTheme2 } from '../../../../../packages/grafana-data';
import { css, cx } from '@emotion/css';
import React, { ReactNode } from 'react';
import { Link, useTheme2 } from '../../../../../packages/grafana-ui';

export interface NavBarItemWithoutMenuProps {
  label: string;
  children: ReactNode;
  className?: string;
  url?: string;
  target?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavBarItemWithoutMenu({
  label,
  children,
  className,
  url,
  target,
  isActive = false,
  onClick,
}: NavBarItemWithoutMenuProps) {
  const theme = useTheme2();
  const styles = getNavBarItemWithoutMenuStyles(theme, isActive);

  return (
    <li className={cx(styles.container, className)}>
      {!url && (
        <button className={styles.element} onClick={onClick} aria-label={label}>
          <span className={styles.icon}>{children}</span>
        </button>
      )}
      {url && (
        <>
          {!target && url.startsWith('/') ? (
            <Link
              className={styles.element}
              href={url}
              target={target}
              aria-label={label}
              onClick={onClick}
              aria-haspopup="true"
            >
              <span className={styles.icon}>{children}</span>
            </Link>
          ) : (
            <a href={url} target={target} className={styles.element} onClick={onClick} aria-label={label}>
              <span className={styles.icon}>{children}</span>
            </a>
          )}
        </>
      )}
    </li>
  );
}

export function getNavBarItemWithoutMenuStyles(theme: GrafanaTheme2, isActive?: boolean) {
  return {
    container: css`
      position: relative;
      color: ${isActive ? theme.colors.text.primary : theme.colors.text.secondary};

      &:hover {
        background-color: ${theme.colors.action.hover};
        color: ${theme.colors.text.primary};

        // TODO don't use a hardcoded class here, use isVisible in NavBarDropdown
        .navbar-dropdown {
          opacity: 1;
          visibility: visible;
        }
      }
    `,
    element: css`
      background-color: transparent;
      border: none;
      color: inherit;
      display: block;
      line-height: ${theme.components.sidemenu.width}px;
      padding: 0;
      text-align: center;
      width: ${theme.components.sidemenu.width}px;

      &::before {
        display: ${isActive ? 'block' : 'none'};
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        border-radius: 2px;
        background-image: ${theme.colors.gradients.brandVertical};
      }

      &:focus-visible {
        background-color: ${theme.colors.action.hover};
        box-shadow: none;
        color: ${theme.colors.text.primary};
        outline: 2px solid ${theme.colors.primary.main};
        outline-offset: -2px;
        transition: none;
      }
    `,
    // Insens remove logo borders
    icon: css`
      height: 100%;
      width: 100%;

      img {
        border-radius: 20%;
        height: ${theme.spacing(3)};
        width: ${theme.spacing(3)};
      }
    `,
  };
}
