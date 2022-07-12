import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, ReactElement } from "react";

import { Card } from "@/common/components/Card";
import { MinusIcon } from "@/common/components/CustomIcon/MinusIcon";
import { PlusIcon } from "@/common/components/CustomIcon/PlusIcon";

interface Props {
  label: string;
  content: ReactElement;
}

export const FaqsItem: FunctionComponent<Props> = ({ label, content }) => {
  return (
    <AccordionItem mb="4" _last={{ mb: "0" }}>
      {({ isExpanded }) => (
        <Card
          borderWidth="1px"
          borderColor={isExpanded ? "blue.500" : "grey.200"}
          rounded="lg"
          p="0"
        >
          <AccordionButton>
            <Text size="md" fontWeight="bold" flex="1" textAlign="left">
              {label}
            </Text>
            {isExpanded ? (
              <MinusIcon fontSize="12px" />
            ) : (
              <PlusIcon fontSize="12px" />
            )}
          </AccordionButton>
          <AccordionPanel p="0rem 1rem 1rem 1rem">{content}</AccordionPanel>
        </Card>
      )}
    </AccordionItem>
  );
};
