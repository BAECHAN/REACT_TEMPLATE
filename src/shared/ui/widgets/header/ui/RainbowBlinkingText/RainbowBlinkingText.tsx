import { useEffect, useState } from 'react';
import { StyledRainbowBlinkingText } from './RainbowBlinkingText.styles';

interface RainbowBlinkingTextProps {
  children: React.ReactNode;
  blinkDuration?: number; // 깜빡임 지속 시간 (ms)
}

export function RainbowBlinkingText({ children, blinkDuration = 3000 }: RainbowBlinkingTextProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, blinkDuration);

    return () => clearTimeout(timer);
  }, [blinkDuration]);

  return <StyledRainbowBlinkingText $isBlinking={isBlinking}>{children}</StyledRainbowBlinkingText>;
}
