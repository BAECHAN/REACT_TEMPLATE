import { DateFormatExample } from '@/shared/ui/widgets/date-format-demo/ui/DateFormatExample/DateFormatExample';
import {
  StyledContainer,
  StyledSection,
  StyledSectionTitle,
  StyledSectionDescription,
} from './DateFormatDemo.styles';

export function DateFormatDemo() {
  return (
    <StyledSection data-fsd-path="shared/ui/widgets/date-format-demo">
      <StyledSectionTitle>날짜 포맷 유틸리티 예제</StyledSectionTitle>
      <StyledSectionDescription>
        dayjs를 활용한 다양한 날짜 포맷 예제입니다. 여러 상황에 맞는 날짜 표시 형식을 확인할 수
        있습니다.
      </StyledSectionDescription>
      <StyledContainer>
        <DateFormatExample />
      </StyledContainer>
    </StyledSection>
  );
}
