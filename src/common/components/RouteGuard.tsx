import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

export default function RouteGuard() {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (!isConnected && !router.asPath.includes('/login')) {
      router.push('/login')
    } else if (isConnected && router.asPath.includes('/login')) {
      router.push('/welcome')
    }
  }, [isConnected, router])

  return null
}
