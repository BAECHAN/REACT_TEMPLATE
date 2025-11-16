import { ROUTES_PATHS } from '@/shared/config/routes';
import { TEXTS } from '@/shared/config/texts';
import { RainbowBlinkingText } from '@/shared/ui/widgets/header/ui/RainbowBlinkingText/RainbowBlinkingText';
import {
  StyledHeaderContainer,
  StyledContainer,
  StyledContent,
  StyledLeftSection,
  StyledLogo,
  StyledNav,
  StyledNavLink,
  StyledRightSection,
  StyledLikeBadge,
  StyledHeartIcon,
  StyledCenterSection,
} from './Header.styles';

export function Header() {
  return (
    <StyledHeaderContainer data-fsd-path="shared/ui/widgets/header">
      <StyledContainer>
        <StyledContent>
          <StyledLeftSection>
            <StyledLogo to={ROUTES_PATHS.HOME}>React Template</StyledLogo>
            <StyledNav>
              <StyledNavLink to={ROUTES_PATHS.HOME}>{TEXTS.buttons.home}</StyledNavLink>
            </StyledNav>
          </StyledLeftSection>

          <StyledCenterSection>
            <RainbowBlinkingText>{TEXTS.ui.demoDataNotice}</RainbowBlinkingText>
          </StyledCenterSection>

          <StyledRightSection>
            <StyledLikeBadge>
              <StyledHeartIcon
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </StyledHeartIcon>
            </StyledLikeBadge>
          </StyledRightSection>
        </StyledContent>
      </StyledContainer>
    </StyledHeaderContainer>
  );
}
