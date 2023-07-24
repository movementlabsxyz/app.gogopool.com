import { Box, Divider, Link, Text } from '@chakra-ui/react'

import { Button } from '@/common/components/Button'
import { Container } from '@/common/components/Container'
import DocumentIcon from '@/common/components/CustomIcon/DocumentIcon'
import { GGPToken } from '@/common/components/CustomIcon/GGPToken'
import WelcomeCard1 from '@/common/components/CustomIcon/WelcomeCard1'
import WelcomeCard2 from '@/common/components/CustomIcon/WelcomeCard2'
import WelcomeCard3 from '@/common/components/CustomIcon/WelcomeCard3'
import WelcomeMountainIcon from '@/common/components/CustomIcon/WelcomeMountainIcon'
import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import InfoCard from '@/modules/components/Welcome/InfoCard'
import WelcomeCard from '@/modules/components/Welcome/WelcomeCard/WelcomeCard'
import WelcomeRewards from '@/modules/components/Welcome/WelcomeRewards/WelcomeRewards'

const Welcome = () => {
  return (
    <Box className="bg-[#F7F9FF] py-24" minH="full">
      <PageHead append={false} description="Welcome to GoGoPool!" name="Welcome to GoGoPool!" />
      <Container>
        <div
          className="relative flex justify-between pt-12"
          style={{
            background: 'linear-gradient(99.86deg, #473CC7 31.28%, #9969FF 110.36%)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          <div
            className="px-8 text-white"
            style={{
              width: 630,
            }}
          >
            <Text className="pb-4 font-domaine" fontSize={40} fontWeight="bold">
              Become a Validator with Minipools
            </Text>
            <Text className="pb-4" fontSize={18} fontWeight={400}>
              AVAX Validators earn more with Minipools through our triple incentive reward
              structure. Whether you are new to Web3 or are a seasoned pioneer, GoGoPool has you
              covered!
            </Text>
            <Divider />
            <div className="flex flex-wrap gap-5 pt-7 pb-8">
              <Link href="/create-minipool">
                <Button variant="tertiary">Create a Minipool</Button>
              </Link>
              <a
                href="https://gogopool.dappling.network/calculator"
                rel="noreferrer"
                target="_blank"
              >
                <Button variant="secondary-filled">ROI Calculator</Button>
              </a>
            </div>
          </div>

          <div className="hidden h-full self-end md:block">
            <WelcomeMountainIcon />
          </div>
        </div>

        <div className="flex flex-col items-center pt-12 text-subtitle">
          <Text className="font-domaine" fontSize={30} fontWeight="bold">
            Quick Start Guide
          </Text>
          <div className="w-3/4 text-center text-default">
            <Text fontSize={18}>
              Minipools are validator nodes funded and initialized by GoGoPool. It is composed of
              funds from the node operator matched with liquid staking deposits.
            </Text>
          </div>
        </div>
        <div className="flex flex-wrap justify-around gap-8 py-12">
          <WelcomeCard
            info={{
              image: <WelcomeCard1 />,
              step: 1,
              summary: (
                <Text>
                  Register a NodeID, stake 100 AVAX worth of GGP, and deposit 1000 AVAX. Learn more
                  about the{' '}
                  <a
                    className="text-blue-500 underline"
                    href="https://docs.gogopool.com/readme-1/as-a-node-operator"
                    target={'blank'}
                  >
                    Minipool creation process here.
                  </a>
                </Text>
              ),
              title: 'Register',
            }}
          />
          <WelcomeCard
            info={{
              image: <WelcomeCard2 />,
              step: 2,
              summary: (
                <Text>
                  After registration, your minipool is placed into queue to be matched with liquid
                  staking funds. You can view your status at{' '}
                  <Link href="https://app.gogopool.com/dashboard">
                    <span className="font-normal text-blue-500 underline">any time here.</span>
                  </Link>
                </Text>
              ),
              title: 'Match',
            }}
          />
          <WelcomeCard
            info={{
              image: <WelcomeCard3 />,
              step: 3,
              summary: (
                <Text>
                  Once launched, you will begin to earn through our{' '}
                  <a
                    className="text-blue-500 underline"
                    href="https://docs.gogopool.com/design/how-minipools-work/ggp-rewards"
                    target={'blank'}
                  >
                    triple incentive rewards structure.
                  </a>
                </Text>
              ),
              title: 'Launch',
            }}
          />
        </div>
        <Divider />
        <div className="flex flex-col items-center py-12">
          <Text className="text-center text-tertiary" fontSize={14} fontWeight="bold">
            EXPLORING AVERAGE ROI IN MINIPOOLS
          </Text>
          <Text className="text-center font-domaine text-subtitle" fontSize={30} fontWeight="bold">
            Understand Your Rewards
          </Text>
          <Text className="text-center text-default">
            PSA: These examples are from past reward cycles. They&apos;re just a guide, not a
            guarantee.
          </Text>
          <WelcomeRewards />
        </div>

        <Divider />

        <div className="flex flex-wrap justify-around gap-10 py-12">
          <InfoCard
            button=<a href="https://docs.gogopool.com/gogopool-primer" target={'blank'}>
              <Button size="xs" variant="secondary-outline">
                Read our Primer
              </Button>
            </a>
            icon=<GGPToken fill={'#3E33BB'} height={32} width={32} />
            summary="We believe in Subnets and making them easy to setup and utilize. Our GGP token is the key to that success."
            title="Our Token Mission"
          />
          <InfoCard
            button=<a href="https://docs.gogopool.com" target={'blank'}>
              <Button size="xs" variant="secondary-outline">
                View Documentation
              </Button>
            </a>
            icon=<DocumentIcon />
            summary="We’ve got you covered! Take a look at our docs to get the most up-to-date info on how to get your Minipool created."
            title="Need more information?"
          />
        </div>

        <Divider />
      </Container>
    </Box>
  )
}

Welcome.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Welcome
