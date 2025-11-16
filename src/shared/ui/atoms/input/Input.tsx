import { InputHTMLAttributes, forwardRef } from 'react';
import { StyledInput } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, ...props }, ref) => {
    return (
      <StyledInput ref={ref} $hasError={hasError} data-fsd-path="shared/ui/atoms/input" {...props} />
    );
  }
);

Input.displayName = 'Input';
