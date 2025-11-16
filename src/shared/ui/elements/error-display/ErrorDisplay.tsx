import { ReactNode } from 'react';
import { StyledErrorContainer, StyledErrorMessage } from './ErrorDisplay.styles';

interface ErrorDisplayProps {
  message: string;
  children?: ReactNode; // 추가 액션 버튼 등
}

export function ErrorDisplay({ message, children }: ErrorDisplayProps) {
  return (
    <StyledErrorContainer>
      <StyledErrorMessage>{message}</StyledErrorMessage>
      {children}
    </StyledErrorContainer>
  );
}
