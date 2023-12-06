const OonodzWrapper = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
    name: 'Initialized',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint16', name: 'duration', type: 'uint16' },
      { internalType: 'bool', name: 'bestRate', type: 'bool' },
      { internalType: 'uint16', name: 'countryOfResidence', type: 'uint16' },
    ],
    name: 'findBestRateAndPlan',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'enum Billing.SubscriptionPeriod', name: '', type: 'uint8' },
      { internalType: 'uint16', name: '', type: 'uint16' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_accessControl', type: 'address' },
      { internalType: 'address', name: '_subscriptions', type: 'address' },
      { internalType: 'address', name: '_nodeIdNFT', type: 'address' },
      { internalType: 'address', name: '_billing', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint16', name: 'countryOfResidence', type: 'uint16' },
      { internalType: 'uint16', name: 'duration', type: 'uint16' },
      { internalType: 'bool', name: 'bestRate', type: 'bool' },
      { internalType: 'string', name: 'currencySymbol', type: 'string' },
      { internalType: 'bool', name: 'withdrawalRightWaiver', type: 'bool' },
    ],
    name: 'oneTransactionSubscription',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'customer', type: 'address' },
      { internalType: 'uint16', name: 'countryOfResidence', type: 'uint16' },
      { internalType: 'uint16', name: 'duration', type: 'uint16' },
      { internalType: 'bool', name: 'bestRate', type: 'bool' },
      { internalType: 'string', name: 'currencySymbol', type: 'string' },
      { internalType: 'bool', name: 'withdrawalRightWaiver', type: 'bool' },
    ],
    name: 'oneTransactionSubscription',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_billing', type: 'address' }],
    name: 'setBilling',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_nodeIdNFT', type: 'address' }],
    name: 'setNodeID',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export default OonodzWrapper
