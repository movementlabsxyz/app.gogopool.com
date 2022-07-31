import { VStack } from "@chakra-ui/react";

import { PageHead } from "@/common/components/PageHead";
import { Faqs } from "@/modules/components/Faqs";
import { LiquidStaking } from "@/modules/components/LiquidStaking";

const Stake = () => {
  return (
    <>
      <div className="absolute -z-50 w-[calc(100vw-15px)] overflow-hidden opacity-30 blur-[280px]">
        <div className="relative left-[-435px] top-[32px] -z-50 h-[1080px] w-[1080px] rounded-full bg-purple-300 " />
        <div className="relative right-[-435px] top-[-304px] -z-50 h-[1080px] w-[1080px] rounded-full bg-purple-300 " />
      </div>
      <div className="h-full p-4 xs:py-[50px]">
        <PageHead
          append={false}
          description="Liquid Staking"
          name="Liquid Staking"
        />
        <VStack spacing="8">
          <LiquidStaking />
          <Faqs />
        </VStack>
      </div>
    </>
  );
};

export default Stake;
