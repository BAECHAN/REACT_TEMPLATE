import styled from 'styled-components';

export const StyledCounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const StyledCounterValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue600};
`;

export const StyledCounterActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;
