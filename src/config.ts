import { Configuration } from './realm-defi/config';
import { BankInfo } from './realm-defi';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 31337,
    etherscanUrl: 'https://bscscan.com/',
    defaultProvider: 'http://localhost:8545',
    deployments: require('./realm-defi/deployments/deployments.mainnet.json'),
    externalTokens: {
      BNB: ['0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', 18],
      BUSD: ['0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82', 18],
      BDO: ['0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44', 18],
      MDO: ['0x4A679253410272dd5232B3Ff7cF5dbB88f295319', 18],
      SOUP: ['0x09635F643e140090A9A8Dcd712eD6285858ceBef', 18],
      USDT: ['0x67d269191c92Caf3cD7723F116c85e6E9bf55933', 18],
      'PEONS-BNB-CAKE-LP': ['0x3Dc470cB503285DF73923F6029BC6DF9051811F2', 18],
      'PEONS-BUSD-CAKE-LP': ['0xA2280558B5ae7a64d3eD90E1FFA30E9c7B918D64', 18],
      'NOBLES-BUSD-CAKE-LP': ['0x56bbD88e096c00Aef3642F441eD1D7c9cfFC174e', 18],
    },
    // TODO: Change launch dates
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: 56,
    etherscanUrl: 'https://bscscan.com/',
    defaultProvider: 'https://bsc-dataseed1.ninicoin.io',
    deployments: require('./realm-defi/deployments/deployments.mainnet.json'),
    externalTokens: {
      BNB: ['0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', 18],
      BUSD: ['0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82', 18],
      BDO: ['0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44', 18],
      MDO: ['0x4A679253410272dd5232B3Ff7cF5dbB88f295319', 18],
      SOUP: ['0x09635F643e140090A9A8Dcd712eD6285858ceBef', 18],
      USDT: ['0x67d269191c92Caf3cD7723F116c85e6E9bf55933', 18],
      'PEONS-BNB-CAKE-LP': ['0x3Dc470cB503285DF73923F6029BC6DF9051811F2', 18],
      'PEONS-BUSD-CAKE-LP': ['0xA2280558B5ae7a64d3eD90E1FFA30E9c7B918D64', 18],
      'NOBLES-BUSD-CAKE-LP': ['0x56bbD88e096c00Aef3642F441eD1D7c9cfFC174e', 18],
    },
    // TODO: Change launch dates
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  PEONSBDOPool: {
    pid: 0,
    name: 'Earn PEONS with BDO',
    contract: 'PioneerPeonRewardPool',
    depositTokenName: 'BDO',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 3,
  },
  PEONSMDOPool: {
    pid: 1,
    name: 'Earn PEONS with MDO',
    contract: 'PioneerPeonRewardPool',
    depositTokenName: 'MDO',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 5,
  },
  PEONSSOUPPool: {
    pid: 2,
    name: 'Earn PEONS with SOUP',
    contract: 'PioneerPeonRewardPool',
    depositTokenName: 'SOUP',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 4,
  },
  PEONSUSDTPool: {
    pid: 3,
    name: 'Earn PEONS with USDT',
    contract: 'PioneerPeonRewardPool',
    depositTokenName: 'USDT',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 7,
  },
  PEONSBUSDPool: {
    pid: 4,
    name: 'Earn PEONS with BUSD',
    contract: 'PioneerPeonRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 6,
  },
  PEONSBNBTokenSharePool: {
    pid: 5,
    name: 'PEONS-BNB-LP',
    contract: 'PeonRewardPool',
    depositTokenName: 'PEONS-BNB-CAKE-LP',
    earnTokenName: 'PEONS',
    finished: false,
    sort: 1,
  },
  // TODO: Add Peons BUSD pair which EARNS NOBLES
};

export default configurations[process.env.NODE_ENV || 'development'];
