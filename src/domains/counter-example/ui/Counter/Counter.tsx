import { Button } from '@/shared/ui/atoms/button/Button';
import { useCounter } from '@/domains/counter-example/model/useCounter';
import { TEXTS } from '@/shared/config/texts';
import { StyledCounterContainer, StyledCounterValue, StyledCounterActions } from './Counter.styles';

export function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <StyledCounterContainer data-fsd-path="domains/_common/Counter">
      <StyledCounterValue>{count}</StyledCounterValue>
      <StyledCounterActions>
        <Button onClick={decrement} variant="secondary">
          -1
        </Button>
        <Button onClick={reset} variant="ghost">
          {TEXTS.buttons.reset}
        </Button>
        <Button onClick={increment}>+1</Button>
      </StyledCounterActions>
    </StyledCounterContainer>
  );
}



