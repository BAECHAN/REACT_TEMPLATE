# Styled Components 가이드

이 템플릿은 Styled-components를 사용하여 스타일링합니다.

## 기본 사용법

```typescript
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;
```

## 테마 사용

테마는 `app/styles/theme.ts`에 정의되어 있습니다.

```typescript
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;
```

## Props 기반 스타일링

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  padding: ${({ size }) =>
    size === 'small' ? '4px 8px' : size === 'large' ? '12px 24px' : '8px 16px'};
`;
```

## 스타일 파일 분리

컴포넌트와 스타일을 분리하여 관리합니다.

```typescript
// Button.styles.ts
import styled from 'styled-components';

export const StyledButton = styled.button`
  /* styles */
`;

// Button.tsx
import { StyledButton } from './Button.styles';

export function Button() {
  return <StyledButton>Click me</StyledButton>;
}
```

## 참고 자료

- [Styled-components 공식 문서](https://styled-components.com/)

