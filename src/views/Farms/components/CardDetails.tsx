import React, { useState, useMemo, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import styled, { ThemeContext } from 'styled-components';

import { Bank } from '@/realm-defi';

// import useTokenBalance from 'hooks/useTokenBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStake from '../../../hooks/useStake';
import useWithdraw from '../../../hooks/useWithdraw';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import { getDisplayBalance, getFullDisplayBalance } from '../../../utils/formatBalance';

import TokenInput from '../../../components/TokenInput';
import Button from '../../../components/Button';

interface CardDetails {
  farm: Bank;
  open?: boolean;
  tokenSymbol?: string;
}

const SectionWrapper = styled.div<{ open: boolean }>`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
`;

const StakingSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const StakingTitle = styled.span`
  color: ${({ theme }) => theme.color.primary.main};
  font-size: 16px;
  font-weight: bold;
`;

const StakingSubtitle = styled.span`
  color: ${({ theme }) => theme.color.primary.main};
  font-size: 12px;
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;

  & > button:last-child {
    margin-left: 5px;
  }
`;

const ClaimSection = styled.div`
  align-self: flex-end;
  padding: 18px;
  width: max-content;
`;

const CardDetails: React.FC<CardDetails> = ({ open, farm }) => {
  const [pendingTx, setPendingTx] = useState(false);
  const [approveStatus, approve] = useApprove(farm.depositToken, farm.address);
  const [stakeValue, setStakeValue] = useState('');
  const [unstakeValue, setUnstakeValue] = useState('');

  const { account } = useWallet();
  const { onStake } = useStake(farm);
  const { onWithdraw } = useWithdraw(farm);
  const earnings = useEarnings(farm.contract);
  const { onReward } = useHarvest(farm);

  //TODO: Rename bank to farm
  const tokenBalance = useTokenBalance(farm.depositToken);
  const stakedBalance = useStakedBalance(farm.contract, farm.pid);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(tokenBalance, 18);
  }, [tokenBalance]);

  const stakedFullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalance);
  }, [stakedBalance]);

  const handleStakeChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setStakeValue(e.currentTarget.value);
    },
    [setStakeValue],
  );
  const handleStakeMax = useCallback(() => {
    setStakeValue(fullBalance);
  }, [setStakeValue, fullBalance]);

  const handleUnstakeChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUnstakeValue(e.currentTarget.value);
    },
    [setUnstakeValue],
  );
  const handleUnstakeMax = useCallback(() => {
    setUnstakeValue(stakedFullBalance);
  }, [setUnstakeValue, stakedFullBalance]);

  return (
    <SectionWrapper open={open}>
      {!account ? (
        <UnlockWallet />
      ) : approveStatus !== ApprovalState.APPROVED
      ? 
      <Button
      disabled={
        approveStatus === ApprovalState.PENDING ||
        approveStatus === ApprovalState.UNKNOWN
      }
      onClick={approve}
      text={`Approve ${farm.depositTokenName}`}
    />
      : (
        <>
          <StakingSection>
            <StakingTitle>I want to stake</StakingTitle>
            <StakingSubtitle>Available Balance: {fullBalance}</StakingSubtitle>
            <InputSection>
              <TokenInput
                value={stakeValue}
                max={fullBalance}
                onChange={handleStakeChange}
                onSelectMax={handleStakeMax}
                symbol={farm.name}
                size={150}
              />
              <Button
                size="sm"
                text={pendingTx ? 'Pending Confirmation' : 'Stake'}
                variant="peons"
                onClick={async () => {
                  setPendingTx(true);
                  try {
                    await onStake(stakeValue);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setPendingTx(false);
                  }
                }}
              />
            </InputSection>
          </StakingSection>
          <StakingSection>
            <StakingTitle>I want to unstake</StakingTitle>
            <StakingSubtitle>Available Balance: {stakedFullBalance}</StakingSubtitle>
            <InputSection>
              <TokenInput
                value={unstakeValue}
                max={stakedFullBalance}
                onChange={handleUnstakeChange}
                onSelectMax={handleUnstakeMax}
                symbol={farm.name}
                size={150}
              />
              <Button
                size="sm"
                text={pendingTx ? 'Pending Confirmation' : 'Unstake'}
                variant="peons"
                onClick={async () => {
                  setPendingTx(true);
                  try {
                    await onWithdraw(unstakeValue);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setPendingTx(false);
                  }
                }}
              />
            </InputSection>
          </StakingSection>
          <ClaimSection>
            <Button
              size="sm"
              text={
                pendingTx
                  ? 'Pending Confirmation'
                  : `Claim ${getDisplayBalance(earnings)} ${farm.earnTokenName}`
              }
              variant="nobles"
              onClick={async () => {
                setPendingTx(true);
                try {
                  await onReward();
                } catch (error) {
                  console.error(error);
                } finally {
                  setPendingTx(false);
                }
              }}
            />
          </ClaimSection>
        </>
      )}
    </SectionWrapper>
  );
};

export default CardDetails;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};
