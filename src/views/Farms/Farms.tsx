import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';

// TODO: Refactor and change names
import useBanks from '../../hooks/useBanks';

import FarmCard from './components/FarmCard'

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Farms: React.FC = () => {
  const [banks] = useBanks()

  const activeFarms = banks.filter((bank) => !bank.finished);
  const inactiveFarms = banks.filter((bank) => bank.finished);

  return (
    <Page>
      <PageHeader
        icon="👨🏻‍🌾"
        title="Farm Opportunities"
        subtitle="Stake Liquidity Pool (LP) tokens to earn."
      />
      <StyledCards>
        {activeFarms.map((farm, i) =>  {
          // console.log(farm)
          return (
            <FarmCard key={farm.sort} farm={farm} />
        )})}
      </StyledCards>
    </Page>
  );
};

export default Farms
