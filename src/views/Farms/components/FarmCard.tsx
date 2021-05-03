import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Card from '../../../components/Card';
import { ChevronDown, OpenExternal } from '../../../components/icons';
import ValueCounter from '../../../components/ValueCounter';
import useEarnings from '../../../hooks/useEarnings';
import { getDisplayBalance } from '../../../utils/formatBalance';

import config from '../../../config';
// TODO: refactor and rename
import { Bank } from '../../../realm-defi';
import CardDetails from './CardDetails';

interface FarmCard {
  farm: Bank;
}

const CardWrapper = styled.div<{ open?: boolean }>`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  border-radius: 32px;
  transition: all 0.5s ease-in-out;
  max-height: ${({ open }) => (open ? '420px' : '125px')};
  width: 350px;
  background: ${({ theme }) => theme.card.background};
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 550px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
    max-height: ${({ open }) => (open ? '250px' : '87px')};
    width: 950px;
    padding: 0 38px 0 24px;
  }
`;

const InformationSection = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  flex-wrap: wrap;
  padding-bottom: 20px;
  /* border-bottom: solid 2px ${({ theme }) => theme.color.primary.main}; */

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
    padding: 15px 0;
  }
`;

const HeadingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
    width: 300px;
  }
`;

const Header = styled.h2`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.primary.main};
`;

const EarnedSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5px;
`;

const Earned = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.color.priceColors.primary};
  font-weight: bold;
  line-height: 1;
`;

const EarnedSubtitle = styled.span`
  color: ${({ theme }) => theme.color.primary.main};
  font-weight: 600;
`;

const IconWrapper = styled.div<{ toggled?: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const OpenLogo = styled.a`
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 5px;
`;

const AprSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2px 20px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.75);
`;

const AprLabel = styled.span``;

const EarnedAndOpenWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FarmCard: React.FC<FarmCard> = ({ farm }) => {
  const [toggleDetails, setToggleDetails] = useState(false);
  const earnings = useEarnings(farm.contract);


  const {
    color: { primary, priceColors },
  } = useContext(ThemeContext);

  const { address, name } = farm;
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;

  return (
    <CardWrapper open={toggleDetails}>
      <InformationSection open={toggleDetails}>
        <HeadingSection>
          <Header>{name}</Header>
          <OpenLogo href={tokenUrl} target="_blank">
            <OpenExternal color={primary.main} />
          </OpenLogo>
        </HeadingSection>
        <AprSection>
          <ValueCounter value={10000} decimals={0} color={priceColors.secondary} suffix="%" />
          <AprLabel>APR</AprLabel>
        </AprSection>

        <EarnedAndOpenWrapper>
          <EarnedSection>
            <Earned>{getDisplayBalance(earnings)}</Earned>
            <EarnedSubtitle>{farm.earnTokenName} Earned</EarnedSubtitle>
          </EarnedSection>
          <IconWrapper toggled={toggleDetails} onClick={() => setToggleDetails(!toggleDetails)}>
            <ChevronDown color={primary.main} />
          </IconWrapper>
        </EarnedAndOpenWrapper>
      </InformationSection>
      <CardDetails farm={farm} />
    </CardWrapper>
  );
};

export default FarmCard;
