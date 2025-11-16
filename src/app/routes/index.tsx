import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { LoadingSpinner } from '@/shared/ui/elements/loading-spinner/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/home/HomePage').then((module) => ({ default: module.HomePage })));
const PostsPage = lazy(() =>
  import('@/pages/posts/PostsPage').then((module) => ({ default: module.PostsPage }))
);
const NewPostPage = lazy(() =>
  import('@/pages/posts/new/NewPostPage').then((module) => ({ default: module.NewPostPage }))
);
const UsersPage = lazy(() =>
  import('@/pages/users/UsersPage').then((module) => ({ default: module.UsersPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/404/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

/**
 * App Router
 * app 레이어의 라우팅 설정
 */
export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Home */}
        <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />

        {/* Post */}
        <Route path={ROUTES_PATHS.POSTS.LIST} element={<PostsPage />} />
        <Route path={ROUTES_PATHS.POSTS.NEW} element={<NewPostPage />} />

        {/* User */}
        <Route path={ROUTES_PATHS.USERS.LIST} element={<UsersPage />} />

        {/* 404 */}
        <Route path={ROUTES_PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
