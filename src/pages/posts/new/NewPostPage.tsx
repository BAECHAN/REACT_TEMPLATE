import { Header } from '@/shared/ui/widgets/header/ui/Header/Header';
import { PageLayout } from '@/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout';
import { CreatePostForm } from '@/domains/post/features/create-post/ui/CreatePostForm/CreatePostForm';

export function NewPostPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 작성" description="새 게시글을 작성합니다">
        <CreatePostForm />
      </PageLayout>
    </>
  );
}
