import React from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2, NavModel } from '@grafana/data';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import { ServerStats } from './ServerStats';

interface Props {
  navModel: NavModel;
}

export const UpgradePage: React.FC<Props> = ({ navModel }) => {
  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <ServerStats />
        <UpgradeInfo
          editionNotice="You are running the open-source version of Grafana.
        You have to install the Enterprise edition in order enable Enterprise features."
        />
      </Page.Contents>
    </Page>
  );
};

interface UpgradeInfoProps {
  editionNotice?: string;
}

export const UpgradeInfo: React.FC<UpgradeInfoProps> = ({ editionNotice }) => {
  const styles = useStyles2(getStyles);

  return (
    <>
      <h2 className={styles.title}>Nothing to see here</h2>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    column: css`
      display: grid;
      grid-template-columns: 100%;
      column-gap: 20px;
      row-gap: 40px;

      @media (min-width: 1050px) {
        grid-template-columns: 50% 50%;
      }
    `,
    title: css`
      margin: ${theme.spacing(4)} 0;
    `,
  };
};

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'upgrading'),
});

export default connect(mapStateToProps)(UpgradePage);
