import { Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'

import balloonMenu from '/public/assets/img/large_assets/balloon-menu.png'

import { SideItem } from '../SidebarNavbar'
import SidebarItem from './SidebarItem'

type Props = {
  sidebarItems: SideItem[]
}

export default function DesktopSidebar({ sidebarItems }: Props) {
  return (
    <div className="relative hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col overflow-y-auto bg-indigo-700 pt-11">
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1">
            {sidebarItems.map((item) => (
              <span key={item.name}>
                <SidebarItem item={item} />
              </span>
            ))}
          </nav>
        </div>
        <div className="z-10" style={{ padding: '1rem' }}>
          <motion.button
            style={{ width: '100%' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <NextLink
              className="mb-3 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
              href="https://www.gogopool.com"
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '0.8rem',
                padding: '0.5rem 1rem',
                border: '2px solid #fff',
                width: '100%',
              }}
            >
              Back to site
            </NextLink>
          </motion.button>
          <motion.button
            style={{ width: '100%' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <NextLink
              className="flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
              href="https://docs.gogopool.com"
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '0.8rem',
                padding: '0.5rem 1rem',
                border: '2px solid #fff',
              }}
            >
              View Documentation
            </NextLink>
          </motion.button>
        </div>
        <div className="absolute bottom-0 z-0 p-4">
          <Flex justifyContent="center" marginBottom={8}>
            <Image alt="balloon menu" height={238} src={balloonMenu} width={210} />
          </Flex>
        </div>
      </div>
    </div>
  )
}
