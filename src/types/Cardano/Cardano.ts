import { AddressType, Address } from '../Wallet';
import { TransactionInput, TransactionOutput } from '../Transaction';

import { ChainSettings } from './ChainSettings';
import { FeeAlgorithm } from './FeeAlgorithm';
import { Transaction } from './Transaction';

export interface Cardano {
  // Create/ Restore wallet (parent account)
  account: (
    mnemonic: string,
    passphrase: string,
    accountIndex: number,
  ) => { privateParentKey: string; publicParentKey: string };

  // Create wallet account (child account of wallet)
  address: (
    args: {
      publicParentKey: string;
      index: number;
      type: AddressType;
      accountIndex: number;
    },
    chainSettings?: ChainSettings,
  ) => Address;

  // Signing message
  signMessage: (args: {
    privateParentKey: string;
    addressType: AddressType;
    signingIndex: number;
    message: string;
  }) => { signature: string; publicKey: string };

  // Verifying message
  verifyMessage: (args: {
    publicKey: string;
    message: string;
    signature: string;
  }) => boolean;

  buildTransaction: (
    inputs: TransactionInput[],
    outputs: TransactionOutput[],
    feeAlgorithm?: FeeAlgorithm,
  ) => Transaction;
}
