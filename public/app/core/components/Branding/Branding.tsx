import React, { FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme2, styleMixins } from '@grafana/ui';
//import { colorManipulator } from '@grafana/data';

const InsensConfig = require('insens_config.json');

export interface BrandComponentProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const LoginLogo: FC<BrandComponentProps> = ({ className }) => {
  return <img className={className} src={InsensConfig.brand.logo} alt={InsensConfig.brand.logo_alt} />;
};

const LoginBackground: FC<BrandComponentProps> = ({ className, children }) => {
  const theme = useTheme2();

  const background = css`
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: url(${theme.isDark ? InsensConfig.login.background_dark : InsensConfig.login.background_light});
      background-position: top center;
      background-size: auto;
      background-repeat: no-repeat;

      opacity: 0;
      transition: opacity 3s ease-in-out;

      @media ${styleMixins.mediaUp(theme.v1.breakpoints.md)} {
        background-position: center;
        background-size: cover;
      }
    }
  `;

  return <div className={cx(background, className)}>{children}</div>;
};

const MenuLogo: FC<BrandComponentProps> = ({ className }) => {
  return <img className={className} src={InsensConfig.brand.logo} alt={InsensConfig.brand.logo_alt} />;
};

const LoginBoxBackground = () => {
  //const theme = useTheme2();
  //background: ${colorManipulator.alpha(theme.colors.background.primary, 0.7)};

  return css`
    background: ${InsensConfig.login.login_form_box_color};
    background-size: cover;
  `;
};

export class Branding {
  static LoginLogo = LoginLogo;
  static LoginBackground = LoginBackground;
  static MenuLogo = MenuLogo;
  static LoginBoxBackground = LoginBoxBackground;
  static AppTitle = InsensConfig.app_title;
  static LoginTitle = InsensConfig.login.title;
  static GetLoginSubTitle = (): null | string => {
    const slogans = InsensConfig.login.slogans;
    const count = slogans.length;
    return slogans[Math.floor(Math.random() * count)];
  };
}
