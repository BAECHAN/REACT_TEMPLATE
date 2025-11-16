import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.md};
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const StyledContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (min-width: 640px) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

export const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const StyledLogo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blue600};
  transition: color ${({ theme }) => theme.transition.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.blue700};
  }
`;

export const StyledNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const StyledNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: color ${({ theme }) => theme.transition.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.blue600};
  }
`;

export const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledCenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledLikeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.red100};
  color: ${({ theme }) => theme.colors.red600};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const StyledHeartIcon = styled.svg`
  width: 1rem;
  height: 1rem;
`;
