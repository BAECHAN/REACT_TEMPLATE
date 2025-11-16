import { ReactNode } from 'react';
import {
  StyledPageLayout,
  StyledHeader,
  StyledTitle,
  StyledDescription,
  StyledContent,
} from './PageLayout.styles';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <StyledPageLayout data-fsd-path="shared/ui/widgets/page-layout">
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        {description && <StyledDescription>{description}</StyledDescription>}
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledPageLayout>
  );
}
