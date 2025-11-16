import styled from 'styled-components';

export const StyledSection = styled.section`
  margin: 2rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const StyledSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 0.5rem 0;
`;

export const StyledSectionDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0 0 1.5rem 0;
`;
