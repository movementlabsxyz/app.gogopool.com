import { Button } from '@chakra-ui/react'
import { BiAbacus } from 'react-icons/bi'

export default function DapplingCard() {
  return (
    <section className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-[#EAECFB] p-7">
      <div className="flex basis-[480px] flex-col">
        <div className="flex items-center gap-2 text-sm font-bold">
          <BiAbacus color="#3E33BB" size={24} />
          <span>Interested in comparing costs?</span>
        </div>
        <div className="gap-4 pt-2">
          <span className="flex text-sm">
            Our friends at Dappling Network have created a fun calculator for you to use and
            generate results based on your customization.
          </span>
        </div>
      </div>

      <a href="https://gogopool.dappling.network/calculator" target={'blank'}>
        <Button size={'sm'} variant={'secondary-outline'}>
          Try the Dappling Calculator
        </Button>
      </a>
    </section>
  )
}
