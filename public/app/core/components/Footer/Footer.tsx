import React, { FC } from 'react';
import config from 'app/core/config';
//import { Icon, IconName } from '@grafana/ui';

const InsensConfig = require('insens_config.json');

export interface FooterLink {
  text: string;
  icon?: string;
  url?: string;
  target?: string;
}

export let getFooterLinks = (): FooterLink[] => {
  return [
    // {
    //   text: 'Documentation',
    //   icon: 'document-info',
    //   url: 'https://grafana.com/docs/grafana/latest/?utm_source=grafana_footer',
    //   target: '_blank',
    // },
    {
      text: 'Support',
      icon: 'question-circle',
      url: InsensConfig.contact_url,
      target: '_blank',
    },
    {
      text: 'License',
      icon: 'book-open',
      url: InsensConfig.source_code_url,
      target: '_blank',
    },
  ];
};

export let getVersionLinks = (): FooterLink[] => {
  const { buildInfo, licenseInfo } = config;
  const links: FooterLink[] = [];
  const stateInfo = licenseInfo.stateInfo ? ` (${licenseInfo.stateInfo})` : '';

  links.push({ text: `${buildInfo.edition}${stateInfo}`, url: licenseInfo.licenseUrl });

  if (buildInfo.hideVersion) {
    return links;
  }

  links.push({ text: `v${buildInfo.version} (${buildInfo.commit})` });

  if (buildInfo.hasUpdate) {
    links.push({
      text: `New version available!`,
      icon: 'download-alt',
      url: 'https://grafana.com/grafana/download?utm_source=grafana_footer',
      target: '_blank',
    });
  }

  return links;
};

export function setFooterLinksFn(fn: typeof getFooterLinks) {
  getFooterLinks = fn;
}

export function setVersionLinkFn(fn: typeof getFooterLinks) {
  getVersionLinks = fn;
}

export const Footer: FC = React.memo(() => {
  //const links = getFooterLinks().concat(getVersionLinks());

  return (
    <footer className="footer">
      {/*<div className="text-center">*/}
      {/*  <ul>*/}
      {/*    {links.map((link) => (*/}
      {/*      <li key={link.text}>*/}
      {/*        <a href={link.url} target={link.target} rel="noopener">*/}
      {/*          {link.icon && <Icon name={link.icon as IconName} />} {link.text}*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </footer>
  );
});

Footer.displayName = 'Footer';
