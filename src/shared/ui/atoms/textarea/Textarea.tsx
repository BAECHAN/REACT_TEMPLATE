import { TextareaHTMLAttributes, forwardRef } from 'react';
import { StyledTextarea } from './Textarea.styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, ...props }, ref) => {
    return (
      <StyledTextarea
        ref={ref}
        $hasError={hasError}
        data-fsd-path="shared/ui/atoms/textarea"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
