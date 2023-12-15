import { extendTheme } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { Accordion } from './components/accordion'
import { Button } from './components/button'
import { Card } from './components/card'
import { Drawer } from './components/drawer'
import { Heading } from './components/heading'
import { Link } from './components/link'
import { Modal } from './components/modal'
import { Table } from './components/table'
import { Text } from './components/text'
import { config } from './config'
import { fonts } from './fonts'

const theme = extendTheme(
  {
    components: {
      Accordion,
      Heading,
      Text,
      Button,
      Link,
      Card,
      Modal,
      Drawer,
      Table,
    },
    fonts,
    colors,
    config,
    breakpoints,
  },
  withProse(),
)

export default theme
