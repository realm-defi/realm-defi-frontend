import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';

const useTotalStakedBalanceOnBoardroom = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  useEffect(() => {
    if (basisCash) {
      const { Court } = basisCash.contracts;
      basisCash.NOBLES.balanceOf(Court.address).then(setAmount);
    }
  }, [basisCash]);
  return amount;
};

export default useTotalStakedBalanceOnBoardroom;
