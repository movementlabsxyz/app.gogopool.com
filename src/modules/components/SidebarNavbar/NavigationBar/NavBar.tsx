import Image from 'next/image'
import NextLink from 'next/link'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { TbVectorBezierCircle } from 'react-icons/tb'

import { NavbarItemTitle } from '../SidebarNavbar'
import NavItem from './NavItem'

import gogoPoolTitle from '/public/assets/img/nav/logo-dark-purple.svg'

import ConnectButton from '@/common/components/ConnectButton'
import GGAvaxTokenIcon from '@/common/components/CustomIcon/GGAvaxTokenIcon'
import GoGoPassIcon from '@/common/components/CustomIcon/GoGoPassIcon'
import HelpButton from '@/common/components/HelpButton/HelpButton'

type Props = {
  navbarTitle: NavbarItemTitle
  setNavbarTitle: (n: NavbarItemTitle) => void
  setSidebarOpen: (b: boolean) => void
}

export const NavBar = ({ navbarTitle, setNavbarTitle, setSidebarOpen }: Props) => {
  return (
    <>
      <button
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3BottomLeft aria-hidden="true" className="h-6 w-6" />
      </button>

      <div className="flex flex-1 justify-between pr-4">
        <div className="flex">
          <div className="hidden w-64 shrink-0 items-center px-4 sm:flex">
            <NextLink href="/" onClick={() => setNavbarTitle('VALIDATE')}>
              <Image alt="white logo" src={gogoPoolTitle} width={152} />
            </NextLink>
          </div>
          <div className="hidden items-center gap-10 px-4 font-bold text-blue-900 sm:flex">
            <NavItem
              href="/"
              icon={
                <TbVectorBezierCircle
                  color={navbarTitle === 'VALIDATE' ? '#6255F1' : '#0D0959'}
                  size={24}
                />
              }
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="VALIDATE"
            />
            <NavItem
              href="/liquid-staking"
              icon={
                <GGAvaxTokenIcon fill={navbarTitle === 'LIQUID STAKE' ? '#6255F1' : '#0D0959'} />
              }
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="LIQUID STAKE"
            />
            <a className="flex cursor-default select-none space-x-2" href="#">
              <GoGoPassIcon />
              <span className="uppercase">GoGoPass</span>

              <span className="flex items-center truncate rounded-full bg-[#B7AFF8] px-2 text-xs text-white">
                Coming Soon
              </span>
            </a>
            {/* <NavItem
              href="/#"
              icon={<GoGoPassIcon fill={navbarTitle === 'GOGO PASS' ? '#6255F1' : '#0D0959'} />}
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="GOGO PASS"
            /> */}
            {/* Commented this out for now until GoGoPass is ready */}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="ml-4 flex items-center sm:ml-6">
            <ConnectButton />
          </div>
          <div className="flex items-center">
            <HelpButton />
          </div>
        </div>
      </div>
    </>
  )
}
