import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';

const useCourtroomPermission = () => {
  const [canClaimReward, setCanClaimReward] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const basisCash = useBasisCash();

  const fetchPermissions = useCallback(async () => {
    setCanClaimReward(await basisCash.canClaimReward());
    setCanWithdraw(await basisCash.canWithdraw());
  }, [basisCash]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchPermissions().catch((e) => console.error(e.stack));
    }
  }, [basisCash, fetchPermissions]);

  return { canClaimReward, canWithdraw };
};

export default useCourtroomPermission;
