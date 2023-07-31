import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Button } from '@/common/components/Button'
import { useAutoConnect } from '@/config/autoconnect'

export const CB = () => {
  useAutoConnect()
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button onClick={openConnectModal} variant="secondary-filled">
                    Connect Wallet
                  </Button>
                )
              }

              if (chain?.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="destructive-outline">
                    Wrong network
                  </Button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    variant="secondary-outline"
                  >
                    {chain.hasIcon && (
                      <div
                        className="flex w-6 justify-center rounded-full"
                        style={{
                          background: chain.iconBackground,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} width={20} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <span className="hidden sm:flex">
                    <Button onClick={openAccountModal} variant="secondary-outline">
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </Button>
                  </span>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CB
