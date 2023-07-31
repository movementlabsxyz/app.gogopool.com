import { ReactNode } from 'react'

import NextLink from 'next/link'

import { NavbarItemTitle } from '../SidebarNavbar'

type Props = {
  href: string
  icon: ReactNode
  navbarTitle: NavbarItemTitle
  setNavbarTitle: (n: NavbarItemTitle) => void
  title: NavbarItemTitle
}
export default function NavItem({ href, icon, navbarTitle, setNavbarTitle, title }: Props) {
  return (
    <NextLink
      className={`flex h-full cursor-pointer items-center justify-center gap-2 
          ${
            navbarTitle === title ? 'border-b-4 border-[#6255F1] text-[#6255F1] ' : 'text-blue-900'
          }`}
      href={href}
      onClick={() => setNavbarTitle(title)}
    >
      {icon}
      {title}
    </NextLink>
  )
}
