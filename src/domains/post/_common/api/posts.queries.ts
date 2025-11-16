import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { postApi } from '@/domains/post/_common/api/posts.api';
import { queryClient } from '@/shared/lib/react-query/config/queryClient';

export const postKeys = {
  root: ['posts'] as const,
  list: () => [...postKeys.root, 'list'] as const,
  detail: (id: string) => [...postKeys.root, 'detail', id] as const,
};

export const postInvalidateQueries = {
  list: () => {
    queryClient.invalidateQueries({ queryKey: postKeys.list() });
  },
  detail: (id: string) => {
    queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
  },
};

// 게시글 목록 조회
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 게시글 상세 조회
export function usePostDetailQuery(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.fetchPostDetail(postId),
    enabled: !!postId,
  });
}

// 게시글 생성 Mutation
export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: Parameters<typeof postApi.createPost>[0]) => postApi.createPost(data),
    onSuccess: () => {
      postInvalidateQueries.list();
    },
  });
}

// 게시글 삭제 Mutation
export function useDeletePostMutation() {
  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),
    onSuccess: () => {
      postInvalidateQueries.list();
    },
  });
}
