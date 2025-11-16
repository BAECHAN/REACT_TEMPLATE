# React Template

도메인 기반 아키텍처를 적용한 React + TypeScript 프로젝트 템플릿입니다.

## 📚 문서

이 템플릿을 처음 사용하시는 분들을 위해 상세한 문서를 제공합니다. 아래 문서들을 참고하여 프로젝트를 시작하세요.

### 필수 문서

- **[🏗️ 아키텍처 가이드](./docs/ARCHITECTURE.md)** - 도메인 기반 아키텍처의 개념, 구조, 핵심 원칙 상세 설명
- **[🚀 시작하기 가이드](./docs/GETTING_STARTED.md)** - 개발 환경 설정, 프로젝트 구조 상세 설명, 첫 번째 기능 만들기
- **[📦 라이브러리 가이드](./docs/LIBRARIES.md)** - 사용된 라이브러리 상세 설명 및 활용법
- **[🎨 스타일링 가이드](./docs/STYLED_COMPONENTS_GUIDE.md)** - Styled-components 사용법, 테마 시스템
- **[⚡ AsyncBoundary 가이드](./docs/ASYNC_BOUNDARY_GUIDE.md)** - 로딩/에러 처리 공통화, Suspense 패턴
- **[📖 예제 코드](./docs/EXAMPLES.md)** - 템플릿에 포함된 예제 기능 상세 설명

### 추천 학습 순서

1. **README** (현재 문서) - 프로젝트 전체 개요 파악
2. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - 도메인 기반 아키텍처 개념과 원칙 이해
3. **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - 프로젝트 시작 및 개발 환경 설정
4. **[LIBRARIES.md](./docs/LIBRARIES.md)** - 사용된 라이브러리 학습
5. **[EXAMPLES.md](./docs/EXAMPLES.md)** - 예제 코드 분석
6. **[ASYNC_BOUNDARY_GUIDE.md](./docs/ASYNC_BOUNDARY_GUIDE.md)** - 로딩/에러 처리 패턴
7. **[STYLED_COMPONENTS_GUIDE.md](./docs/STYLED_COMPONENTS_GUIDE.md)** - 스타일링 방법 학습

## 🎯 프로젝트 소개

이 템플릿은 확장 가능하고 유지보수하기 쉬운 React 애플리케이션을 위한 견고한 기반을 제공합니다. 도메인 기반 아키텍처를 기반으로 하며, 모던 React 생태계의 best practice를 따릅니다.

### 주요 특징

- ⚡️ **빠른 개발 경험** - Vite 기반의 초고속 HMR과 빌드
- 🏗️ **확장 가능한 아키텍처** - 도메인 기반 구조로 체계적인 코드 구조 유지
- 🔷 **타입 안정성** - TypeScript로 런타임 에러 최소화
- 💅 **강력한 스타일링** - Styled-components와 테마 시스템
- 🔄 **효율적인 상태 관리** - React Query + Zustand 조합
- 📱 **실전 예제** - 게시글/사용자 관리 샘플 구현
- 🎨 **Atomic Design** - atoms, elements, widgets로 구성된 UI 컴포넌트 구조

## 🛠️ 기술 스택

### Core

- **React 18** - 최신 React 기능 (Concurrent, Suspense 등)
- **TypeScript 5** - 타입 안전성과 개발자 경험 향상
- **Vite 6** - 빠른 개발 서버와 최적화된 빌드

### 상태 관리

- **React Query** (TanStack Query) - 서버 상태 관리 및 캐싱
- **Zustand** - 간단하고 확장 가능한 클라이언트 상태 관리

### UI & 스타일링

- **Styled-components** - CSS-in-JS, 타입 안전한 스타일링
- **Pretendard Font** - 한글 최적화 웹폰트

### Form & Validation

- **React Hook Form** - 고성능 폼 관리
- **Zod** - 타입 안전한 스키마 검증

### 라우팅

- **React Router v6** - 선언적 라우팅

### 에러 처리

- **React Error Boundary** - 컴포넌트 에러 캐칭 및 처리

### 기타

- **Dayjs** - 가벼운 날짜 라이브러리
- **ESLint & Prettier** - 코드 품질 및 포맷팅

자세한 내용은 [라이브러리 가이드](./docs/LIBRARIES.md)를 참고하세요.

## 📁 프로젝트 구조

```
public/
└── fonts/                  # 웹폰트 파일 (Pretendard)
src/
├── app/                    # 애플리케이션 초기화, 프로바이더, 라우팅
├── pages/                  # 페이지 컴포넌트 (라우트)
├── domains/                # 도메인별 비즈니스 로직
│   ├── post/              # 게시글 도메인
│   │   ├── _common/       # 공통 코드 (API, 모델, UI)
│   │   └── features/      # 기능별 컴포넌트
│   └── user/              # 사용자 도메인
└── shared/                 # 공통 코드
    └── ui/                 # UI 컴포넌트
        ├── atoms/          # 원자적 컴포넌트
        ├── elements/       # 기본 UI 요소
        └── widgets/        # 복합 컴포넌트
```

**의존성 규칙:**

```
pages → domains → shared
```

자세한 구조 설명은 [아키텍처 가이드](./docs/ARCHITECTURE.md)를 참고하세요.

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- npm, yarn, 또는 pnpm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost 모드)
npm run dev

# 브라우저에서 http://localhost:7248 접속
```

### 주요 스크립트

```bash
# 개발
npm run dev              # localhost 모드
npm run dev:local        # localhost 모드 (별칭)
npm run dev:dev          # development 모드
npm run dev:prod         # production 모드

# 빌드
npm run build            # 프로덕션 빌드
npm run build:local      # localhost 모드 빌드
npm run build:dev        # development 빌드
npm run build:prod       # production 빌드

# 코드 품질
npm run type-check       # TypeScript 타입 체크
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 포맷팅
npm run format:check     # Prettier 검사
npm run check            # 타입 체크 + 린트 + 포맷 체크
npm run check:fix        # 린트 수정 + 포맷팅

# 프리뷰
npm run preview          # 빌드 결과 미리보기
npm run preview:prod     # production 모드로 프리뷰
```

자세한 시작 가이드는 [GETTING_STARTED.md](./docs/GETTING_STARTED.md)를 참고하세요.

## 🎨 샘플 기능

이 템플릿에는 다음과 같은 실전 예제가 구현되어 있습니다:

- ✅ 게시글 목록/상세/작성/수정 (CRUD)
- ✅ 사용자 목록/상세 조회
- ✅ React Query 캐싱 및 무효화
- ✅ Form 검증 (React Hook Form + Zod)
- ✅ 에러 처리 및 로딩 상태
- ✅ AsyncBoundary를 활용한 Suspense 패턴

자세한 예제 설명은 [EXAMPLES.md](./docs/EXAMPLES.md)를 참고하세요.

## 🤝 기여 및 피드백

이 프로젝트는 학습 및 프로덕션 시작점으로 사용될 수 있습니다. 개선 제안이나 버그 리포트는 언제든 환영합니다.

## 📖 참고 자료

- [React 공식 문서](https://react.dev/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Styled-components 문서](https://styled-components.com/)
