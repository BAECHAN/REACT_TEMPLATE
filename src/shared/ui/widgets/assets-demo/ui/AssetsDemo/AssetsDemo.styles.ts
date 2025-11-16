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

export const StyledAssetsTestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

export const StyledIconRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const StyledIconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.gray50};
`;

export const StyledIconLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
`;

export const StyledImageRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const StyledImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.gray50};

  img {
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export const StyledImageLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
`;
