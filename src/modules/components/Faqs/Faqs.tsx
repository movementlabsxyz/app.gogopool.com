import { Accordion } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { FunctionComponent } from "react";

import { Card, Content, Title } from "@/common/components/Card";

import { FaqsItem } from "./FaqsItem";

const faqsData = [
  {
    label: "What is Avalanche?",
    content: (
      <Prose color="grey.600">
        <>
          Avalanche is a new blockchain created by Ava Labs, and solves the
          [Trilemma]
          <a href="https://medium.com/certik/the-blockchain-trilemma-decentralized-scalable-and-secure-e9d8c41a87b3">
            <span className="text-blue-500">
              (https://medium.com/certik/the-blockchain-trilemma-decentralized-scalable-and-secure-e9d8c41a87b3).
            </span>
          </a>
          It is:
        </>
        <ol>
          <li>1. Secure</li>
          <li>2. Decentralized</li>
          <li>3. Fast</li>
        </ol>
        <>
          If Bitcoin and Ethereum are L1s, Avalanche is an L0 and an L1. Any L1
          can be created on top of Avalanche, inheriting the platform’s
          properties and allowing builders to focus on customizing the L1 to
          their own purposes.
        </>
      </Prose>
    ),
  },
  {
    label: "What is staking?",
    content: (
      <Prose color="grey.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Prose>
    ),
  },
  {
    label: "What is liquid staking?",
    content: (
      <Prose color="grey.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Prose>
    ),
  },
  {
    label: "How is GoGoPool different from Lido?",
    content: (
      <Prose color="grey.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Prose>
    ),
  },
  {
    label: "Why doesn't this exist yet?",
    content: (
      <Prose color="grey.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Prose>
    ),
  },
  {
    label: "How did you come up with the idea for GoGoPool?",
    content: (
      <Prose color="grey.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Prose>
    ),
  },
];
export const Faqs: FunctionComponent = () => {
  return (
    <Card>
      <Title>FAQs</Title>
      <Content>
        <Accordion allowToggle allowMultiple>
          {faqsData.map(({ label, content }, index) => (
            <FaqsItem label={label} content={content} key={index} />
          ))}
        </Accordion>
      </Content>
    </Card>
  );
};
