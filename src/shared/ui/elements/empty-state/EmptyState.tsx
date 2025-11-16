import { ReactNode } from 'react';
import { StyledEmptyState } from './EmptyState.styles';

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
}

export function EmptyState({ children, className }: EmptyStateProps) {
  return <StyledEmptyState className={className}>{children}</StyledEmptyState>;
}
