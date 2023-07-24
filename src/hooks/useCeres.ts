import useSWR from 'swr'

import fetcher from '../utils/fetcher'

export default function useCeres() {
  const { data, error } = useSWR(`https://ceres.gogopool.com/`, fetcher)

  return {
    data,
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
  }
}
