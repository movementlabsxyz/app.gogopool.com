import { images } from '@/assets/images'
import { WizardData } from '@/types/wizard'

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
      image: images.wizardStep1,
      size: {
        width: 160,
        height: 186,
      },
    },
    {
      step: 2,
      header: 'Stake GGP',
      title: 'Borrow AVAX by staking GGP',
      image: images.wizardStep2,
      size: {
        width: 101,
        height: 103,
      },
    },
    {
      step: 3,
      header: 'Deposit AVAX',
      title: 'Deposit AVAX',
      description: `Create your minipool by depositing ${defaultAvax} AVAX. GoGoPool will match your funds, and register you as a new validator node.`,
      image: images.wizardStep3,
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
      image: images.wizardStep4,
      size: {
        width: 251,
        height: 253,
      },
    },
  ]
}
