import React from 'react';

import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';
import PeonsLogo from '../../assets/img/peons-logo.svg';
import NoblesLogo from '../../assets/img/nobles-logo.svg';
import ExiledLogo from '../../assets/img/exiled-logo.svg';

const logosBySymbol: {[title: string]: string} = {
  'PEONS': PeonsLogo,
  'NOBLES': NoblesLogo,
  'EXILED': ExiledLogo,
  'USDC': USDCLogo,
  'USDT': USDTLogo,
  // TODO: Replace with actual logos
  'PEONS-BUSD-CAKE-LP': PeonsLogo,
  'NOBLES-BUSD-CAKE-LP': PeonsLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
