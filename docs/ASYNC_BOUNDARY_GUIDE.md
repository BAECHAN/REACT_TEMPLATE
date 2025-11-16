# AsyncBoundary 가이드

AsyncBoundary는 React의 Suspense와 Error Boundary를 결합하여 비동기 데이터 로딩과 에러 처리를 간편하게 해주는 컴포넌트입니다.

## 기본 사용법

```typescript
import { AsyncBoundary } from '@/shared/ui/elements/async-boundary';

<AsyncBoundary>
  <PostList />
</AsyncBoundary>
```

## 로딩 상태 처리

AsyncBoundary는 내부적으로 Suspense를 사용하여 로딩 상태를 처리합니다.

```typescript
<AsyncBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <PostList />
  </Suspense>
</AsyncBoundary>
```

## 에러 처리

에러가 발생하면 Error Boundary가 에러를 캐치하고 에러 UI를 표시합니다.

```typescript
<AsyncBoundary
  errorFallback={<ErrorDisplay message="데이터를 불러오는 중 오류가 발생했습니다." />}
>
  <PostList />
</AsyncBoundary>
```

## React Query와 함께 사용

React Query의 `useSuspenseQuery`와 함께 사용하면 더욱 효과적입니다.

```typescript
import { useSuspenseQuery } from '@tanstack/react-query';

function PostList() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: () => postApi.fetchPostList(),
  });
  
  return (
    <div>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## 참고 자료

- [React Suspense 문서](https://react.dev/reference/react/Suspense)
- [React Error Boundary 문서](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

