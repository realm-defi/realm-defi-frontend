import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';

import Label from '../../Label';
import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';
import useBasisCash from '../../../hooks/useBasisCash';
import TokenSymbol from '../../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const basisCash = useBasisCash();

  const peonsBalance = useTokenBalance(basisCash.PEONS);
  const displayBacBalance = useMemo(() => getDisplayBalance(peonsBalance), [peonsBalance]);

  const noblesBalance = useTokenBalance(basisCash.NOBLES);
  const displayBasBalance = useMemo(() => getDisplayBalance(noblesBalance), [noblesBalance]);

  const exiledBalance = useTokenBalance(basisCash.EXILED);
  const displayBabBalance = useMemo(() => getDisplayBalance(exiledBalance), [exiledBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="PEONS" />
          <StyledBalance>
            <StyledValue>{displayBacBalance}</StyledValue>
            <Label text="PEONS Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="NOBLES" />
          <StyledBalance>
            <StyledValue>{displayBasBalance}</StyledValue>
            <Label text="NOBLES Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="EXILED" />
          <StyledBalance>
            <StyledValue>{displayBabBalance}</StyledValue>
            <Label text="EXILED Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  )
}

const StyledValue = styled.div`
  color: ${props => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${props => props.theme.spacing[3]}px;
`

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${props => props.theme.spacing[3]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing[4]}px;
`

export default AccountModal