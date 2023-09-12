import clsx from 'clsx'
import NextLink from 'next/link'

import { SideItem } from '../SidebarNavbar'

type Props = {
  item: SideItem
  setSidebarOpen?: (b: boolean) => void
}

export default function SidebarItem({ item, setSidebarOpen }: Props) {
  const isExternalLink = item.href.toLowerCase().includes('http')
  return (
    <NextLink
      className="flex w-full items-center text-base"
      href={item.href}
      key={item.name}
      onClick={setSidebarOpen ? () => setSidebarOpen(false) : undefined}
      target={isExternalLink ? '_blank' : ''}
    >
      <span
        className={clsx(
          window.location.pathname === item.href
            ? 'bg-indigo-800 text-white'
            : 'text-indigo-100 hover:bg-indigo-600',
          'group flex w-full items-center py-5 px-3 text-base font-medium transition-all',
        )}
      >
        <div className="flex gap-2">
          {item.icon}
          {item.name}
        </div>
      </span>
    </NextLink>
  )
}
