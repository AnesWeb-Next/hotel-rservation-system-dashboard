import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Cache time: How long unused data stays in cache
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry failed requests
      retry: 1,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations
      retry: 0,
    },
  },
});
