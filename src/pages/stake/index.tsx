import { VStack } from "@chakra-ui/react";

import { PageHead } from "@/common/components/PageHead";
import { Faqs } from "@/modules/components/Faqs";
import { LiquidStaking } from "@/modules/components/LiquidStaking";

const Stake = () => {
  return (
    <div className="h-full p-4 xs:py-[50px]">
      <div className="absolute left-[-435px] top-[32px] -z-50 h-[1080px] w-[1080px] rounded-full bg-purple-300 opacity-30 blur-[280px]" />
      <div className="absolute right-[-435px] top-[-304px] -z-50 h-[1080px] w-[1080px] rounded-full bg-purple-300 opacity-30 blur-[280px]" />
      <PageHead
        append={false}
        description="Home page description"
        name="Home"
      />
      <VStack spacing="8">
        <LiquidStaking />
        <Faqs />
      </VStack>
    </div>
  );
};

export default Stake;
