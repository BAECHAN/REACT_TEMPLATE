import { apiClient } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/config/api';
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/domains/post/_common/model/posts.schema';

export const postApi = {
  // 게시글 목록 조회
  fetchPostList: (): Promise<Post[]> => {
    return apiClient.get<Post[]>(API_ENDPOINTS.POSTS);
  },

  // 게시글 상세 조회
  fetchPostDetail: (id: string): Promise<Post> => {
    return apiClient.get<Post>(`${API_ENDPOINTS.POSTS}/${id}`);
  },

  // 게시글 생성
  createPost: (data: CreatePostDTO): Promise<Post> => {
    return apiClient.post<Post>(API_ENDPOINTS.POSTS, data);
  },

  // 게시글 수정
  updatePost: (id: string, data: UpdatePostDTO): Promise<Post> => {
    return apiClient.put<Post>(`${API_ENDPOINTS.POSTS}/${id}`, data);
  },

  // 게시글 삭제
  deletePost: (id: string): Promise<void> => {
    return apiClient.delete<void>(`${API_ENDPOINTS.POSTS}/${id}`);
  },
};
