import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/atoms/button/Button';
import { ROUTES_PATHS } from '@/shared/config/routes';
import {
  StyledContainer,
  StyledContent,
  StyledTitle,
  StyledDescription,
} from './NotFoundPage.styles';

export function NotFoundPage() {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>404</StyledTitle>
        <StyledDescription>페이지를 찾을 수 없습니다</StyledDescription>
        <Button as={Link} to={ROUTES_PATHS.HOME}>
          홈으로 돌아가기
        </Button>
      </StyledContent>
    </StyledContainer>
  );
}

