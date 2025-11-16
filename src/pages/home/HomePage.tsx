import { Link } from 'react-router-dom';
import { Header } from '@/shared/ui/widgets/header/ui/Header/Header';
import { PageLayout } from '@/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout';
import { Button } from '@/shared/ui/atoms/button/Button';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { TEXTS } from '@/shared/config/texts';
import { DateFormatDemo } from '@/shared/ui/widgets/date-format-demo/ui/DateFormatDemo/DateFormatDemo';
import { AssetsDemo } from '@/shared/ui/widgets/assets-demo/ui/AssetsDemo/AssetsDemo';
import { UIComponentsDemo } from '@/shared/ui/widgets/ui-components-demo/ui/UIComponentsDemo/UIComponentsDemo';
import { CounterDemo } from '@/shared/ui/widgets/counter-demo/ui/CounterDemo/CounterDemo';
import {
  StyledContainer,
  StyledSection,
  StyledSectionTitle,
  StyledSectionDescription,
} from './HomePage.styles';

export function HomePage() {
  return (
    <>
      <Header />
      <PageLayout title="JSONPlaceholder API 예제" description="게시글과 사용자 관리 예제">
        <StyledContainer>
          <StyledSection>
            <StyledSectionTitle>{TEXTS.ui.postManagement}</StyledSectionTitle>
            <StyledSectionDescription>
              {TEXTS.ui.postManagementDescription}
            </StyledSectionDescription>
            <Button as={Link} to={ROUTES_PATHS.POSTS.LIST}>
              {TEXTS.buttons.postList}
            </Button>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>{TEXTS.ui.userManagement}</StyledSectionTitle>
            <StyledSectionDescription>
              {TEXTS.ui.userManagementDescription}
            </StyledSectionDescription>
            <Button as={Link} to={ROUTES_PATHS.USERS.LIST}>
              {TEXTS.buttons.userList}
            </Button>
          </StyledSection>

          <div style={{ gridColumn: '1 / -1' }}>
            <UIComponentsDemo />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <CounterDemo />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <DateFormatDemo />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <AssetsDemo />
          </div>
        </StyledContainer>
      </PageLayout>
    </>
  );
}

