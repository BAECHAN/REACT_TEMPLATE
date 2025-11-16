import styled from 'styled-components';

export const StyledExampleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

export const StyledExampleItem = styled.div`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledExampleLabel = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray200};
  padding-bottom: 0.5rem;
`;

export const StyledExampleValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray900};
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    sans-serif;
`;
