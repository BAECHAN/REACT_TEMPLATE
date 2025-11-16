import { ReactNode } from 'react';
import { StyledGrid } from './Grid.styles';

interface GridProps {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function Grid({
  children,
  columns,
  ...props
}: GridProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledGrid $columns={columns} data-fsd-path="shared/ui/elements/grid" {...props}>
      {children}
    </StyledGrid>
  );
}
