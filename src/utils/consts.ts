import { BigNumber } from 'ethers'

import { parseEther } from 'ethers/lib/utils.js'

export const WEI_VALUE = BigNumber.from(10).pow(18)

// as of 7/13/2023
export const AVAX_VALIDATOR_BASE_APY = parseEther('0.0798')
export const MINIPOOL_BASE_APY = parseEther('0.075')

export const INVESTOR_LIST = [
  '0xFE5200De605AdCB6306F4CDed77f9A8D9FD47127',
  '0x624c4F9E55d2D1158fD5dee555C3bc8110b1E936',
]
export const RETAIL_REWARD_POOL = BigNumber.from('46303215699436471366605')
export const INVESTOR_REWARD_POOL = BigNumber.from('5144801744381830151845')

export const DECODED_ERRORS = {
  '0x402192dc': 'CancellationTooEarly()',
  '0x954e323d': 'CannotWithdrawUnder150CollateralizationRatio()',
  '0x70bc3e85': 'ContractAlreadyRegistered()',
  '0x16639e1e': 'ContractHasNotBeenInitialized()',
  '0xed592624': 'ContractNotFound()',
  '0xab35696f': 'ContractPaused()',
  '0xf8bd6eee': 'DelegationFeeOutOfBounds()',
  '0xe132ddb6': 'DurationOutOfBounds()',
  '0x4b24b05b': 'ExistingContractNotRegistered()',
  '0x76437870': 'IncorrectRewardsDistribution()',
  '0xd7707d46': 'InsufficientAVAXForMinipoolCreation()',
  '0xf4d678b8': 'InsufficientBalance()',
  '0x786e0a99': 'InsufficientContractBalance()',
  '0x9e7fd11b': 'InsufficientGGPCollateralization()',
  '0x0f84197b': 'InvalidAVAXAssignmentRequest()',
  '0x2c5211c6': 'InvalidAmount()',
  '0x6eefed20': 'InvalidContract()',
  '0x38af65f7': 'InvalidEndTime()',
  '0xbb1c982c': 'InvalidGGPPrice()',
  '0xa5ccf754': 'InvalidGuardianConfirmation()',
  '0xc2bd5707': 'InvalidMultisigAddress()',
  '0x25a2b7eb': 'InvalidNetworkContract()',
  '0x6490ffd3': 'InvalidNodeID()',
  '0x3ddd2bb6': 'InvalidOrOutdatedContract()',
  '0xb4f302f8': 'InvalidRewardsStartTime()',
  '0x98d207b4': 'InvalidStakingDeposit()',
  '0xb290253c': 'InvalidStartTime()',
  '0x8f9a780c': 'InvalidStateTransition()',
  '0xb7d09497': 'InvalidTimestamp()',
  '0xc1ab6dc1': 'InvalidToken()',
  '0xa948c7b3': 'MaximumTokensReached()',
  '0xc057e6f0': 'MinipoolDurationExceeded()',
  '0xd2fc63e3': 'MinipoolNotFound()',
  '0xd96b85ee': 'MultisigAlreadyRegistered()',
  '0x5f5ddf20': 'MultisigLimitReached()',
  '0x30e731ac': 'MultisigMustBeEnabled()',
  '0xa58827c8': 'MultisigNotFound()',
  '0x0da3c818': 'MustBeGuardian()',
  '0xd5929075': 'MustBeGuardianOrValidContract()',
  '0x834baa5d': 'MustBeMultisig()',
  '0x5b40943f': 'NegativeCycleDuration()',
  '0x2a7d69c9': 'NoEnabledMultisigFound()',
  '0x73380d99': 'NoRewardsToClaim()',
  '0x3d693ada': 'NotAllowed()',
  '0x5fc483c5': 'OnlyOwner()',
  '0xa99968e6': 'RewardsAlreadyDistributedToStaker()',
  '0xd9229f86': 'RewardsCycleNotStarted()',
  '0xe6215fab': 'StakerNotFound()',
  '0x49f4cf9c': 'SyncError()',
  '0x045c4b02': 'TokenTransferFailed()',
  '0x7d529919': 'UnableToClaim()',
  '0x124f4572': 'UnableToStartRewardsCycle()',
  '0x86f9bd09': 'ValueNotWithinRange()',
  '0xc80f2250': 'VaultTokenWithdrawalFailed()',
  '0xcd4f9922': 'WithdrawAmountTooLarge()',
  '0x32d971dc': 'ZeroAssets()',
  '0x9811e0c7': 'ZeroShares()',
}
