# 시작하기

이 문서는 React 템플릿을 처음 사용하는 분들을 위한 시작 가이드입니다.

## 필수 요구사항

- Node.js 20 이상
- npm 9 이상 (또는 yarn, pnpm)

## 설치

```bash
# 의존성 설치
npm install
```

## 개발 서버 실행

```bash
# localhost 모드로 개발 서버 실행
npm run dev

# 또는 다른 모드로 실행
npm run dev:dev      # development 모드
npm run dev:prod     # production 모드
```

개발 서버가 실행되면 브라우저에서 `http://localhost:7248`로 접속하세요.

## 프로젝트 구조

이 템플릿은 도메인 기반 아키텍처를 따릅니다.

```
src/
├── app/              # 애플리케이션 초기화, 프로바이더, 라우팅
├── pages/            # 페이지 컴포넌트 (라우트)
├── domains/          # 도메인별 비즈니스 로직
│   ├── post/         # 게시글 도메인
│   │   ├── _common/  # 공통 코드 (API, 모델, UI)
│   │   └── features/ # 기능별 컴포넌트
│   └── user/         # 사용자 도메인
└── shared/           # 공통 코드 (UI 컴포넌트, 유틸리티, API 설정)
    └── ui/
        ├── atoms/    # 원자적 UI 컴포넌트
        ├── elements/ # 기본 UI 요소
        └── widgets/  # 복합 UI 컴포넌트
```

## 주요 스크립트

### 개발

```bash
npm run dev              # localhost 모드
npm run dev:local        # localhost 모드 (별칭)
npm run dev:dev          # development 모드
npm run dev:prod         # production 모드
```

### 빌드

```bash
npm run build            # 프로덕션 빌드
npm run build:local      # localhost 모드 빌드
npm run build:dev        # development 빌드
npm run build:prod       # production 빌드
```

### 코드 품질

```bash
npm run type-check       # TypeScript 타입 체크
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 포맷팅
npm run format:check     # Prettier 검사
npm run check            # 타입 체크 + 린트 + 포맷 체크
npm run check:fix        # 린트 수정 + 포맷팅
```

### 프리뷰

```bash
npm run preview          # 빌드 결과 미리보기
npm run preview:prod     # production 모드로 프리뷰
```

## 첫 번째 기능 만들기

### 1. 도메인 생성

`src/domains/example/_common/model/example.schema.ts` 파일을 생성합니다:

```typescript
export interface Example {
  id: string;
  name: string;
}
```

### 2. API 생성

`src/domains/example/_common/api/example.api.ts` 파일을 생성합니다:

```typescript
import { apiClient } from '@/shared/api/client';
import type { Example } from '../model/example.schema';

export const exampleApi = {
  fetchList: (): Promise<Example[]> => {
    return apiClient.get<Example[]>('/examples');
  },
};
```

### 3. Feature 생성

`src/domains/example/features/example-list/ui/ExampleList/ExampleList.tsx` 파일을 생성합니다:

```typescript
import { Example } from '@/domains/example/_common/model/example.schema';

interface ExampleListProps {
  examples: Example[];
}

export function ExampleList({ examples }: ExampleListProps) {
  return (
    <div>
      {examples.map((example) => (
        <div key={example.id}>{example.name}</div>
      ))}
    </div>
  );
}
```

### 4. Page에서 사용

`src/pages/examples/ExamplesPage.tsx` 파일을 생성합니다:

```typescript
import { ExampleList } from '@/domains/example/features/example-list/ui/ExampleList/ExampleList';

export function ExamplesPage() {
  const examples = [
    { id: '1', name: 'Example 1' },
    { id: '2', name: 'Example 2' },
  ];

  return <ExampleList examples={examples} />;
}
```

## 다음 단계

- [아키텍처 가이드](./ARCHITECTURE.md) - 도메인 기반 구조 이해
- [라이브러리 가이드](./LIBRARIES.md) - 사용된 라이브러리 학습
- [예제 코드](./EXAMPLES.md) - 템플릿에 포함된 예제 분석

