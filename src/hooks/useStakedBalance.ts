import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import { ContractName } from '../realm-defi';
import config from '../config';

const useStakedBalance = (poolName: ContractName, pid: number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();
  const isUnlocked = basisCash?.isUnlocked

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.stakedBalanceOnBank(poolName, basisCash.myAccount, pid);
    setBalance(balance);
  }, [basisCash, pid, poolName]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [poolName, setBalance, basisCash, fetchBalance, isUnlocked]);

  return balance;
};

export default useStakedBalance;
