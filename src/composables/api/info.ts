import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit'
import type { MainDataResponse, SessionInfoResponse } from '@/types/qbit/responses'

const pollingRate = 1000

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res: SessionInfoResponse = await fetch('/api/v2/transfer/info').then(res => res.json())
      return res
    },
    refetchInterval: pollingRate
  })
}

export const useMainData = (rid?: number) => {
  return useQuery({
    queryKey: ['maindata'],
    queryFn: async () => {
      const res: MainDataResponse = await fetch(`/api/v2/sync/maindata?rid=${rid}`).then(res => res.json())
      return res
    },
    refetchInterval: pollingRate
  })
}
