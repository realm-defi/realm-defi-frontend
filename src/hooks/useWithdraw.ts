import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../realm-defi';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      // const uintPid = parseUnits(bank.pid.toString(), bank.depositToken.decimal)
      handleTransactionReceipt(
        basisCash.unstake(bank.contract, amountBn, bank.pid),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank.contract, bank.depositToken.decimal, bank.depositTokenName, bank.pid, basisCash, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
