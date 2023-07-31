import { Divider, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { IoWalletSharp } from 'react-icons/io5'
import { TbBrandDiscordFilled, TbBrandTwitterFilled, TbMailFilled } from 'react-icons/tb'

import CircleButton from '../Button/CircleButton'

export default function HelpButton() {
  return (
    <Menu>
      <MenuButton>
        <CircleButton content="?" />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<TbMailFilled color="#0D0959" />}>
          <span className="text-sm font-bold text-blue-900">Email Support</span>
        </MenuItem>
        <Divider />
        <MenuItem icon={<TbBrandDiscordFilled color="#0D0959" />}>
          <span className="text-sm font-bold text-blue-900">Discord</span>
        </MenuItem>
        <Divider />
        <MenuItem icon={<TbBrandTwitterFilled color="#0D0959" />}>
          <span className="text-sm font-bold text-blue-900">Twitter</span>
        </MenuItem>
        <Divider />
        <MenuItem icon={<IoWalletSharp color="#6B61D6" />}>
          <span className="text-sm font-bold text-blue-900">Add GGP to Wallet</span>
        </MenuItem>
        <Divider />
        <MenuItem icon={<IoWalletSharp color="#FF2A29" />}>
          <span className="text-sm font-bold text-blue-900">Add ggAVAX to Wallet</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
