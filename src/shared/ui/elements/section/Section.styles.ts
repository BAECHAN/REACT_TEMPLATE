import styled from 'styled-components';

export const StyledSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledSectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`;
