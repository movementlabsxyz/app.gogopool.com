import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

export interface ANRNodesResponse {
  available_nodes: string[]
  validators: string[]
  nodes: string[]
}

const useANRNodes = () => {
  const { data: resp, error } = useSWR('https://anr.fly.dev/cgi-bin/nodes', fetcher)

  const data = resp as ANRNodesResponse

  const len = data?.available_nodes?.length || 0

  const nodeID = data?.available_nodes?.[Math.floor(Math.random() * len)]

  return {
    data,
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
    nodeID,
  }
}

export default useANRNodes
