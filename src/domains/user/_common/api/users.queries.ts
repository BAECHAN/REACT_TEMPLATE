import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { userApi } from '@/domains/user/_common/api/users.api';
import { queryClient } from '@/shared/lib/react-query/config/queryClient';

export const userKeys = {
  root: ['users'] as const,
  list: () => [...userKeys.root, 'list'] as const,
  detail: (id: string) => [...userKeys.root, 'detail', id] as const,
};

export const userInvalidateQueries = {
  list: () => {
    queryClient.invalidateQueries({ queryKey: userKeys.list() });
  },
  detail: (id: string) => {
    queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
  },
};

// 사용자 목록 조회
export function useUserListQuery() {
  return useSuspenseQuery({
    queryKey: userKeys.list(),
    queryFn: () => userApi.fetchUserList(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 사용자 상세 조회
export function useUserDetailQuery(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => userApi.fetchUserDetail(userId),
    enabled: !!userId,
  });
}

// 사용자 삭제 Mutation
export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      userInvalidateQueries.list();
    },
  });
}

// 사용자 생성 Mutation
export function useCreateUserMutation() {
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.createUser>[0]) => userApi.createUser(data),
    onSuccess: () => {
      userInvalidateQueries.list();
    },
  });
}
