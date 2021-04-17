import { useCallback, useEffect, useState } from 'react';
// import { useWallet } from 'use-wallet';
import { useWeb3React } from '@web3-react/core'

import { BigNumber } from 'ethers';
import ERC20 from '../realm-defi/ERC20';

const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  // const { account } = useWallet();
  const { account } = useWeb3React();

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    console.log(`Allowance: ${allowance.toString()} ${token.symbol} for ${spender}`);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
  }, [account, spender, token, pendingApproval, fetchAllowance]);

  return allowance;
};

export default useAllowance;
