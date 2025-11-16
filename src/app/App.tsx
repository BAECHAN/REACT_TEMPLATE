import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from './providers/RouterProvider';
import { NotFoundPage } from '@/pages/404/NotFoundPage';
import { LayerOverlay } from '@/shared/ui/widgets/layer-visualizer/ui/LayerOverlay/LayerOverlay';

// Router 컨텍스트 밖에서 사용할 에러 페이지
const ErrorFallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '16px',
        gap: '16px',
      }}
    >
      <h1>오류가 발생했습니다</h1>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        페이지 새로고침
      </button>
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorBoundary FallbackComponent={NotFoundPage}>
        <RouterProvider />
        <LayerOverlay />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
