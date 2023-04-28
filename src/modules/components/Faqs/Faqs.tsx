import { FunctionComponent } from 'react'

import { Accordion, AccordionItem, Link, Text } from '@chakra-ui/react'
import contact from 'src/common/components/crisp/contact'

import { FaqsItem } from './FaqsItem'

import { Card, Content, Title } from '@/common/components/Card'

const faqsData = [
  {
    label: 'What is Avalanche?',
    content: (
      <>
        <Text>
          Avalanche is a new blockchain created by Ava Labs, and solves the{' '}
          <a href="https://medium.com/certik/the-blockchain-trilemma-decentralized-scalable-and-secure-e9d8c41a87b3">
            <span className="font-jost text-blue-500">Trilemma. </span>
          </a>{' '}
          It is:
        </Text>
        <br />
        <Text as="div">
          <ol>
            <li>1. Secure</li>
            <li>2. Decentralized</li>
            <li>3. Fast</li>
          </ol>
        </Text>
        <br />
        <Text>
          If Bitcoin and Ethereum are L1s, Avalanche is an L0 and an L1. Any L1 can be created on
          top of Avalanche, inheriting the platform’s properties and allowing builders to focus on
          customizing the L1 to their own purposes.
        </Text>
      </>
    ),
  },
  {
    label: 'What is a subnet?',
    content: (
      <>
        <a href="https://twitter.com/das_connor/status/1456592161420587017">
          <span className="font-jost text-blue-500">Tweet storm on Subnets</span>
        </a>
        <br />
        <br />
        <Text>
          Subnets are Avalanche’s secret weapon. They allow anyone to create a new L1, which can
          also operate as an L2.
        </Text>
        <br />
        <Text>
          Subnets are mega cool because they represent everything we know about scaling blockchains
          in one interoperable package — imagine a network of blockchains that are small enough to
          be fast, but all assets on one blockchain is compatible with every other blockchain.
        </Text>
        <br />
        <Text>
          Avalanche’s C-Chain is an example of one subnet. It serves as a blockchain that is
          optimized for running smart contract code.
        </Text>
      </>
    ),
  },
  {
    label: 'What is staking?',
    content: (
      <>
        <Text>
          In Proof of Stake blockchains, validator nodes do work to validate the blockchain and in
          return earn staking rewards.
        </Text>
        <br />
        <Text>
          For Avalanche, a staker must set up their hardware to validate the chain and put up a
          minimum of 2000 AVAX as their stake. The AVAX is locked up for the duration of the staking
          window, and accrues rewards. After the staking window (max of 1 year), the AVAX is
          returned as well as any staking rewards they earned.
        </Text>
      </>
    ),
  },
  {
    label: 'What is liquid staking?',
    content: (
      <>
        <Text>Liquid staking is an alternative to locking up a user’s stake!</Text>
        <br />
        <Text>
          It allows anyone to effectively stake any amount of AVAX, and receive instant liquidity
          via a wrapped AVAX token. This wrapped token can be spent like normal AVAX, and can be
          exchanged for normal AVAX at any time.
        </Text>
      </>
    ),
  },
  {
    label: 'How is GoGoPool different from Lido?',
    content: (
      <>
        <Text>There are a few differences.</Text>
        <br />
        <Text as="div">
          <ol>
            <li>1. Lido is a (very successful) liquid staking protocol</li>
            <li>2. Lido centralizes their hardware providers</li>
            <li>
              3. A Lido-like staking protocol only provides liquidity to stakers, and does not help
              bring about the promised future of subnets
            </li>
          </ol>
        </Text>
        <br />
        <Text>In contrast, GoGoPool:</Text>
        <br />
        <Text as="div">
          <ol>
            <li>1. Is a decentralized staking protocol</li>
            <li>2. Decentralizes hardware operators via community rewards</li>
            <li>
              3. Allow subnets to join the pool, incentivizing hardware operators to validate the
              subnet
            </li>
          </ol>
        </Text>
        <br />
        <Text>
          Avalanche has a big liquid staking problem (60% of AVAX is currently locked up in staking
          windows), but an even bigger subnet problem (only 17 subnets in production).
        </Text>
        <br />
        <Text>
          Lido solves the first problem, but we are doing the hard thing and making a protocol that
          solves both.
        </Text>
      </>
    ),
  },
]

export const Faqs: FunctionComponent = () => {
  return (
    <Card outer>
      <Title>FAQs</Title>
      <Content>
        <Accordion allowMultiple>
          {faqsData.map(({ content, label }) => (
            <FaqsItem content={content} key={label} label={label} />
          ))}
          <AccordionItem>
            <Link onClick={contact}>
              Still have questions? Connect with our team through our chatbox!
            </Link>
          </AccordionItem>
        </Accordion>
      </Content>
    </Card>
  )
}
