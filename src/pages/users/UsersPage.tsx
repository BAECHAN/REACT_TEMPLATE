import { Header } from '@/shared/ui/widgets/header/ui/Header/Header';
import { PageLayout } from '@/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout';
import { AsyncBoundary } from '@/shared/ui/elements/async-boundary/AsyncBoundary';
import { UserList } from '@/domains/user/features/user-list/ui/UserList/UserList';

export function UsersPage() {
  return (
    <>
      <Header />
      <PageLayout title="사용자 목록" description="사용자를 조회하고 관리합니다">
        <AsyncBoundary>
          <UserList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
