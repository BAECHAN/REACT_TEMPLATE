import { Header } from '@/shared/ui/widgets/header/ui/Header/Header';
import { PageLayout } from '@/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout';
import { AsyncBoundary } from '@/shared/ui/elements/async-boundary/AsyncBoundary';
import { PostList } from '@/domains/post/features/post-list/ui/PostList/PostList';
import { CreatePostButton } from '@/domains/post/features/create-post/ui/CreatePostButton/CreatePostButton';
import { StyledActions } from './PostsPage.styles';

export function PostsPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 목록" description="게시글을 조회하고 관리합니다">
        <AsyncBoundary>
          <StyledActions>
            <CreatePostButton />
          </StyledActions>
          <PostList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
