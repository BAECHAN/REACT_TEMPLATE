import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`;

export const StyledName = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const StyledInfo = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`;

export const StyledMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

export const StyledDeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.red600};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
