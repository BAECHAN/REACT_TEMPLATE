import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // 현재 모드(mode)에 따라 .env 파일들을 로드
  const env = loadEnv(mode, process.cwd(), '');

  // 환경 변수의 기본값 설정
  const API_URL = env.VITE_API_BASE_URL || 'http://localhost:3000'; // 기본값 설정

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      // 최신 브라우저 타겟 설정 (레거시 코드 제거)
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      // 압축 최적화 (esbuild가 더 빠름)
      minify: 'esbuild',
      cssMinify: true,
      // 소스맵은 프로덕션에서는 비활성화 (보안 및 성능)
      sourcemap: false,
      // 압축된 크기 리포트 비활성화 (빌드 시간 단축)
      reportCompressedSize: false,
      // CSS 코드 분할 활성화
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // 청크 네이밍 최적화
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(assetInfo.name || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          manualChunks: (id) => {
            // node_modules 청크 분리
            if (id.includes('node_modules')) {
              // React 코어는 가장 크고 중요하므로 별도 청크
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              // React Router는 별도 청크
              if (id.includes('react-router')) {
                return 'router-vendor';
              }
              // React Query는 별도 청크
              if (id.includes('@tanstack/react-query')) {
                return 'query-vendor';
              }
              // Form 관련 라이브러리
              if (
                id.includes('react-hook-form') ||
                id.includes('@hookform') ||
                id.includes('zod')
              ) {
                return 'form-vendor';
              }
              // UI 라이브러리
              if (id.includes('styled-components')) {
                return 'styled-vendor';
              }
              if (id.includes('react-spinners')) {
                return 'ui-vendor';
              }
              // 유틸리티
              if (id.includes('dayjs') || id.includes('zustand')) {
                return 'util-vendor';
              }
              // 나머지 node_modules는 별도 청크로
              return 'vendor';
            }
            // 내부 모듈도 청크 분리 (선택적)
            // 큰 페이지나 위젯은 별도 청크로 분리 가능
          },
          // 사용하지 않는 export 제거
          exports: 'named',
        },
        // Tree shaking 최적화
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __DEPLOY_ENV__: JSON.stringify(mode),
    },
    server: {
      fs: {
        deny: ['..'],
      },
      port: 7248,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          credentials: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''), // /api 제거
          cookieDomainRewrite: { '*': '' },
          cookiePathRewrite: { '*': '' },
        },
      },
    },
  };
});
