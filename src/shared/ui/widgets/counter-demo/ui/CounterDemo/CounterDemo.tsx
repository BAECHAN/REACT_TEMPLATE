import { Counter } from '@/domains/counter-example/ui/Counter/Counter';
import { StyledSection, StyledSectionTitle, StyledSectionDescription } from './CounterDemo.styles';

export function CounterDemo() {
  return (
    <StyledSection data-fsd-path="shared/ui/widgets/counter-demo">
      <StyledSectionTitle>카운터 예제</StyledSectionTitle>
      <StyledSectionDescription>
        features 레이어의 Counter 컴포넌트를 사용하는 위젯 예제입니다.
      </StyledSectionDescription>
      <Counter />
    </StyledSection>
  );
}
