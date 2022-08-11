import { images } from "@/assets/images";
import { WizardData } from "@/types/wizard";

export const wizardSteps: WizardData[] = [
  {
    step: 1,
    header: "Register Node",
    title: "Register a node",
    description:
      "Once you have AVAX and GGP in your wallet, you can register your node with the GoGoPool network.",
    image: images.wizardStep1,
    size: {
      width: 211,
      height: 213,
    },
  },
  {
    step: 2,
    header: "Stake GGP",
    title: "Approve and Stake your GGP",
    image: images.wizardStep2,
    size: {
      width: 211,
      height: 213,
    },
  },
  {
    step: 3,
    header: "Deposit AVAX",
    title: "Deposit AVAX",
    description:
      "Create your minipool by depositing 1000 AVAX. GoGoPool will match your funds, and register you as a new validator node.",
    image: images.wizardStep3,
    size: {
      width: 183,
      height: 164,
    },
  },
  {
    step: 4,
    header: "Success!",
    title: "Success!",
    description: "You've setup your node with GoGoPool.",
    image: images.wizardStep4,
    size: {
      width: 211,
      height: 213,
    },
  },
];
