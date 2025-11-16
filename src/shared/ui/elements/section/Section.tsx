import { HTMLAttributes } from 'react';
import { StyledSection, StyledSectionTitle, StyledSectionDescription } from './Section.styles';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Section({ title, description, children, ...props }: SectionProps) {
  return (
    <StyledSection data-fsd-path="shared/ui/elements/Section" {...props}>
      {title && <StyledSectionTitle>{title}</StyledSectionTitle>}
      {description && <StyledSectionDescription>{description}</StyledSectionDescription>}
      {children}
    </StyledSection>
  );
}
