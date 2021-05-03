import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';
import CardContent from '../../../components/CardContent';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useCourtroomPermission from '../../../hooks/useCourtroomPermission';
import { getDisplayBalance } from '../../../utils/formatBalance';

const Harvest: React.FC = () => {
  const { onReward } = useHarvestFromBoardroom();
  const { canClaimReward } = useCourtroomPermission();
  const earnings = useEarningsOnBoardroom();

  return (
    <StyledCard>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <TokenSymbol symbol="PEONS" size={192} />
            <Value>{getDisplayBalance(earnings)}</Value>
            <Label>PEONS earned</Label>
            <Label>
              Locked until
              <Accent>EPOCH 192</Accent>
            </Label>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              onClick={onReward}
              text="Claim Reward"
              disabled={earnings.eq(0) || !canClaimReward}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card.background};
  border-radius: 5px;
  min-width: 300px;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 370px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-width: 370px;
  }
`;

const Value = styled.span`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.secondary.main};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.color.primary.main};
  font-size: 24px;
  font-weight: bold;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.color.priceColors.primary};
  margin-left: 5px;
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
