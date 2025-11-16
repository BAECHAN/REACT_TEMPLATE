import styled from 'styled-components';

export const StyledGrid = styled.div<{ $columns?: { sm?: number; md?: number; lg?: number } }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 640px) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.sm || 1}, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.md || 2}, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.lg || 3}, 1fr);
  }
`;
