import { ComponentPropsWithoutRef, ElementType } from 'react';
import { StyledButton } from './Button.styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: ElementType;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps> & {
    as?: T;
  };

export function Button<T extends ElementType = 'button'>({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  as,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';

  return (
    <StyledButton
      as={Component}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      data-fsd-path="shared/ui/atoms/button"
      {...props}
    >
      {children}
    </StyledButton>
  );
}
