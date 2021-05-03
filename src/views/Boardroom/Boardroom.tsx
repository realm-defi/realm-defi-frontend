import React, { useEffect, useMemo, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import Timer from './components/Timer';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';

import config from '../../config';
import ValueCounter from '../../components/ValueCounter';
import LaunchCountdown from '../../components/LaunchCountdown';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAmount from '../../hooks/useTreasuryAmount';
import useTotalStakedBalanceOnBoardroom from '../../hooks/useTotalStakedBalanceOnBoardroom';
import useCourtroomPermission from '../../hooks/useCourtroomPermission';
import { getBalance, getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';

const countdownTimer = () => {};

const Boardroom: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const cashStat = useCashPriceInEstimatedTWAP();
  const treasuryAmount = useTreasuryAmount();
  const totalStakedAmount = useTotalStakedBalanceOnBoardroom();
  const { canWithdraw } = useCourtroomPermission();

  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();

  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(1, 'days').toDate(), [prevEpoch]);
  const { color } = useContext(ThemeContext);

  const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={'🤝'}
            title="Join the Boardroom"
            subtitle="Deposit Basis Shares and earn inflationary rewards"
          />
          <LaunchCountdown
            deadline={config.boardroomLaunchesAt}
            description="How does the boardroom work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism#expansionary-policy"
          />
        </Page>
      </Switch>
    );
  }

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <PageHeader
              icon={'🤝'}
              title="Join the Boardroom"
              subtitle="Deposit Basis Shares and earn inflationary rewards"
            />
            <StyledHeader>
              <StyledHeaderBox>
                <Label variant="nobles">Nobles Locked</Label>
                <Value>
                  <ValueCounter color={color.primary.main} value={Number(getDisplayBalance(totalStakedAmount))} decimals={2} />
                </Value>
              </StyledHeaderBox>
              <StyledHeaderBox>
                <Label>EPOCH 186</Label>
                <Timer />
              </StyledHeaderBox>
              <StyledHeaderBox>
                <Label variant="peons">Value Locked</Label>
                <Value>
                  <ValueCounter
                    color={color.primary.main}
                    value={123432423}
                    decimals={2}
                    prefix="$"
                  />
                </Value>
              </StyledHeaderBox>
            </StyledHeader>
            <StyledHeader>
              <StyledInformationCard>
                <LabelSmall>APR</LabelSmall>
                <InformationCardValue>127432%</InformationCardValue>
              </StyledInformationCard>
              <StyledInformationCard>
                <LabelSmall variant="peons">PEON TWAP</LabelSmall>
                <InformationCardValue>
                  {cashStat ? `$${cashStat.priceInBusd}` : '-'}
                </InformationCardValue>
              </StyledInformationCard>
              <StyledInformationCard>
                <LabelSmall>Expansion Rate</LabelSmall>
                <InformationCardValue>3%</InformationCardValue>
              </StyledInformationCard>
              <StyledInformationCard>
                <LabelSmall variant="nobles">DAO Funds</LabelSmall>
                <InformationCardValue>
                  {treasuryAmount ? `~$${getDisplayBalance(treasuryAmount, 18, 2)}` : '-'}
                </InformationCardValue>
              </StyledInformationCard>
            </StyledHeader>
            <StyledBoardroom>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <Harvest />
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <div>
                <Button
                  disabled={stakedBalance.eq(0) || !canWithdraw}
                  onClick={onRedeem}
                  text="Settle & Withdraw"
                />
              </div>
              <Spacer size="lg" />
            </StyledBoardroom>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 25px;
  }
`;

const Label = styled.div<{ variant?: string }>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'nobles':
        return theme.color.priceColors.secondary;
      case 'peons':
        return theme.color.priceColors.peons;
      default:
        return theme.color.priceColors.primary;
    }
  }};
  color: white;
  font-size: 22px;
  font-weight: bold;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
`;

const LabelSmall = styled.span<{ variant?: string }>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'nobles':
        return theme.color.priceColors.secondary;
      case 'peons':
        return theme.color.priceColors.peons;
      default:
        return theme.color.priceColors.primary;
    }
  }};

  font-size: 24px;
  font-weight: bold;
`;

const Value = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  padding: 10px 50px;
  border-radius: 5px;
`;

const StyledHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  margin-right: 25px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: unset;
  }
`;

const StyledInformationCard = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.card.background};
  padding: 10px 25px;
  margin-right: 15px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: unset;
  }
`;

const InformationCardValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Boardroom;
