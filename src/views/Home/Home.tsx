import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import theme from '../../theme';

const Home: React.FC = () => {
  // TODO: remove all instances of basisCash
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    try {
      const [cash, bond, share] = await Promise.all([
        basisCash.getCashStatFromUniswap(),
        basisCash.getBondStat(),
        basisCash.getShareStat(),
      ]);
      if (Date.now() < config.bondLaunchesAt.getTime()) {
        bond.priceInBusd = '-';
      }
      setStats({ cash, bond, share });
    } catch (e) {
      console.error(e);
    }
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash, fetchStats]);

  const cashAddr = useMemo(() => basisCash?.PEONS.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.NOBLES.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.EXILED.address, [basisCash]);

  const {
    color: { primary },
  } = theme;

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="The Realm Protocol is an algorithmic stablecoing running on Binance Smart Chain (BSC)."
        title="Welcome to Realm!"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="PEONS"
          symbol="PEONS"
          color={primary.main}
          address={cashAddr}
          stat={cash}
          variant="peons"
        />
        <Spacer size="lg" />
        <HomeCard
          title="NOBLES"
          symbol="NOBLES"
          color={primary.main}
          address={shareAddr}
          stat={share}
          largeSize={true}
          variant="nobles"
        />
        <Spacer size="lg" />
        <HomeCard
          title="EXILED"
          symbol="EXILED"
          color={primary.main}
          address={bondAddr}
          stat={bond}
          variant="exiled"
        />
      </CardWrapper>
    </Page>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export default Home;
