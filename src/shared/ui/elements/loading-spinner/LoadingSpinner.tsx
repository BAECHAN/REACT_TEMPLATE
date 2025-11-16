import { BeatLoader } from 'react-spinners';
import { StyledLoadingContainer } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ size = 15, color = '#2563eb' }: LoadingSpinnerProps) {
  return (
    <StyledLoadingContainer>
      <BeatLoader color={color} size={size} />
    </StyledLoadingContainer>
  );
}
