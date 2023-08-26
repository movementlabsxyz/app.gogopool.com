import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { Ceres } from '@/types/ceres'

export default function useCeres() {
  const { data, error } = useSWR<Ceres>(`https://ceres.gogopool.com/`, fetcher)

  return {
    data,
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
  }
}
