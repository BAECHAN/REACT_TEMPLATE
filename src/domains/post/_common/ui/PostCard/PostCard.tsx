import type { ReactNode } from 'react';
import type { Post } from '@/domains/post/_common/model/posts.schema';
import { StyledCard, StyledTitle, StyledBody, StyledMeta } from './PostCard.styles';

interface PostCardProps {
  post: Post;
  children?: ReactNode;
}

export function PostCard({ post, children }: PostCardProps) {
  return (
    <StyledCard data-fsd-path="domains/_common/ui/PostCard">
      <StyledTitle>{post.title}</StyledTitle>
      <StyledBody>{post.body}</StyledBody>
      <StyledMeta>
        <span>ID: {post.id}</span>
        <span>사용자 ID: {post.userId}</span>
        {children}
      </StyledMeta>
    </StyledCard>
  );
}
