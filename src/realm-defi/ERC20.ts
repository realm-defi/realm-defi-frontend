import { BigNumber, Contract } from 'ethers';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import { TransactionResponse } from '@ethersproject/providers';
import { formatUnits } from 'ethers/lib/utils';

class ERC20 {
  private contract: Contract;

  address: string;
  symbol: string;
  decimal: number;

  constructor(address: string, provider: Signer | Provider, symbol: string, decimal = 18) {
    this.contract = new Contract(address, ABI, provider);
    this.address = address;
    this.symbol = symbol;
    this.decimal = decimal;
  }

  connect(signerOrProvider: Signer | Provider) {
    this.contract = new Contract(this.address, ABI, signerOrProvider);
  }

  get estimateGas() {
    return this.contract.estimateGas;
  }

  totalSupply(): Promise<BigNumber> {
    return this.contract.totalSupply();
  }

  balanceOf(account: string): Promise<BigNumber> {
    return this.contract.balanceOf(account);
  }

  transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.transfer(recipient, amount);
  }

  allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender);
  }

  approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.approve(spender, amount);
  }

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<TransactionResponse> {
    return this.contract.transferFro(sender, recipient, amount);
  }

  async displayedBalanceOf(account: string): Promise<string> {
    const balance = await this.balanceOf(account);
    return formatUnits(balance, this.decimal);
  }

  async displayedTotalSupply(): Promise<string> {
    const supply = await this.totalSupply();
    return Number(formatUnits(supply, this.decimal)).toFixed(0);
  }
}

export default ERC20;

export const ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];
