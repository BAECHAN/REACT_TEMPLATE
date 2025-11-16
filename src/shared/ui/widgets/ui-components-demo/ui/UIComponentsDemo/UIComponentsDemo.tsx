import { Button } from '@/shared/ui/atoms/button/Button';
import { Input } from '@/shared/ui/atoms/input/Input';
import { Label } from '@/shared/ui/atoms/label/Label';
import { Textarea } from '@/shared/ui/atoms/textarea/Textarea';
import { FormGroup } from '@/shared/ui/elements/form-group/FormGroup';
import { Section } from '@/shared/ui/elements/section/Section';
import { TEXTS } from '@/shared/config/texts';
import {
  StyledContainer,
  StyledSection,
  StyledSectionTitle,
  StyledDemoGrid,
  StyledDemoItem,
} from './UIComponentsDemo.styles';

export function UIComponentsDemo() {
  return (
    <StyledSection data-fsd-path="shared/ui/widgets/ui-components-demo">
      <StyledSectionTitle>공통 UI 컴포넌트 예제</StyledSectionTitle>
      <StyledContainer>
        <StyledDemoGrid>
          <StyledDemoItem>
            <h3>Button 컴포넌트</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </StyledDemoItem>

          <StyledDemoItem>
            <h3>Input 컴포넌트</h3>
            <FormGroup>
              <Label htmlFor="email">{TEXTS.labels.email}</Label>
              <Input id="email" type="email" placeholder={TEXTS.placeholders.email} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">{TEXTS.labels.password}</Label>
              <Input id="password" type="password" placeholder={TEXTS.placeholders.password} />
            </FormGroup>
          </StyledDemoItem>

          <StyledDemoItem>
            <h3>Textarea 컴포넌트</h3>
            <FormGroup>
              <Label htmlFor="message">{TEXTS.labels.message}</Label>
              <Textarea id="message" placeholder={TEXTS.placeholders.message} rows={4} />
            </FormGroup>
          </StyledDemoItem>

          <StyledDemoItem>
            <h3>Section 컴포넌트</h3>
            <Section>
              <p>이것은 Section 컴포넌트입니다. 콘텐츠를 그룹화하는데 사용됩니다.</p>
            </Section>
          </StyledDemoItem>
        </StyledDemoGrid>
      </StyledContainer>
    </StyledSection>
  );
}
