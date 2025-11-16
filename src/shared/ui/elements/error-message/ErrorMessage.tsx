import { HTMLAttributes } from 'react';
import { StyledErrorMessage } from './ErrorMessage.styles';
interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function ErrorMessage({ children, ...props }: ErrorMessageProps) {
  if (!children) return null;
  return <StyledErrorMessage {...props}>{children}</StyledErrorMessage>;
}
