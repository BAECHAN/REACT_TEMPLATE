import styled from 'styled-components';

export const StyledOverlayContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
`;

export const StyledOverlayBox = styled.div<{ $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid ${({ $color }) => $color};
  background: ${({ $color }) => `${$color}20`};
  box-sizing: border-box;
`;

export const StyledOverlayLabel = styled.div<{ $color: string }>`
  position: absolute;
  top: -1.75rem;
  left: 0;
  background: ${({ $color }) => $color};
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: nowrap;
  z-index: 10000;
  border-radius: 4px 4px 0 0;
  pointer-events: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledToggleButton = styled.button<{ $isActive: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  padding: 0.75rem 1rem;
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.danger : theme.colors.gray700)};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
