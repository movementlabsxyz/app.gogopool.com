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
  },
  {
    step: 2,
    header: "Stake GGP",
    title: "Approve and Stake your GGP",
    image: images.wizardStep2,
  },
  {
    step: 3,
    header: "Deposit AVAX",
    title: "Deposit AVAX",
    description:
      "Create your minipool by depositing 1000AVAX. GoGoPool will match your friends, and register you as a new valstepator node.",
    image: images.wizardStep3,
  },
  {
    step: 4,
    header: "Success!",
    title: "Success!",
    description: "You've setup your node with GoGoPool.",
    image: images.wizardStep4,
  },
];
