import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../realm-defi';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} NOBLES from the Court Room`,
      );
    },
    [basisCash, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
