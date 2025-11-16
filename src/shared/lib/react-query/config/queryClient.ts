import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3분
      gcTime: 5 * 60 * 1000, // 5분
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      // Suspense + ErrorBoundary와 함께 사용
      throwOnError: true, // ErrorBoundary로 에러 전파
      // suspense: true,  // React Query v5부터는 useSuspenseQuery 사용 권장
    },
  },
});
