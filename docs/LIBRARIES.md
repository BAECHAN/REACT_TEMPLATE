# 라이브러리 가이드

이 템플릿에서 사용하는 주요 라이브러리와 활용 방법을 설명합니다.

## Core

### React 18

최신 React 기능을 사용합니다.

- **Concurrent Features**: React 18의 동시성 기능
- **Suspense**: 비동기 데이터 로딩 처리
- **Error Boundaries**: 에러 처리

### TypeScript 5

타입 안전성을 제공합니다.

```typescript
interface Post {
  id: string;
  title: string;
  content: string;
}
```

### Vite 6

빠른 개발 서버와 최적화된 빌드를 제공합니다.

## 상태 관리

### React Query (TanStack Query)

서버 상태 관리 및 캐싱을 담당합니다.

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

// 데이터 조회
const { data, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: () => postApi.fetchPostList(),
});

// 데이터 변경
const { mutate } = useMutation({
  mutationFn: postApi.createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

### Zustand

클라이언트 상태 관리를 담당합니다.

```typescript
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## UI & 스타일링

### Styled-components

CSS-in-JS 스타일링을 제공합니다.

```typescript
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
```

### Pretendard Font

한글 최적화 웹폰트입니다.

## Form & Validation

### React Hook Form

고성능 폼 관리를 제공합니다.

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  content: z.string().min(1, '내용을 입력하세요'),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### Zod

타입 안전한 스키마 검증을 제공합니다.

```typescript
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type PostDTO = z.infer<typeof postSchema>;
```

## 라우팅

### React Router v6

선언적 라우팅을 제공합니다.

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/posts" element={<PostsPage />} />
</Routes>
```

## 에러 처리

### React Error Boundary

컴포넌트 에러를 캐치하고 처리합니다.

```typescript
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

## 유틸리티

### Dayjs

가벼운 날짜 라이브러리입니다.

```typescript
import dayjs from 'dayjs';

const formatted = dayjs(date).format('YYYY-MM-DD');
```

## 개발 도구

### ESLint

코드 품질 검사를 수행합니다.

### Prettier

코드 포맷팅을 자동화합니다.

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)
- [React Hook Form 문서](https://react-hook-form.com/)
- [Zod 문서](https://zod.dev/)
- [Styled-components 문서](https://styled-components.com/)

