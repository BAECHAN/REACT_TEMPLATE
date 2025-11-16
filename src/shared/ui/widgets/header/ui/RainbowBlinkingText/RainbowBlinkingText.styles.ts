import styled from 'styled-components';

export const StyledRainbowBlinkingText = styled.h2<{ $isBlinking: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #9400d3,
    #ff0000
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: ${({ $isBlinking }) =>
    $isBlinking
      ? 'blink 0.5s ease-in-out infinite, rainbow 3s linear infinite'
      : 'rainbow 3s linear infinite'};

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;
