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
  margin: 0 0 1.5rem 0;
`;

export const StyledContainer = styled.div`
  width: 100%;
`;

export const StyledDemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const StyledDemoItem = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;
