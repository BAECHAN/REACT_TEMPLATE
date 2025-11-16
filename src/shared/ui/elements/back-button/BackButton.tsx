import { StyledBackButton, StyledArrowIcon } from './BackButton.styles';

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export function BackButton({ onClick, children = '뒤로 가기' }: BackButtonProps) {
  return (
    <StyledBackButton onClick={onClick}>
      <StyledArrowIcon
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </StyledArrowIcon>
      {children}
    </StyledBackButton>
  );
}
