import { formatEther } from 'ethers/lib/utils.js'

import { WizardData } from '@/types/wizard'

import step1pic from '/public/assets/img/wizard/step-1.png'
import step2pic from '/public/assets/img/wizard/step-2.svg'
import step3pic from '/public/assets/img/wizard/step-3.svg'
import step4pic from '/public/assets/img/wizard/step-4.svg'

export const wizardSteps: ({ defaultAvax }: { defaultAvax: any }) => WizardData[] = ({
  defaultAvax,
}) => {
  return [
    {
      step: 1,
      header: 'Register Node',
      title: 'Register a node',
      description:
        'Once you have AVAX and GGP in your wallet, you can register your node with the GoGoPool network.',
      image: step1pic,
      size: {
        width: 160,
        height: 186,
      },
    },
    {
      step: 2,
      header: 'Stake GGP',
      title: 'Match AVAX by Staking GGP',
      image: step2pic,
      size: {
        width: 101,
        height: 103,
      },
    },
    {
      step: 3,
      header: 'Deposit AVAX',
      title: 'Deposit AVAX',
      description: `Create your minipool by depositing ${Number(formatEther(defaultAvax)).toFixed(
        2,
      )} AVAX. GoGoPool will match your funds, and register you as a new validator node.`,
      image: step3pic,
      size: {
        width: 103,
        height: 84,
      },
    },
    {
      step: 4,
      header: 'Success!',
      title: 'Success!',
      description: "You've setup your node with GoGoPool.",
      image: step4pic,
      size: {
        width: 251,
        height: 253,
      },
    },
  ]
}
