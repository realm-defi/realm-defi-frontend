import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';

import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';

interface DepositModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  tokenName?: string;
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('');

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, tokenName === 'USDC' ? 6 : 18);
  }, [max, tokenName]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  console.log(fullBalance);
  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName}`} />
      <Label>Available Balance: {fullBalance}</Label>
      <TokenInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
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

export default DepositModal;
