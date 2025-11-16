import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 6px 12px;
          font-size: 14px;
        `;
      case 'md':
        return `
          padding: 10px 20px;
          font-size: 16px;
        `;
      case 'lg':
        return `
          padding: 14px 28px;
          font-size: 18px;
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: #2563eb;
          color: white;
          &:hover:not(:disabled) {
            background-color: #1d4ed8;
          }
        `;
      case 'secondary':
        return `
          background-color: #64748b;
          color: white;
          &:hover:not(:disabled) {
            background-color: #475569;
          }
        `;
      case 'danger':
        return `
          background-color: #dc2626;
          color: white;
          &:hover:not(:disabled) {
            background-color: #b91c1c;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: #64748b;
          &:hover:not(:disabled) {
            background-color: #f1f5f9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
