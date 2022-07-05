import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

import { Accordion } from "@/common/components/Accordion";

import { colors } from "./colors";
import { Heading } from "./components/heading";
import { Text } from "./components/text";
import { config } from "./config";

const theme = extendTheme(
  {
    components: {
      Accordion,
      Heading,
      Text,
    },
    colors,
    config,
  },
  withProse()
);

export default theme;
