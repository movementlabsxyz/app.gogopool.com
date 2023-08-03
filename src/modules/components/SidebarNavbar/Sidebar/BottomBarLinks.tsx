import NextLink from 'next/link'

export default function BottomBarLinks() {
  return (
    <>
      <NextLink
        className="mb-3 flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
        href="https://dash.gogopool.com"
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: '0.8rem',
          padding: '0.5rem 1rem',
          border: '2px solid #fff',
        }}
        target={'_blank'}
      >
        Global Protocol Stats
      </NextLink>
      <NextLink
        className="flex w-full items-center justify-center rounded-full p-1 focus:ring-2 focus:ring-inset focus:ring-white"
        href="https://panopticon.fly.dev/home"
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: '0.8rem',
          padding: '0.5rem 1rem',
          border: '2px solid #fff',
        }}
        target={'_blank'}
      >
        All Minipool Stats
      </NextLink>
    </>
  )
}
