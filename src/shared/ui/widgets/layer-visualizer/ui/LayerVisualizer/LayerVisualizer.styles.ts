import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  gap: 0;
  height: 100%;
  min-height: 600px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledSidebar = styled.aside`
  width: 200px;
  background: ${({ theme }) => theme.colors.gray50};
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledSidebarHeader = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 1rem 1rem 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const StyledLayerButton = styled.button<{ $isActive: boolean; $color: string }>`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: ${({ $isActive, $color }) => ($isActive ? $color : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#333')};
  border: none;
  cursor: pointer;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border-left: 3px solid ${({ $isActive, $color }) => ($isActive ? $color : 'transparent')};

  &:hover {
    background: ${({ $isActive, $color }) => ($isActive ? $color : '#f3f4f6')};
    color: ${({ $isActive }) => ($isActive ? 'white' : '#111')};
  }
`;

export const StyledMainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledLayerHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledLayerTitle = styled.h2<{ $color: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0 0 0.5rem 0;
`;

export const StyledLayerDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
  margin: 0;
`;

export const StyledTreeContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledTreeNode = styled.div<{ $depth: number }>`
  margin-bottom: 0.25rem;
`;

export const StyledTreeNodeContent = styled.div<{ $isCommon?: boolean }>`
  padding: 0.5rem 0;
  border-radius: 4px;
  transition: background-color 0.15s ease;
  ${({ $isCommon }) =>
    $isCommon &&
    `
    background-color: #eff6ff;
    border-left: 3px solid #0ea5e9;
    padding-left: 0.5rem;
    margin-left: -0.5rem;
  `}

  &:hover {
    background-color: ${({ theme, $isCommon }) => ($isCommon ? '#dbeafe' : theme.colors.gray50)};
  }
`;

export const StyledTreeNodeName = styled.div<{ $isCommon?: boolean }>`
  font-weight: ${({ $isCommon }) => ($isCommon ? 600 : 500)};
  font-size: 0.95rem;
  color: ${({ theme, $isCommon }) => ($isCommon ? '#0ea5e9' : theme.colors.gray900)};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledTreeNodePath = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  margin-top: 0.25rem;
  margin-left: 1.75rem;
  word-break: break-all;
`;

export const StyledExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.gray600};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

export const StyledTreeChildren = styled.div`
  margin-left: 0.5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-left: 0.75rem;
`;

export const StyledBadge = styled.span<{ $isFile?: boolean; $isCommon?: boolean }>`
  display: inline-block;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-size: 0.65rem;
  font-weight: 500;
  background: ${({ $isFile, $isCommon, theme }) =>
    $isCommon
      ? '#0ea5e9'
      : $isFile
        ? theme.colors.blue100
        : '#e8f5e9'};
  color: ${({ $isFile, $isCommon, theme }) =>
    $isCommon
      ? 'white'
      : $isFile
        ? theme.colors.blue600
        : theme.colors.success};
  margin-left: 0.25rem;
`;
