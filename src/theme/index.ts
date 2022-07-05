import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

import { Accordion } from "@/common/components/Accordion";

import { colors } from "./colors";
import { Button } from "./components/button";
import { Heading } from "./components/heading";
import { Text } from "./components/text";
import { config } from "./config";
import { fonts } from "./fonts";

const theme = extendTheme(
  {
    components: {
      Accordion,
      Heading,
      Text,
      Button,
    },
    fonts,
    colors,
    config,
  },
  withProse()
);

export default theme;
