import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../realm-defi';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      const uintPid = parseUnits(bank.pid.toString(), bank.depositToken.decimal)
      handleTransactionReceipt(
        basisCash.stake(bank.contract, amountBn, uintPid),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank.depositToken.decimal, bank.contract, bank.pid, bank.depositTokenName, handleTransactionReceipt, basisCash],
  );
  return { onStake: handleStake };
};

export default useStake;
