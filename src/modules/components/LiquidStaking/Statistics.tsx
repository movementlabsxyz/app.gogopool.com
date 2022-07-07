import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent, ReactElement } from "react";

interface Props {
  data: { label: ReactElement; value: string }[];
}

export const Statistics: FunctionComponent<Props> = ({ data }) => {
  return (
    <Box gap="0.25rem">
      {data.map(({ label, value }) => (
        <Box display="flex" flexDir="row" justifyContent="space-between">
          <Text size="sm" color="grey.600" display="flex" flexDir="row" alignItems="center">
            {label}
          </Text>
          <Text size="sm" fontWeight="bold">
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
