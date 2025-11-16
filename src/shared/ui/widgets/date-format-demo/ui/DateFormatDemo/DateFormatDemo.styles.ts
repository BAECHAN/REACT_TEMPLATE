import styled from 'styled-components';

export const StyledSection = styled.section`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledSectionTitle = styled.h2`
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const StyledSectionDescription = styled.p`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`;

export const StyledContainer = styled.div`
  margin-top: 1rem;
`;
