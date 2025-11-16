import {
  StyledSection,
  StyledSectionTitle,
  StyledSectionDescription,
  StyledAssetsTestContainer,
  StyledIconRow,
  StyledIconItem,
  StyledIconLabel,
  StyledImageRow,
  StyledImageItem,
  StyledImageLabel,
} from './AssetsDemo.styles';

export function AssetsDemo() {
  return (
    <StyledSection data-fsd-path="shared/ui/widgets/assets-demo">
      <StyledSectionTitle>Assets 테스트 (아이콘 및 이미지)</StyledSectionTitle>
      <StyledSectionDescription>
        public 폴더에서 제공하는 아이콘과 이미지를 테스트합니다.
      </StyledSectionDescription>
      <StyledAssetsTestContainer>
        <div>
          <h3>아이콘 테스트</h3>
          <StyledIconRow>
            <StyledIconItem>
              <img src="/icons/heart.svg" alt="Heart Icon" width="32" height="32" />
              <StyledIconLabel>HeartIcon</StyledIconLabel>
            </StyledIconItem>
            <StyledIconItem>
              <img src="/icons/star.svg" alt="Star Icon" width="32" height="32" />
              <StyledIconLabel>StarIcon</StyledIconLabel>
            </StyledIconItem>
            <StyledIconItem>
              <img src="/icons/check.svg" alt="Check Icon" width="32" height="32" />
              <StyledIconLabel>CheckIcon</StyledIconLabel>
            </StyledIconItem>
            <StyledIconItem>
              <img src="/icons/user.svg" alt="User Icon" width="32" height="32" />
              <StyledIconLabel>UserIcon</StyledIconLabel>
            </StyledIconItem>
          </StyledIconRow>
        </div>

        <div>
          <h3>이미지 테스트</h3>
          <StyledImageRow>
            <StyledImageItem>
              <img
                src="/images/no-image.svg"
                alt="No Image Placeholder"
                width="200"
                height="150"
                loading="lazy"
              />
              <StyledImageLabel>NoImage</StyledImageLabel>
            </StyledImageItem>
            <StyledImageItem>
              <img
                src="/images/logo-placeholder.svg"
                alt="Logo Placeholder"
                width="200"
                height="60"
                loading="lazy"
              />
              <StyledImageLabel>LogoPlaceholder</StyledImageLabel>
            </StyledImageItem>
          </StyledImageRow>
        </div>
      </StyledAssetsTestContainer>
    </StyledSection>
  );
}
