import { HTMLAttributes } from 'react';
import { StyledFormGroup } from './FormGroup.styles';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormGroup({ children, ...props }: FormGroupProps) {
  return (
    <StyledFormGroup data-fsd-path="shared/ui/elements/form-group" {...props}>
      {children}
    </StyledFormGroup>
  );
}
