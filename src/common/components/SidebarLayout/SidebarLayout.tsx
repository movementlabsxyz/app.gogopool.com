import { Fragment, useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'

import ConnectButton from '../ConnectButton'
import RouteGuard from '../RouteGuard'

import { NavigationBar } from '@/modules/components/NavigationBar'

const navigation = [
  {
    name: 'Welcome',
    href: '/welcome',
    icon: (
      <svg
        className="mr-3"
        fill="none"
        height="22"
        viewBox="0 0 22 22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M11 2C6.02914 2 2 6.0283 2 11C2 15.9698 6.0294 20 11 20C15.9706 20 20 15.9698 20 11C20 6.0283 15.9709 2 11 2ZM11 0C4.9247 5.3112e-07 -5.31216e-07 4.9236 0 11C5.31023e-07 17.0742 4.9247 22 11 22C17.0753 22 22 17.0742 22 11C22 4.9236 17.0753 -5.31119e-07 11 0Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M15.1269 7.53778C15.2639 7.12693 14.873 6.73606 14.4622 6.87301L9.2688 8.60414C8.95494 8.70876 8.70865 8.95504 8.60403 9.2689L6.87291 14.4623C6.73596 14.8731 7.12683 15.264 7.53767 15.127L12.731 13.3959C13.0449 13.2913 13.2912 13.045 13.3958 12.7311L15.1269 7.53778ZM10.2567 11.7432C10.6672 12.1537 11.3327 12.1537 11.7432 11.7432C12.1537 11.3328 12.1537 10.6672 11.7432 10.2568C11.3327 9.84629 10.6672 9.84629 10.2567 10.2568C9.84625 10.6672 9.84625 11.3328 10.2567 11.7432Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg
        className="mr-3"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 20L4 4"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M21 20L21 7"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M15 20L15 9"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M10 20L10 12"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
  {
    name: 'Liquid Stake',
    href: '/liquid-staking',
    icon: (
      <svg
        className="mr-3"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 6L17 20"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M21 16L17 20L13 16"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M7 18L7 4"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3 8L7 4L11 8"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: 'Node Operator',
    href: '/create-minipool',
    icon: (
      <svg
        className="mr-3"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="4" r="3" stroke="white" strokeWidth="2" />
        <circle cx="20" cy="12" r="3" stroke="white" strokeWidth="2" />
        <circle cx="4" cy="12" r="3" stroke="white" strokeWidth="2" />
        <path
          d="M15 4.58181C15.9669 4.97233 16.873 5.55952 17.6569 6.34338C18.4974 7.18388 19.1117 8.16488 19.5 9.21077M19.4184 15.0002C19.0279 15.9672 18.4407 16.8732 17.6569 17.6571C16.873 18.4409 15.9669 19.0281 15 19.4187M9 19.4187C8.03307 19.0281 7.12701 18.4409 6.34315 17.6571C5.55929 16.8732 4.9721 15.9672 4.58158 15.0002M4.58158 9.00022C4.9721 8.03329 5.55929 7.12724 6.34315 6.34338C7.12701 5.55952 8.03307 4.97233 9 4.58181"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="12" cy="20" r="3" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },

  {
    name: 'Docs',
    href: 'https://docs.gogopool.com',
    icon: (
      <svg
        className="mr-3"
        fill="none"
        height="22"
        viewBox="0 0 22 22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M11 2C6.02914 2 2 6.0283 2 11C2 15.9698 6.0294 20 11 20C15.9706 20 20 15.9698 20 11C20 6.0283 15.9709 2 11 2ZM11 0C4.9247 5.3112e-07 -5.31216e-07 4.9236 0 11C5.31023e-07 17.0742 4.9247 22 11 22C17.0753 22 22 17.0742 22 11C22 4.9236 17.0753 -5.31119e-07 11 0Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          d="M11.0085 8C11.5544 8 12 7.55085 12 7C12 6.44914 11.5498 6 10.9971 6C10.4467 6 9.99997 6.44914 9.99997 7C9.99997 7.55085 10.4467 8 11.0085 8Z"
          fill="white"
        />
        <path
          d="M10 11C10 10.4477 10.4477 10 11 10C11.5523 10 12 10.4477 12 11V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V11Z"
          fill="white"
        />
      </svg>
    ),
  },
]

export function SidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-full">
      <RouteGuard />

      <Transition.Root as={Fragment} show={sidebarOpen}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                      type="button"
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex shrink-0 items-center px-4">
                  <NextLink href="/">
                    <Image
                      alt="white logo"
                      height={32}
                      src={'/assets/img/nav/white-logo.svg'}
                      width={118}
                    />
                  </NextLink>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <NextLink
                        className="flex w-full items-center text-base"
                        href={item.href}
                        key={item.name}
                        onClick={() => {
                          setSidebarOpen(false)
                        }}
                      >
                        <span
                          className={clsx(
                            window.location.href.includes(item.href)
                              ? 'bg-indigo-800 text-white'
                              : 'text-indigo-100 hover:bg-indigo-600',
                            'group flex w-full items-center py-4 px-3 text-base font-medium transition-all',
                          )}
                        >
                          <>
                            {item.icon}
                            {item.name}
                          </>
                        </span>
                      </NextLink>
                    ))}
                  </nav>
                </div>
                <div className="flex shrink-0 items-center px-4">
                  <NextLink href="/">
                    <Image
                      alt="white logo"
                      height={32}
                      src={'/assets/img/nav/white-logo.svg'}
                      width={118}
                    />
                  </NextLink>
                </div>
                <div className="z-10" style={{ padding: '1rem' }}>
                  <NextLink
                    className="ring-white-500 mb-3 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
                    href="https://www.gogopool.com"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      padding: '0.5rem 1rem',
                      border: '2px solid #fff',
                    }}
                  >
                    Back to site
                  </NextLink>
                  <NextLink
                    className="ring-white-500 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
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
                </div>
                <div className="flex shrink-0 p-4">
                  <Flex justifyContent="center" marginBottom={8}>
                    <Image
                      alt="balloon menu"
                      height={238}
                      src="/assets/images/balloon_menu.png"
                      width={210}
                    />
                  </Flex>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div aria-hidden="true" className="w-14 shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="relative hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto bg-indigo-700 pt-5">
          <div className="flex shrink-0 items-center px-4">
            <NextLink href="/">
              <Image
                alt="white logo"
                height={32}
                src={'/assets/img/nav/white-logo.svg'}
                width={118}
              />
            </NextLink>
          </div>
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="flex-1">
              {navigation.map((item) => (
                <NextLink className="flex items-center text-base" href={item.href} key={item.name}>
                  <span
                    className={clsx(
                      window.location.href.includes(item.href)
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600',
                      'group flex w-full items-center p-2 py-4 font-medium text-white transition-all duration-300',
                    )}
                  >
                    <>
                      {item.icon}
                      {item.name}
                    </>
                  </span>
                </NextLink>
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
                className="ring-white-500 mb-3 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
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
                className="ring-white-500 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
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
              <Image
                alt="balloon menu"
                height={238}
                src="/assets/images/balloon_menu.png"
                width={210}
              />
            </Flex>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col sm:pl-64">
        <div className="sticky top-0 z-10 flex h-16 shrink-0 bg-white shadow">
          <button
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:hidden"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <NavigationBar />
            </div>
            <div className="ml-4 flex items-center sm:ml-6">
              <ConnectButton />
            </div>
          </div>
        </div>

        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}
