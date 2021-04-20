import ERC20 from './ERC20';

export type ContractName = string;
export interface Address {
  31337?: string
  97?: string
  56: string
}
export interface BankInfo {
  pid: number;
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
}

export interface Bank extends  BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type TokenStat = {
  priceInBusd: string;
  totalSupply: string;
};

export type TreasuryAllocationTime = {
  prevAllocation: Date;
  nextAllocation: Date;
}
