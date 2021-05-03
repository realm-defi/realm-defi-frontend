import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';

import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';

interface WithdrawModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  tokenName?: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
}) => {
  const [val, setVal] = useState('');

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max);
  }, [max]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <Modal>
      <ModalTitle text={`Withdraw ${tokenName}`} />
      <Label>Available Balance: {fullBalance}</Label>
      <TokenInput onSelectMax={handleSelectMax} onChange={handleChange} value={val} />
      <ModalActions>
        <Button text="Cancel" variant="exiled" onClick={onDismiss} />
        <Button text="Confirm" variant="peons" onClick={() => onConfirm(val)} />
      </ModalActions>
    </Modal>
  );
};

const Label = styled.span`
  color: ${({ theme }) => theme.color.primary.main};
`;

export default WithdrawModal;
