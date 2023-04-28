import { Box, Link, Text } from '@chakra-ui/react'
import { Center, Divider } from '@mantine/core'
import { IconMail } from '@tabler/icons'

import { Button } from '@/common/components/Button'
import { Card } from '@/common/components/Card'
import { Container } from '@/common/components/Container'
import { PageHead } from '@/common/components/PageHead'
import { SidebarLayout } from '@/common/components/SidebarLayout'
import { AddGGP, AddggAVAX } from '@/modules/components/AddToken'
import LearningSvg from '@/modules/components/LearningSvg'
import LiquidStakingSvg from '@/modules/components/LiquidStakingSvg'
import WelcomeImage from '@/modules/components/WelcomeImage'

const Welcome = () => {
  return (
    <Box className="bg-[#F7F9FF] py-24" minH="full">
      <PageHead append={false} description="Welcome to the Alpha!" name="Welcome to the Alpha!" />
      <Container className="space-y-10">
        <div
          className="relative flex items-center justify-between"
          style={{
            background: 'linear-gradient(99.86deg, #473CC7 31.28%, #9969FF 110.36%)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          <div
            className="pl-8 text-white"
            style={{
              width: 630,
            }}
          >
            <Text className="font-domaine" fontSize={48} fontWeight="bold">
              Welcome to GoGoPool!
            </Text>
            <Text fontSize={16} fontWeight={400}>
              The GoGos are over the moon to help you venture into the wonderful world of subnets.
              We have all the tools you need below! So grab your goggles and hop on board -
              let&apos;s soar to new heights together!
            </Text>
          </div>

          <WelcomeImage />
        </div>

        <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0 md:space-x-2">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <AddGGP size="xs" variant="secondary-outline" />
            <AddggAVAX size="xs" variant="secondary-outline" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div>
            <Text
              className="flex items-center space-x-2 font-domaine"
              fontSize={20}
              fontWeight="bold"
            >
              <svg
                fill="none"
                height="31"
                viewBox="0 0 35 31"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.81708C1 4.93592 1.57669 4.15858 2.41999 3.90303L12 1V26.6667L3.58002 29.2182C2.29565 29.6074 1 28.6462 1 27.3041V5.81708Z"
                  fill="#F4F0FD"
                  stroke="#3E33BB"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M24 4.33333L31.3675 1.87749C32.6626 1.4458 34 2.40974 34 3.77485V25.2251C34 26.086 33.4491 26.8503 32.6325 27.1225L24 30V4.33333Z"
                  fill="#F4F0FD"
                  stroke="#3E33BB"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M24 4.33333L12 1V26.6667L24 30V4.33333Z"
                  fill="#F4F0FD"
                  stroke="#3E33BB"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Subnet Roadmap</span>
            </Text>
            <Text className="my-4" fontSize={14} style={{ maxWidth: '500px' }}>
              Subnets are the perfect tool to take your Web3 adventure to new heights! The GoGos are
              here to guide you through the skies, whether you&rsquo;re a seasoned adventurer or a
              first-time flyer. Connect with a friendly face from the GGP team today, and
              let&rsquo;s make subnets easy together!
            </Text>
          </div>

          <Link href="https://forms.gle/iP334kmTuqBKThDL8" target="_blank">
            <Button size="xs" variant="secondary-outline">
              Fill out our contact form...
            </Button>
          </Link>
        </div>

        <Divider />

        <Center className="flex flex-col">
          <Text className="font-jost uppercase" color="#E07138" fontSize={14} fontWeight="bold">
            want to know more?
          </Text>
          <Text
            className="flex items-center space-x-2 font-domaine"
            fontSize={24}
            fontWeight="bold"
          >
            Learning guides & documentation
          </Text>
        </Center>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
          <Card className="!px-24 !pb-12">
            <Center className="flex flex-col items-center space-y-4 text-center">
              <div className="mt-6 flex h-32 items-end">
                <LiquidStakingSvg />
              </div>
              <Text className="!mt-2 font-domaine" fontSize={20} fontWeight="bold">
                Liquid staking
              </Text>
              <Text className="!mt-1" fontSize={18}>
                Learn how to liquid stake and what you need to get started today!
              </Text>
              <Link
                href="https://docs.gogopool.com/readme/staking-with-gogopool/liquid-staking"
                target="_blank"
              >
                <Button size="xs" variant="secondary-outline">
                  Liquid staking
                </Button>
              </Link>
            </Center>
          </Card>
          <Card className="!px-24 !pb-12">
            <Center className="flex flex-col items-center space-y-4 text-center">
              <LearningSvg className="mt-6 h-32" />
              <Text className="!mt-2 font-domaine" fontSize={20} fontWeight="bold">
                Learning the Nodes
              </Text>
              <Text className="!mt-1" fontSize={18}>
                Want to pilot your own balloon? Become a node operator! We&rsquo;ve got the tools to
                make it easy.
              </Text>
              <Link
                href="https://docs.gogopool.com/readme/staking-with-gogopool/running-a-gogopool-node/registering-a-gogopool-node"
                target="_blank"
              >
                <Button size="xs" variant="secondary-outline">
                  Node Operator Guide
                </Button>
              </Link>
            </Center>
          </Card>
        </div>

        <Card className="!px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div>
              <Text className="font-domaine" fontSize={20} fontWeight="bold">
                Need Help?
              </Text>
              <Text className="max-w-xl">
                Don&rsquo;t get lost in the clouds! Our team members are happy to help! Book a time
                with us to get started.
              </Text>
            </div>

            <Link href="https://twitter.com/GoGoPool_" target="_blank">
              <Button size="xs" variant="secondary-outline">
                <IconMail />
                Book time with us
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </Box>
  )
}

Welcome.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Welcome
