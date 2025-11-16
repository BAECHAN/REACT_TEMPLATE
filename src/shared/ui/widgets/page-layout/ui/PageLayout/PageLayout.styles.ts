import styled from 'styled-components';

export const StyledPageLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const StyledHeader = styled.header`
  margin-bottom: 2rem;
`;

export const StyledTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const StyledDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

export const StyledContent = styled.main`
  width: 100%;
`;
