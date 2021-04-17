import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import ValueCounter from '../../../components/ValueCounter';
import { TokenStat } from '../../../realm-defi/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import Button from '../../../components/Button';
import config from '../../../config';
import { OpenExternal } from '../../../components/icons';

interface HomeCardProps {
  title: string;
  symbol: string;
  color: string;
  address: string;
  largeSize?: boolean;
  variant?: 'nobles' | 'peons' | 'exiled';
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  color,
  address,
  largeSize = false,
  variant,
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;

  const {
    color: { priceColors },
  } = useContext(ThemeContext);
  return (
    <Wrapper>
      <StyledCards>
        <OpenLogo href={tokenUrl} target="blank">
          <OpenExternal color={color} />
        </OpenLogo>
        <TokenSymbol symbol={symbol} size={largeSize ? 256 : 192} />
        <CardHeader>{title}</CardHeader>
        <CardSection>
          <Label text="Current Price" color={color} />
          {stat ? (
            <>
              <ValueCounter
                value={Number(stat.priceInBusd)}
                decimals={2}
                color={priceColors.primary}
              />
            </>
          ) : (
            <ValueSkeleton />
          )}
          <Label text="Circulating Supply" color={color} />
          {/* // TODO: how to show circulating supply? */}
          {stat ? (
            <>
              <ValueCounter value={1500} decimals={0} color={priceColors.secondary} />
            </>
          ) : (
            <ValueSkeleton />
          )}
          <Label text="Total Supply" color={color} />
          {stat ? (
            <>
              <ValueCounter
                value={Number(stat.totalSupply)}
                decimals={0}
                color={priceColors.secondary}
              />
            </>
          ) : (
            <ValueSkeleton />
          )}
        </CardSection>
      </StyledCards>
      <PurchaseButton>
        {/* TODO: replace with logic for disables */}
        <Button
          text={`Buy ${title}`}
          variant={variant}
          disabled={variant === 'exiled' ? true : false}
        />
      </PurchaseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.md} {
    height: max-content;
  }
`;

const OpenLogo = styled.a`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const PurchaseButton = styled.div`
  margin-top: 10px;
`;

const CardHeader = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.color.primary.main};
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

const StyledCards = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  min-width: 300px;
  width: 90%;

  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.primary.main};

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 100%;
  }
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.primary.main} highlightColor={theme.color.grey[700]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} width={100} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

export default HomeCard;
