import styled from 'styled-components';

interface StyledTextareaProps {
  $hasError?: boolean;
}

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.gray300)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  min-height: 120px;
  transition: all ${({ theme }) => theme.transition.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.blue600};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.1)' : theme.colors.blue100)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
  }
`;
