import { useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { TreasuryAllocationTime } from '../realm-defi/types';

const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<TreasuryAllocationTime>({
    prevAllocation: new Date(),
    nextAllocation: new Date(),
  });
  const basisCash = useBasisCash();

  useEffect(() => {
    if (basisCash) {
      basisCash.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [basisCash]);
  return time;
};

export default useTreasuryAllocationTimes;
