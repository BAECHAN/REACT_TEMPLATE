import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  StyledOverlayContainer,
  StyledOverlayLabel,
  StyledOverlayBox,
  StyledToggleButton,
} from './LayerOverlay.styles';

interface OverlayElement {
  element: HTMLElement;
  path: string;
  layer: string;
  rect: DOMRect;
}

const LAYER_COLORS: Record<string, string> = {
  app: '#3F51B5', // Material Indigo 500
  pages: '#9C27B0', // Material Purple 500
  'domains/_common': '#9C27B0', // 보라색
  'domains/common': '#9C27B0', // 레거시 매핑
  'domains/features': '#03A9F4', // 하늘색
  'shared/elements': '#E91E63', // 분홍색
  'shared/atoms': '#2196F3', // 파란색
  'shared/widgets': '#4CAF50', // 초록색
  // 레거시 매핑
  domains: '#03A9F4',
  widgets: '#4CAF50',
  features: '#03A9F4',
  entities: '#03A9F4',
  shared: '#9E9E9E', // Material Grey 500
};

export function LayerOverlay() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [overlays, setOverlays] = useState<OverlayElement[]>([]);

  useEffect(() => {
    if (!isEnabled) {
      setOverlays([]);
      return;
    }

    const updateOverlays = () => {
      const elements = document.querySelectorAll('[data-fsd-path]');
      const newOverlays: OverlayElement[] = [];

      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const path = el.getAttribute('data-fsd-path');
          if (path) {
            const pathParts = path.split('/');
            let layer = pathParts[0];

            // 세분화된 레이어로 매핑
            if (layer === 'domains') {
              // domains/_common 또는 domains/features 구분
              // 경로 형식: domains/_common/... 또는 domains/features/...
              if (pathParts[1] === '_common') {
                layer = 'domains/_common';
              } else if (pathParts[1] === 'features') {
                layer = 'domains/features';
              } else {
                // domains의 다른 구조는 _common으로 처리
                layer = 'domains/_common';
              }
            } else if (layer === 'shared') {
              // shared/ui/elements, shared/ui/atoms, shared/ui/widgets 형식
              // 경로 형식: shared/ui/atoms/... 또는 shared/ui/elements/... 또는 shared/ui/widgets/...
              if (pathParts.length >= 2 && pathParts[0] === 'shared' && pathParts[1] === 'ui') {
                if (pathParts[2] === 'elements') {
                  layer = 'shared/elements';
                } else if (pathParts[2] === 'atoms') {
                  layer = 'shared/atoms';
                } else if (pathParts[2] === 'widgets') {
                  layer = 'shared/widgets';
                } else {
                  // shared/ui의 다른 구조는 elements로 처리
                  layer = 'shared/elements';
                }
              } else {
                // shared의 다른 부분은 제외
                return;
              }
            } else if (layer === 'widgets') {
              // 레거시 경로 처리 - widgets는 shared/ui/widgets로 매핑
              layer = 'shared/widgets';
            } else if (layer === 'features' || layer === 'entities') {
              // 레거시 경로 처리
              layer = 'domains/features';
            }

            // shared 레이어 중 elements, atoms, widgets만 오버레이에 표시
            if (!layer || (layer.startsWith('shared') && !['shared/elements', 'shared/atoms', 'shared/widgets'].includes(layer))) {
              return;
            }
            const rect = el.getBoundingClientRect();
            newOverlays.push({
              element: el,
              path,
              layer,
              rect,
            });
          }
        }
      });

      setOverlays(newOverlays);
    };

    updateOverlays();

    const observer = new MutationObserver(updateOverlays);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-fsd-path'],
    });

    const resizeObserver = new ResizeObserver(updateOverlays);
    document.querySelectorAll('[data-fsd-path]').forEach((el) => {
      resizeObserver.observe(el);
    });

    const handleScroll = () => {
      requestAnimationFrame(updateOverlays);
    };
    const handleResize = () => {
      requestAnimationFrame(updateOverlays);
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <StyledToggleButton
        onClick={() => setIsEnabled(!isEnabled)}
        $isActive={isEnabled}
        title="레이어 오버레이 토글"
      >
        {isEnabled ? '🔴' : '⚪'} 레이어
      </StyledToggleButton>
      {isEnabled &&
        createPortal(
          <>
            {overlays.map((overlay, index) => {
              const color = LAYER_COLORS[overlay.layer] || '#666';
              // 화면 상단에 가까우면(30px 이내) 레이블을 안쪽에 표시
              const isNearTop = overlay.rect.top < 30;
              const labelTop = isNearTop ? overlay.rect.top + 4 : overlay.rect.top - 28;

              return (
                <div key={`${overlay.path}-${index}`}>
                  <StyledOverlayLabel
                    $color={color}
                    style={{
                      position: 'fixed',
                      top: `${labelTop}px`,
                      left: `${overlay.rect.left}px`,
                      pointerEvents: 'none',
                      zIndex: 10000,
                    }}
                  >
                    {overlay.path}
                  </StyledOverlayLabel>
                  <StyledOverlayContainer
                    style={{
                      position: 'fixed',
                      top: `${overlay.rect.top}px`,
                      left: `${overlay.rect.left}px`,
                      width: `${overlay.rect.width}px`,
                      height: `${overlay.rect.height}px`,
                      pointerEvents: 'none',
                      zIndex: 9999,
                    }}
                  >
                    <StyledOverlayBox $color={color} />
                  </StyledOverlayContainer>
                </div>
              );
            })}
          </>,
          document.body
        )}
    </>
  );
}
