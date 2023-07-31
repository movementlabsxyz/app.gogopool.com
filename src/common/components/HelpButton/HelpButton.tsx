import { Divider, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { IoChatboxSharp, IoWalletSharp } from 'react-icons/io5'
import { TbBrandDiscordFilled, TbBrandTwitterFilled } from 'react-icons/tb'

import CircleButton from '../Button/CircleButton'
import contact from '../crisp/contact'

import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import useTokenggAVAXContract from '@/hooks/contracts/tokenggAVAX'
import { HexString } from '@/types/cryptoGenerics'
import addToken from '@/utils/addToken'

export default function HelpButton() {
  const toast = useToast()
  const { address: ggpAddress } = useTokenGGPContract()
  const { address: ggAvaxAddress } = useTokenggAVAXContract()

  const handleAddToken = (address: HexString, tokenName: 'GGP' | 'ggAVAX') => {
    addToken(address, tokenName)
      .then(() => {
        toast({
          title: 'Success',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          position: 'top',
          title: 'Error',
          description: 'Could not add token to wallet.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <Menu>
      <MenuButton>
        <CircleButton content="?" />
      </MenuButton>
      <MenuList>
        <Link href="https://discord.gg/4fNtjkyuNw" target="_blank">
          <MenuItem icon={<TbBrandDiscordFilled color="#0D0959" />}>
            <span className="text-sm font-bold text-blue-900">Discord</span>
          </MenuItem>
        </Link>
        <Divider />
        <Link href="https://twitter.com/gogopool_" target="_blank">
          <MenuItem icon={<TbBrandTwitterFilled color="#0D0959" />}>
            <span className="text-sm font-bold text-blue-900">Twitter</span>
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem icon={<IoChatboxSharp color="#0D0959" />} onClick={contact}>
          <span className="text-sm font-bold text-blue-900">Chat Support</span>
        </MenuItem>
        <Divider />
        <MenuItem
          icon={<IoWalletSharp color="#6B61D6" />}
          onClick={() => handleAddToken(ggpAddress, 'GGP')}
        >
          <span className="text-sm font-bold text-blue-900">Add GGP to Wallet</span>
        </MenuItem>
        <Divider />
        <MenuItem
          icon={<IoWalletSharp color="#FF2A29" />}
          onClick={() => handleAddToken(ggAvaxAddress, 'ggAVAX')}
        >
          <span className="text-sm font-bold text-blue-900">Add ggAVAX to Wallet</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
