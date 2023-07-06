# Connect with the backend

## Redux

We used `next-redux-wrapper` to support SSR of the Redux and `@reduxjs/toolkit` for the Redux library.

### Documentation

- [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- NOTE: Currently not used, this needs to be set up later, if needed.

## Backend hooks

This hook gives access to the local browser wallet (for now only MetaMask is supported). There are 
seven returned objects that can be accessed like so:

### useWallet

This hook gives access to the local browser wallet (for now only MetaMask is supported). There are 
seven returned objects that can be accessed like so:

```javascript
// calling at the start of a component or page
const { account, activate, deactivate, provider, chainId, chainName, error } = useWallet();
```

- `account` - string of the user's address.
- `activate` - async void function with no parameters that attempts to activate the browser wallet. 
Check `error` for errors on activation.
- `deactivate` - async void function with no parameters that deactivates the browser wallet if active. 
Otherwise does nothing.
- `provider` - if `activate` is successful, the EthersJS provider.
- `chainId` - chain ID of the currently selected network. Should be `43113` for Avalanche fuji testnet 
and `43114` for Avalanche mainnet.
- `chainName` - chain name of the currently selected network. Does not work on Avalanche network.
- `error` - the returned error as a string.

### useDeposit(provider)

Allows access to the `send` function, used for depositing AVAX to the GGP network for liquid staking, 
as well as its returned response, error, and if it was a successful deposit or not.

[ `useWallet` ](#useWallet) should be called before this, and the returned provider should be passed into `useDeposit` .

```javascript
// calling at the start of a component or page
const {
  send,
  // renamed for clarity.
  error: depositError,
  response: depositResponse,
  success: depositSuccess,
} = useDeposit(provider);
```

- `send` - async void function. Takes the amount of AVAX to send as a `number` in AVAX units.
- `error` - if the deposit fails, the error as a string.
- `response` - the returned response of the function call.
- `success` - boolean. If the call was successful, returns `true`.

### useCreateMinipool(provider)

This hook gives access to the `approve` and `createMinipool` functions. The `approve` function approves 
the GGP Bond token for withdrawal from the user's account when calling `createMinipool` . The `createMinipool` 
function begins minipool creation process on the backend for node operators.

[ `useWallet` ](#useWallet) should be called before this, and the returned provider should be passed 
into `useCreateMinipool` .

```javascript
// calling at the start of a component or page
const {
  createMinipool,
  approve,
  // renamed for Clarity
  error: minipoolError,
  response: minipoolResponse,
  success: minipoolSuccess,
  approveResponse: minipoolApproveResponse,
} = useCreateMinipool(provider);
```

- `createMinipool` - async void function. Takes the nodeID as a string, and the duration, delegation fee, the node operator GGP Bond amount, and the AVAX node operator deposit amount as EtherJS [`BigNumber`](https://docs.ethers.io/v5/api/utils/bignumber/) as parameters. Starts the process of creating a GGP Node.
- `approve` - async void function. Takes the node operator GGP Bond amount as an EthersJS BigNumber as a parameter. Approves the `createMinipool` function to withdraw the specified number of GGP Bond tokens from the user's account.
- `error` - if the minipool creation call fails, the error as a string.
- `response` - the returned response of the function call.
- `success` - If the call was successful, returns `true`. Boolean.
- `approveResponse` - the response of the `approve` function call. String.
