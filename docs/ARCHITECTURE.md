# 아키텍처 가이드

이 템플릿은 도메인 기반 아키텍처를 따릅니다.

## 아키텍처 개요

도메인 기반 아키텍처는 비즈니스 도메인을 중심으로 코드를 조직화하는 방법입니다.

## 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 초기화
│   ├── App.tsx
│   ├── providers/          # 전역 프로바이더
│   └── routes/             # 라우팅 설정
├── pages/                  # 페이지 컴포넌트
│   ├── home/
│   ├── posts/
│   └── users/
├── domains/                 # 도메인별 비즈니스 로직
│   ├── post/
│   │   ├── _common/        # 공통 코드
│   │   │   ├── api/        # API 호출
│   │   │   ├── model/      # 데이터 모델
│   │   │   ├── ui/         # 공통 UI 컴포넌트
│   │   │   └── utils/      # 유틸리티
│   │   └── features/       # 기능별 컴포넌트
│   │       ├── create-post/
│   │       ├── edit-post/
│   │       └── post-list/
│   └── user/
│       ├── _common/
│       └── features/
└── shared/                  # 공통 코드
    ├── api/                 # API 클라이언트
    ├── config/              # 설정
    ├── ui/                  # UI 컴포넌트
    │   ├── atoms/           # 원자적 컴포넌트
    │   ├── elements/        # 기본 요소
    │   └── widgets/         # 복합 컴포넌트
    └── utils/               # 유틸리티
```

## 도메인 구조

각 도메인은 `_common`과 `features`로 구분됩니다.

### _common (공통 코드)

도메인 내에서 공통으로 사용되는 코드입니다.

- **api/**: API 호출 함수
- **model/**: 데이터 모델 및 스키마
- **ui/**: 공통 UI 컴포넌트
- **utils/**: 도메인별 유틸리티

```typescript
// domains/post/_common/api/posts.api.ts
export const postApi = {
  fetchPostList: (): Promise<Post[]> => {
    return apiClient.get<Post[]>('/posts');
  },
};

// domains/post/_common/model/posts.schema.ts
export interface Post {
  id: string;
  title: string;
  content: string;
}

// domains/post/_common/ui/PostCard/PostCard.tsx
export function PostCard({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
```

### features (기능별 컴포넌트)

특정 기능을 구현하는 컴포넌트입니다.

```typescript
// domains/post/features/create-post/ui/CreatePostForm/CreatePostForm.tsx
export function CreatePostForm() {
  const { mutate } = useCreatePost();
  
  const handleSubmit = (data: CreatePostDTO) => {
    mutate(data);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Shared UI 구조

Shared UI는 Atomic Design 원칙을 따릅니다.

### atoms (원자적 컴포넌트)

가장 작은 단위의 UI 컴포넌트입니다.

- Button
- Input
- Label
- Textarea

```typescript
// shared/ui/atoms/button/Button.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### elements (기본 요소)

여러 atoms를 조합한 기본 UI 요소입니다.

- AsyncBoundary
- FormGroup
- Grid
- LoadingSpinner

```typescript
// shared/ui/elements/form-group/FormGroup.tsx
export function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
```

### widgets (복합 컴포넌트)

여러 elements를 조합한 복합 컴포넌트입니다.

- Header
- PageLayout
- UIComponentsDemo

```typescript
// shared/ui/widgets/header/ui/Header/Header.tsx
export function Header() {
  return (
    <header>
      <h1>My App</h1>
      <nav>...</nav>
    </header>
  );
}
```

## 의존성 규칙

1. **pages**는 **domains**와 **shared**에 의존할 수 있습니다
2. **domains**는 **shared**에만 의존할 수 있습니다
3. **domains** 간에는 서로 의존할 수 없습니다
4. **shared**는 다른 레이어에 의존할 수 없습니다

```
✅ pages → domains → shared
❌ domains → pages (불가능)
❌ domains → domains (불가능)
❌ shared → domains (불가능)
```

## 도메인 기반 아키텍처의 장점

1. **도메인 중심**: 비즈니스 로직이 도메인별로 명확하게 분리
2. **확장성**: 새로운 도메인을 추가할 때 기존 코드에 영향 최소화
3. **유지보수성**: 도메인별로 독립적으로 유지보수 가능
4. **재사용성**: `_common`의 코드를 여러 features에서 재사용
5. **테스트 용이성**: 도메인별로 독립적으로 테스트 가능

