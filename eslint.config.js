import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import boundariesPlugin from 'eslint-plugin-boundaries';
import unicornPlugin from 'eslint-plugin-unicorn';
import prettierConfig from 'eslint-config-prettier';

// 파일명 약어 허용 목록
// PascalCase 규칙에서 예외로 처리할 약어들
const ALLOWED_ACRONYMS = ['UI', 'FSD']; // UI: User Interface, FSD: Feature-Sliced Design

export default [
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ['dist/**/*', 'node_modules/**/*', '**/*.md', '**/*.svg'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/main.tsx', '**/*.styles.ts', '**/*.styles.tsx', 'src/*.d.ts'],
    plugins: {
      import: importPlugin,
      boundaries: boundariesPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 타입 정보가 필요한 규칙을 사용하므로 project 옵션 유지
        // 단, 스타일 파일은 제외
        project: ['./tsconfig.app.json'],
      },
      globals: {
        console: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'domains', pattern: 'src/domains/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      'boundaries/include': ['src/**/*'],
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: 'error',
      'no-var': 'error',
      'no-empty-pattern': 'error',
      'no-undef': 'off',
      'import/no-default-export': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'none',
        },
      ],
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      // TypeScript 타입 체크 강화
      // 타입 정보가 필요한 규칙이지만, 타입 에러가 있어도 ESLint가 실패하지 않도록 warn으로 설정
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      // Boundaries 규칙: 레이어 간 import 규칙 강제
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['app'],
              allow: ['pages', 'shared'],
            },
            {
              from: ['pages'],
              allow: ['domains', 'shared'],
            },
            {
              from: ['domains'],
              allow: ['shared'],
            },
            {
              from: ['shared'],
              allow: [],
            },
          ],
        },
      ],
    },
  },
  // shared/ui/widgets 내부의 데모 위젯은 boundaries 규칙 예외 (domains import 허용)
  {
    files: ['src/shared/ui/widgets/**/*.{ts,tsx}'],
    plugins: {
      boundaries: boundariesPlugin,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'domains', pattern: 'src/domains/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      'boundaries/include': ['src/**/*'],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['domains', 'shared'],
            },
          ],
        },
      ],
    },
  },
  // 스타일 파일에 대한 특별 규칙
  {
    files: ['**/*.styles.ts', '**/*.styles.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 타입 정보가 필요한 규칙을 사용하지 않으므로 project 옵션 제거
        // 타입 체크는 TypeScript 컴파일러가 담당
      },
    },
    rules: {
      // 스타일 파일에서는 타입 정보가 필요한 규칙 비활성화
      // 타입 에러는 TypeScript 컴파일러가 체크하므로 ESLint에서 중복 체크 불필요
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  // Import 규칙: 일반 파일은 절대 경로(@/) 사용 강제, 스타일 파일은 같은 디렉토리에서만 상대 경로(./) 사용
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [
      '**/index.{ts,tsx}',
      'src/main.tsx',
      'src/app/App.tsx',
      '**/*.styles.ts',
      '**/*.styles.tsx',
    ],
    plugins: {
      'custom-import': {
        rules: {
          'no-relative-import-except-styles': {
            meta: {
              type: 'problem',
              docs: {
                description:
                  '일반 파일은 절대 경로 사용 강제, 스타일 파일은 같은 디렉토리에서만 상대 경로 허용',
              },
              messages: {
                relativeImport:
                  './ 대신 @/를 사용한 절대 경로 import를 사용해주세요. (단, 스타일 파일은 같은 디렉토리에서 ./로 import 가능)',
                absoluteStylesImport:
                  '❌ 스타일 파일은 같은 디렉토리 내에서만 상대 경로(./)로 import해야 합니다 (예: "./ComponentName.styles"). 절대 경로(@/)나 다른 디렉토리(../)는 사용할 수 없습니다.',
              },
            },
            create(context) {
              return {
                ImportDeclaration(node) {
                  const importPath = node.source.value;
                  if (typeof importPath !== 'string') return;

                  // 스타일 파일인지 확인 (.styles 포함 여부)
                  const isStylesFile = importPath.includes('.styles');

                  // 절대 경로로 스타일 파일 import하는 경우 에러
                  if (importPath.startsWith('@/') && isStylesFile) {
                    context.report({
                      node,
                      messageId: 'absoluteStylesImport',
                    });
                    return;
                  }

                  // 상위 디렉토리로 가는 스타일 파일 import 금지
                  if (importPath.startsWith('../') && isStylesFile) {
                    context.report({
                      node,
                      messageId: 'absoluteStylesImport',
                    });
                    return;
                  }

                  // 상대 경로인지 확인
                  if (importPath.startsWith('./') || importPath.startsWith('../')) {
                    // 같은 디렉토리에서 ./로 시작하는 스타일 파일은 허용
                    if (importPath.startsWith('./') && isStylesFile) {
                      return;
                    }
                    // 스타일 파일이 아닌 경우 에러
                    if (!isStylesFile) {
                      context.report({
                        node,
                        messageId: 'relativeImport',
                      });
                    }
                  }
                },
              };
            },
          },
        },
      },
    },
    rules: {
      'custom-import/no-relative-import-except-styles': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // 상위 디렉토리로 가는 상대 경로 금지 (일반 파일)
              group: [
                '../**/*.ts',
                '../**/*.tsx',
                '../**/*.js',
                '../**/*.jsx',
                '../../**/*.ts',
                '../../**/*.tsx',
                '../../../**/*.ts',
                '../../../**/*.tsx',
                '..',
                '../*',
              ],
              message: '../ 대신 @/를 사용한 절대 경로 import를 사용해주세요.',
            },
          ],
        },
      ],
    },
  },
  // 파일 명명 규칙 (unicorn/filename-case)
  // 비-ASCII 문자 검사 (한글 등) - 커스텀 규칙
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/index.{ts,tsx}'],
    plugins: {
      'custom-filename': {
        rules: {
          'no-non-ascii-filename': {
            meta: {
              type: 'problem',
              docs: {
                description: '파일명에 비-ASCII 문자 사용 금지',
              },
              messages: {
                nonAscii:
                  '파일명 "{{filename}}"에 비-ASCII 문자가 포함되어 있습니다. ASCII 문자만 사용해주세요.',
              },
            },
            create(context) {
              return {
                Program(node) {
                  const filename = context.getFilename();
                  const basename = filename.split('/').pop() || '';
                  // 확장자 제거
                  const nameWithoutExt = basename.replace(/\.(ts|tsx|js|jsx)$/, '');
                  // 비-ASCII 문자 검사 (한글, 한자, 일본어 등)
                  const nonAsciiRegex = /[^\x00-\x7F]/;
                  if (nonAsciiRegex.test(nameWithoutExt)) {
                    context.report({
                      node,
                      messageId: 'nonAscii',
                      data: {
                        filename: basename,
                      },
                    });
                  }
                },
              };
            },
          },
        },
      },
    },
    rules: {
      'custom-filename/no-non-ascii-filename': 'error',
    },
  },
  // 컴포넌트 파일: PascalCase
  {
    files: ['src/**/*.tsx'],
    ignores: [
      'src/main.tsx',
      'src/App.tsx',
      '**/index.tsx',
      // 약어로 시작하는 파일명 허용 (UI, FSD 등)
      ...ALLOWED_ACRONYMS.map((acronym) => `**/${acronym}*.tsx`),
    ],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // 스타일 파일: PascalCase.styles.ts
  {
    files: ['src/**/*.styles.ts'],
    ignores: [
      // 약어로 시작하는 스타일 파일명 허용 (UI, FSD 등)
      ...ALLOWED_ACRONYMS.map((acronym) => `**/${acronym}*.styles.ts`),
    ],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // 유틸리티 파일: kebab-case (common.util.ts, date.util.ts 등)
  {
    files: ['src/**/utils/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },

  // API 파일: kebab-case.api.ts
  {
    files: ['src/**/*.api.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // Queries 파일: kebab-case.queries.ts
  {
    files: ['src/**/*.queries.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // 타입 파일: camelCase (shared/types 폴더)
  {
    files: ['src/**/types/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // Schema 파일: kebab-case.schema.ts
  {
    files: ['src/**/*.schema.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // 설정 파일: camelCase (config 폴더)
  {
    files: ['src/**/config/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // index.ts 파일은 예외 처리
  {
    files: ['**/index.{ts,tsx}'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];
