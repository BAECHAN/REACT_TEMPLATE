/**
 * 레이어 구조 스캐너
 * 실제 프로젝트의 레이어 구조를 스캔하여 반환합니다.
 */

export interface LayerItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: LayerItem[];
  layer:
    | 'app'
    | 'pages'
    | 'domains/_common'
    | 'domains/features'
    | 'shared/elements'
    | 'shared/atoms'
    | 'shared/widgets';
}

export interface Layer {
  name:
    | 'app'
    | 'pages'
    | 'domains/_common'
    | 'domains/features'
    | 'shared/elements'
    | 'shared/atoms'
    | 'shared/widgets';
  description: string;
  color: string;
  items: LayerItem[];
}

const LAYER_CONFIG: Record<string, { description: string; color: string }> = {
  app: {
    description: '애플리케이션 초기화, 프로바이더, 라우팅',
    color: '#3F51B5', // Material Indigo 500
  },
  pages: {
    description: '페이지 컴포넌트 (라우트)',
    color: '#9C27B0', // Material Purple 500
  },
  'domains/_common': {
    description: '도메인 공통 코드 (API, 모델, 공통 UI)',
    color: '#9C27B0', // 보라색
  },
  'domains/features': {
    description: '도메인 기능 (비즈니스 기능, 사용자 액션)',
    color: '#03A9F4', // 하늘색
  },
  'shared/elements': {
    description: '공통 요소 컴포넌트 (Section, Grid, FormGroup 등)',
    color: '#E91E63', // 분홍색
  },
  'shared/atoms': {
    description: '원자 컴포넌트 (Button, Input, Label 등)',
    color: '#2196F3', // 파란색
  },
  'shared/widgets': {
    description: '공통 위젯 (Header, PageLayout 등)',
    color: '#4CAF50', // 초록색
  },
};

/**
 * 파일 경로를 파싱하여 레이어 구조를 생성합니다.
 */
function parsePathToLayer(path: string): {
  layer: string;
  segments: string[];
} | null {
  // src/ 이후의 경로를 추출
  const match = path.match(/^src\/(app|pages|domains|widgets|features|entities|shared)\/(.+)$/);
  if (!match || match.length < 3) return null;

  let layer = match[1];
  const rest = match[2];
  if (!layer || !rest) return null;

  const segments = rest.split('/').filter(Boolean);

  // 세분화된 레이어로 매핑 (segments는 그대로 유지)
  if (layer === 'domains') {
    // domains 내부에서 _common과 features 구분
    if (segments[1] === '_common') {
      layer = 'domains/_common';
    } else if (segments[1] === 'features') {
      layer = 'domains/features';
    } else {
      // domains의 다른 구조는 common으로 처리
      layer = 'domains/_common';
    }
  } else if (layer === 'shared') {
    // shared/ui 내부 구조 구분
    if (segments[0] === 'ui') {
      if (segments[1] === 'elements') {
        layer = 'shared/elements';
      } else if (segments[1] === 'atoms') {
        layer = 'shared/atoms';
      } else if (segments[1] === 'widgets') {
        layer = 'shared/widgets';
      } else {
        // shared/ui의 다른 구조는 elements로 처리
        layer = 'shared/elements';
      }
    } else {
      // shared의 다른 부분은 그대로 유지 (api, utils, config 등)
      return null; // shared의 ui가 아닌 부분은 제외
    }
  } else if (layer === 'widgets' || layer === 'features' || layer === 'entities') {
    // 레거시 경로 처리
    layer = 'domains/features';
  }

  return { layer, segments };
}

/**
 * 파일 경로 목록을 레이어 트리 구조로 변환합니다.
 */
export function scanLayerStructure(): Layer[] {
  // Vite의 import.meta.glob을 사용하여 모든 파일을 가져옵니다
  // 실제로는 빌드 타임에 이 정보를 생성해야 하지만,
  // 여기서는 동적으로 스캔하는 방식으로 구현합니다

  const layers: Record<string, Map<string, LayerItem>> = {
    app: new Map(),
    pages: new Map(),
    'domains/_common': new Map(),
    'domains/features': new Map(),
    'shared/elements': new Map(),
    'shared/atoms': new Map(),
    'shared/widgets': new Map(),
  };

  // 모든 파일을 가져옵니다 (import.meta.glob 사용)
  const modules = import.meta.glob('/src/**/*.{ts,tsx}', { eager: false });

  Object.keys(modules).forEach((path) => {
    const parsed = parsePathToLayer(path);
    if (!parsed) return;

    const { layer, segments } = parsed;
    if (!layers[layer]) return;

    // 트리 구조 생성
    let currentMap = layers[layer];
    let currentPath = '';

    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1;
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      if (!currentMap.has(currentPath)) {
        // 원본 경로를 그대로 사용
        const fullPath = path.replace(/^\/src\//, 'src/');

        currentMap.set(currentPath, {
          name: segment,
          path: fullPath,
          type: isLast ? 'file' : 'directory',
          layer: layer as LayerItem['layer'],
          children: isLast ? undefined : [],
        });
      }

      const item = currentMap.get(currentPath)!;
      if (!isLast && item.children) {
        // 다음 레벨을 위한 새로운 Map 생성
        const childMap = new Map<string, LayerItem>();
        item.children.forEach((child) => {
          childMap.set(child.name, child);
        });
        currentMap = childMap;
      }
    });
  });

  // Map을 배열로 변환하고 정렬
  const result: Layer[] = Object.entries(layers).map(([layerName, itemsMap]) => {
    const items = Array.from(itemsMap.values())
      .filter((item) => {
        // 최상위 레벨 아이템만 반환 (중복 제거)
        const pathParts = item.path.split('/');
        return pathParts.length <= 3 || (pathParts.length === 4 && item.type === 'file');
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      name: layerName as Layer['name'],
      description: LAYER_CONFIG[layerName]?.description || '',
      color: LAYER_CONFIG[layerName]?.color || '#000000',
      items,
    };
  });

  return result;
}

/**
 * 실제 파일 시스템을 기반으로 레이어 구조를 스캔합니다.
 * 이 함수는 정적으로 정의된 프로젝트 구조를 반환합니다.
 */
export function getLayerStructure(): Layer[] {
  return [
    {
      name: 'app',
      description: '애플리케이션 초기화, 프로바이더, 라우팅',
      color: '#3F51B5', // Material Indigo 500
      items: [
        {
          name: 'App.tsx',
          path: 'src/app/App.tsx',
          type: 'file',
          layer: 'app',
        },
        {
          name: 'providers',
          path: 'src/app/providers',
          type: 'directory',
          layer: 'app',
          children: [
            {
              name: 'QueryProvider.tsx',
              path: 'src/app/providers/QueryProvider.tsx',
              type: 'file',
              layer: 'app',
            },
            {
              name: 'RouterProvider.tsx',
              path: 'src/app/providers/RouterProvider.tsx',
              type: 'file',
              layer: 'app',
            },
            {
              name: 'ThemeProvider.tsx',
              path: 'src/app/providers/ThemeProvider.tsx',
              type: 'file',
              layer: 'app',
            },
          ],
        },
        {
          name: 'routes',
          path: 'src/app/routes',
          type: 'directory',
          layer: 'app',
          children: [
            { name: 'index.tsx', path: 'src/app/routes/index.tsx', type: 'file', layer: 'app' },
          ],
        },
      ],
    },
    {
      name: 'pages',
      description: '페이지 컴포넌트 (라우트)',
      color: '#9C27B0', // Material Purple 500
      items: [
        {
          name: 'home',
          path: 'src/pages/home',
          type: 'directory',
          layer: 'pages',
          children: [
            {
              name: 'HomePage.tsx',
              path: 'src/pages/home/HomePage.tsx',
              type: 'file',
              layer: 'pages',
            },
            {
              name: 'HomePage.styles.ts',
              path: 'src/pages/home/HomePage.styles.ts',
              type: 'file',
              layer: 'pages',
            },
          ],
        },
        {
          name: 'post',
          path: 'src/pages/post',
          type: 'directory',
          layer: 'pages',
          children: [
            {
              name: 'PostListPage',
              path: 'src/pages/post/PostListPage',
              type: 'directory',
              layer: 'pages',
              children: [
                {
                  name: 'PostListPage.tsx',
                  path: 'src/pages/post/PostListPage/PostListPage.tsx',
                  type: 'file',
                  layer: 'pages',
                },
                {
                  name: 'PostListPage.styles.ts',
                  path: 'src/pages/post/PostListPage/PostListPage.styles.ts',
                  type: 'file',
                  layer: 'pages',
                },
              ],
            },
            {
              name: 'CreatePostPage',
              path: 'src/pages/post/CreatePostPage',
              type: 'directory',
              layer: 'pages',
              children: [
                {
                  name: 'CreatePostPage.tsx',
                  path: 'src/pages/post/CreatePostPage/CreatePostPage.tsx',
                  type: 'file',
                  layer: 'pages',
                },
              ],
            },
          ],
        },
        {
          name: 'user',
          path: 'src/pages/user',
          type: 'directory',
          layer: 'pages',
          children: [
            {
              name: 'UserListPage',
              path: 'src/pages/user/UserListPage',
              type: 'directory',
              layer: 'pages',
              children: [
                {
                  name: 'UserListPage.tsx',
                  path: 'src/pages/user/UserListPage/UserListPage.tsx',
                  type: 'file',
                  layer: 'pages',
                },
              ],
            },
          ],
        },
        {
          name: 'architecture',
          path: 'src/pages/architecture',
          type: 'directory',
          layer: 'pages',
          children: [
            {
              name: 'ArchitecturePage',
              path: 'src/pages/architecture/ArchitecturePage',
              type: 'directory',
              layer: 'pages',
              children: [
                {
                  name: 'ArchitecturePage.tsx',
                  path: 'src/pages/architecture/ArchitecturePage/ArchitecturePage.tsx',
                  type: 'file',
                  layer: 'pages',
                },
                {
                  name: 'ArchitecturePage.styles.ts',
                  path: 'src/pages/architecture/ArchitecturePage/ArchitecturePage.styles.ts',
                  type: 'file',
                  layer: 'pages',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'domains/_common',
      description: '도메인 공통 코드 (API, 모델, 공통 UI)',
      color: '#9C27B0', // 보라색
      items: [
        {
          name: 'post',
          path: 'src/domains/post/_common',
          type: 'directory',
          layer: 'domains/_common',
          children: [
            {
              name: 'api',
              path: 'src/domains/post/_common/api',
              type: 'directory',
              layer: 'domains/_common',
              children: [
                {
                  name: 'posts.api.ts',
                  path: 'src/domains/post/_common/api/posts.api.ts',
                  type: 'file',
                  layer: 'domains/_common',
                },
                {
                  name: 'posts.queries.ts',
                  path: 'src/domains/post/_common/api/posts.queries.ts',
                  type: 'file',
                  layer: 'domains/_common',
                },
              ],
            },
            {
              name: 'ui',
              path: 'src/domains/post/_common/ui',
              type: 'directory',
              layer: 'domains/_common',
              children: [
                {
                  name: 'PostCard',
                  path: 'src/domains/post/_common/ui/PostCard',
                  type: 'directory',
                  layer: 'domains/_common',
                  children: [
                    {
                      name: 'PostCard.tsx',
                      path: 'src/domains/post/_common/ui/PostCard/PostCard.tsx',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                    {
                      name: 'PostCard.styles.ts',
                      path: 'src/domains/post/_common/ui/PostCard/PostCard.styles.ts',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'user',
          path: 'src/domains/user/_common',
          type: 'directory',
          layer: 'domains/_common',
          children: [
            {
              name: 'api',
              path: 'src/domains/user/_common/api',
              type: 'directory',
              layer: 'domains/_common',
              children: [
                {
                  name: 'users.api.ts',
                  path: 'src/domains/user/_common/api/users.api.ts',
                  type: 'file',
                  layer: 'domains/_common',
                },
                {
                  name: 'users.queries.ts',
                  path: 'src/domains/user/_common/api/users.queries.ts',
                  type: 'file',
                  layer: 'domains/_common',
                },
              ],
            },
            {
              name: 'ui',
              path: 'src/domains/user/_common/ui',
              type: 'directory',
              layer: 'domains/_common',
              children: [
                {
                  name: 'UserCard',
                  path: 'src/domains/user/_common/ui/UserCard',
                  type: 'directory',
                  layer: 'domains/_common',
                  children: [
                    {
                      name: 'UserCard.tsx',
                      path: 'src/domains/user/_common/ui/UserCard/UserCard.tsx',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                    {
                      name: 'UserCard.styles.ts',
                      path: 'src/domains/user/_common/ui/UserCard/UserCard.styles.ts',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'counter-example',
          path: 'src/domains/counter-example',
          type: 'directory',
          layer: 'domains/_common',
          children: [
            {
              name: 'ui',
              path: 'src/domains/counter-example/ui',
              type: 'directory',
              layer: 'domains/_common',
              children: [
                {
                  name: 'Counter',
                  path: 'src/domains/counter-example/ui/Counter',
                  type: 'directory',
                  layer: 'domains/_common',
                  children: [
                    {
                      name: 'Counter.tsx',
                      path: 'src/domains/counter-example/ui/Counter/Counter.tsx',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                    {
                      name: 'Counter.styles.ts',
                      path: 'src/domains/counter-example/ui/Counter/Counter.styles.ts',
                      type: 'file',
                      layer: 'domains/_common',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'domains/features',
      description: '도메인 기능 (비즈니스 기능, 사용자 액션)',
      color: '#03A9F4', // 하늘색
      items: [
        {
          name: 'post',
          path: 'src/domains/post/features',
          type: 'directory',
          layer: 'domains/features',
          children: [
            {
              name: 'post-list',
              path: 'src/domains/post/features/post-list',
              type: 'directory',
              layer: 'domains/features',
              children: [
                {
                  name: 'PostList',
                  path: 'src/domains/post/features/post-list/ui/PostList',
                  type: 'directory',
                  layer: 'domains/features',
                  children: [
                    {
                      name: 'PostList.tsx',
                      path: 'src/domains/post/features/post-list/ui/PostList/PostList.tsx',
                      type: 'file',
                      layer: 'domains/features',
                    },
                  ],
                },
              ],
            },
            {
              name: 'create-post',
              path: 'src/domains/post/features/create-post',
              type: 'directory',
              layer: 'domains/features',
              children: [
                {
                  name: 'CreatePostForm',
                  path: 'src/domains/post/features/create-post/ui/CreatePostForm',
                  type: 'directory',
                  layer: 'domains/features',
                  children: [
                    {
                      name: 'CreatePostForm.tsx',
                      path: 'src/domains/post/features/create-post/ui/CreatePostForm/CreatePostForm.tsx',
                      type: 'file',
                      layer: 'domains/features',
                    },
                    {
                      name: 'CreatePostForm.styles.ts',
                      path: 'src/domains/post/features/create-post/ui/CreatePostForm/CreatePostForm.styles.ts',
                      type: 'file',
                      layer: 'domains/features',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'user',
          path: 'src/domains/user/features',
          type: 'directory',
          layer: 'domains/features',
          children: [
            {
              name: 'user-list',
              path: 'src/domains/user/features/user-list',
              type: 'directory',
              layer: 'domains/features',
              children: [
                {
                  name: 'UserList',
                  path: 'src/domains/user/features/user-list/ui/UserList',
                  type: 'directory',
                  layer: 'domains/features',
                  children: [
                    {
                      name: 'UserList.tsx',
                      path: 'src/domains/user/features/user-list/ui/UserList/UserList.tsx',
                      type: 'file',
                      layer: 'domains/features',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'shared/elements',
      description: '공통 요소 컴포넌트 (Section, Grid, FormGroup 등)',
      color: '#E91E63', // 분홍색
      items: [
        {
          name: 'section',
          path: 'src/shared/ui/elements/section',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'Section.tsx',
              path: 'src/shared/ui/elements/section/Section.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'Section.styles.ts',
              path: 'src/shared/ui/elements/section/Section.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'grid',
          path: 'src/shared/ui/elements/grid',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'Grid.tsx',
              path: 'src/shared/ui/elements/grid/Grid.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'Grid.styles.ts',
              path: 'src/shared/ui/elements/grid/Grid.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'form-group',
          path: 'src/shared/ui/elements/form-group',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'FormGroup.tsx',
              path: 'src/shared/ui/elements/form-group/FormGroup.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'FormGroup.styles.ts',
              path: 'src/shared/ui/elements/form-group/FormGroup.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'async-boundary',
          path: 'src/shared/ui/elements/async-boundary',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'AsyncBoundary.tsx',
              path: 'src/shared/ui/elements/async-boundary/AsyncBoundary.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'loading-spinner',
          path: 'src/shared/ui/elements/loading-spinner',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'LoadingSpinner.tsx',
              path: 'src/shared/ui/elements/loading-spinner/LoadingSpinner.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'LoadingSpinner.styles.ts',
              path: 'src/shared/ui/elements/loading-spinner/LoadingSpinner.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'error-display',
          path: 'src/shared/ui/elements/error-display',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'ErrorDisplay.tsx',
              path: 'src/shared/ui/elements/error-display/ErrorDisplay.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'ErrorDisplay.styles.ts',
              path: 'src/shared/ui/elements/error-display/ErrorDisplay.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'empty-state',
          path: 'src/shared/ui/elements/empty-state',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'EmptyState.tsx',
              path: 'src/shared/ui/elements/empty-state/EmptyState.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'EmptyState.styles.ts',
              path: 'src/shared/ui/elements/empty-state/EmptyState.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
        {
          name: 'back-button',
          path: 'src/shared/ui/elements/back-button',
          type: 'directory',
          layer: 'shared/elements',
          children: [
            {
              name: 'BackButton.tsx',
              path: 'src/shared/ui/elements/back-button/BackButton.tsx',
              type: 'file',
              layer: 'shared/elements',
            },
            {
              name: 'BackButton.styles.ts',
              path: 'src/shared/ui/elements/back-button/BackButton.styles.ts',
              type: 'file',
              layer: 'shared/elements',
            },
          ],
        },
      ],
    },
    {
      name: 'shared/atoms',
      description: '원자 컴포넌트 (Button, Input, Label 등)',
      color: '#2196F3', // 파란색
      items: [
        {
          name: 'button',
          path: 'src/shared/ui/atoms/button',
          type: 'directory',
          layer: 'shared/atoms',
          children: [
            {
              name: 'Button.tsx',
              path: 'src/shared/ui/atoms/button/Button.tsx',
              type: 'file',
              layer: 'shared/atoms',
            },
            {
              name: 'Button.styles.ts',
              path: 'src/shared/ui/atoms/button/Button.styles.ts',
              type: 'file',
              layer: 'shared/atoms',
            },
          ],
        },
        {
          name: 'input',
          path: 'src/shared/ui/atoms/input',
          type: 'directory',
          layer: 'shared/atoms',
          children: [
            {
              name: 'Input.tsx',
              path: 'src/shared/ui/atoms/input/Input.tsx',
              type: 'file',
              layer: 'shared/atoms',
            },
            {
              name: 'Input.styles.ts',
              path: 'src/shared/ui/atoms/input/Input.styles.ts',
              type: 'file',
              layer: 'shared/atoms',
            },
          ],
        },
        {
          name: 'label',
          path: 'src/shared/ui/atoms/label',
          type: 'directory',
          layer: 'shared/atoms',
          children: [
            {
              name: 'Label.tsx',
              path: 'src/shared/ui/atoms/label/Label.tsx',
              type: 'file',
              layer: 'shared/atoms',
            },
            {
              name: 'Label.styles.ts',
              path: 'src/shared/ui/atoms/label/Label.styles.ts',
              type: 'file',
              layer: 'shared/atoms',
            },
          ],
        },
        {
          name: 'textarea',
          path: 'src/shared/ui/atoms/textarea',
          type: 'directory',
          layer: 'shared/atoms',
          children: [
            {
              name: 'Textarea.tsx',
              path: 'src/shared/ui/atoms/textarea/Textarea.tsx',
              type: 'file',
              layer: 'shared/atoms',
            },
            {
              name: 'Textarea.styles.ts',
              path: 'src/shared/ui/atoms/textarea/Textarea.styles.ts',
              type: 'file',
              layer: 'shared/atoms',
            },
          ],
        },
      ],
    },
    {
      name: 'shared/widgets',
      description: '공통 위젯 (Header, PageLayout 등)',
      color: '#4CAF50', // 초록색
      items: [
        {
          name: 'header',
          path: 'src/shared/ui/widgets/header',
          type: 'directory',
          layer: 'shared/widgets',
          children: [
            {
              name: 'Header',
              path: 'src/shared/ui/widgets/header/ui/Header',
              type: 'directory',
              layer: 'shared/widgets',
              children: [
                {
                  name: 'Header.tsx',
                  path: 'src/shared/ui/widgets/header/ui/Header/Header.tsx',
                  type: 'file',
                  layer: 'shared/widgets',
                },
                {
                  name: 'Header.styles.ts',
                  path: 'src/shared/ui/widgets/header/ui/Header/Header.styles.ts',
                  type: 'file',
                  layer: 'shared/widgets',
                },
              ],
            },
          ],
        },
        {
          name: 'page-layout',
          path: 'src/shared/ui/widgets/page-layout',
          type: 'directory',
          layer: 'shared/widgets',
          children: [
            {
              name: 'PageLayout',
              path: 'src/shared/ui/widgets/page-layout/ui/PageLayout',
              type: 'directory',
              layer: 'shared/widgets',
              children: [
                {
                  name: 'PageLayout.tsx',
                  path: 'src/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout.tsx',
                  type: 'file',
                  layer: 'shared/widgets',
                },
                {
                  name: 'PageLayout.styles.ts',
                  path: 'src/shared/ui/widgets/page-layout/ui/PageLayout/PageLayout.styles.ts',
                  type: 'file',
                  layer: 'shared/widgets',
                },
              ],
            },
          ],
        },
        {
          name: 'layer-visualizer',
          path: 'src/shared/ui/widgets/layer-visualizer',
          type: 'directory',
          layer: 'shared/widgets',
          children: [
            {
              name: 'LayerVisualizer',
              path: 'src/shared/ui/widgets/layer-visualizer/ui/LayerVisualizer',
              type: 'directory',
              layer: 'shared/widgets',
              children: [
                {
                  name: 'LayerVisualizer.tsx',
                  path: 'src/shared/ui/widgets/layer-visualizer/ui/LayerVisualizer/LayerVisualizer.tsx',
                  type: 'file',
                  layer: 'shared/widgets',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
