import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'
import { BiBarChartAlt, BiBookOpen } from 'react-icons/bi'
import { FaHammer, FaRegCompass } from 'react-icons/fa'
import { LuArrowDownUp } from 'react-icons/lu'
import { TbVectorBezierCircle } from 'react-icons/tb'

import { NavBar } from './NavigationBar/NavBar'
import DesktopSidebar from './Sidebar/DesktopSidebar'
import MobileSidebar from './Sidebar/MobileSidebar'

export type SideItem = {
  name: string
  href: string
  icon: ReactNode
}

export type NavbarItemTitle = 'VALIDATE' | 'LIQUID STAKE' | 'GOGO PASS'

const validateSidebar = [
  {
    name: 'Getting Started',
    href: '/',
    icon: <FaRegCompass color="#fff" size={24} />,
  },
  {
    name: 'Create a Minipool',
    href: '/create-minipool/',
    icon: <TbVectorBezierCircle color="#fff" size={24} />,
  },
  {
    name: 'Minipool Dashboard',
    href: '/dashboard/',
    icon: <BiBarChartAlt color="#fff" size={24} />,
  },
  {
    name: 'Documentation',
    href: 'https://docs.gogopool.com',
    icon: <BiBookOpen color="#fff" size={24} />,
  },
]

const liquidSidebar = [
  {
    name: 'Liquid Stake',
    href: '/liquid-staking/',
    icon: <LuArrowDownUp color="#fff" size={24} />,
  },
]

const gogoSidebar = [
  {
    name: 'GoGo Pass',
    href: '/work-in-progress/',
    icon: <FaHammer color="#fff" size={24} />,
  },
]

const sidebarMap: { [key in NavbarItemTitle]: SideItem[] } = {
  'VALIDATE': validateSidebar,
  'LIQUID STAKE': liquidSidebar,
  'GOGO PASS': gogoSidebar,
}

export function SidebarNavbar({ children }: { children: ReactNode }) {
  const router = useRouter()
  let currentPath: NavbarItemTitle = 'VALIDATE'
  if (router.pathname === '/liquid-staking') {
    currentPath = 'LIQUID STAKE'
  }
  if (router.pathname === '/work-in-progress') {
    currentPath = 'GOGO PASS'
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navbarTitle, setNavbarTitle] = useState<NavbarItemTitle>(currentPath)

  const currentSidebar = sidebarMap[navbarTitle]

  return (
    <div className="h-full">
      <div className="fixed top-0 z-10 flex h-16 w-full shrink-0 bg-white shadow">
        <NavBar
          navbarTitle={navbarTitle}
          setNavbarTitle={setNavbarTitle}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      {/* Dynamic Mobile Sidebar */}
      <MobileSidebar
        gogoSidebar={gogoSidebar}
        liquidSidebar={liquidSidebar}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        validateSidebar={validateSidebar}
      />

      {/* Static Desktop Sidebar */}
      <DesktopSidebar sidebarItems={currentSidebar} />

      {/* Main Page Content */}
      <div className="flex h-full flex-1 flex-col sm:pl-64">
        <main className="h-full pt-16">{children}</main>
      </div>
    </div>
  )
}
