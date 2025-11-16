# 예제 코드

이 템플릿에 포함된 예제 기능들을 설명합니다.

## 게시글 관리 (Post)

### 게시글 목록 조회

`domains/post/_common/api/posts.queries.ts`에서 React Query를 사용하여 게시글 목록을 조회합니다.

### 게시글 작성

`domains/post/features/create-post`에서 게시글 작성 기능을 구현합니다.

- `CreatePostButton`: 게시글 작성 페이지로 이동하는 버튼
- `CreatePostForm`: 게시글 작성 폼 (React Hook Form + Zod 사용)

### 게시글 수정

`domains/post/features/edit-post`에서 게시글 수정 기능을 구현합니다.

### 게시글 삭제

`domains/post/features/post-list`에서 게시글 삭제 기능을 구현합니다.

React Query의 `useMutation`을 사용하여 삭제 후 목록을 자동으로 갱신합니다.

## 사용자 관리 (User)

### 사용자 목록 조회

`domains/user/_common/api/users.queries.ts`에서 사용자 목록을 조회합니다.

### 사용자 삭제

`domains/user/features/user-list`에서 사용자 삭제 기능을 구현합니다.

## Counter 예제

`domains/counter-example`에서 간단한 카운터 기능을 구현합니다.

Zustand를 사용하여 클라이언트 상태를 관리합니다.

## AsyncBoundary 활용

`shared/ui/elements/async-boundary`를 사용하여 로딩 및 에러 상태를 처리합니다.

```typescript
<AsyncBoundary>
  <PostList />
</AsyncBoundary>
```

## Atomic Design UI 구조

Shared UI는 Atomic Design 원칙을 따릅니다.

- **atoms**: Button, Input, Label, Textarea
- **elements**: AsyncBoundary, FormGroup, Grid, LoadingSpinner
- **widgets**: Header, PageLayout, UIComponentsDemo

