import LoadingSuspenseSpinner from '@components/common/LoadingSuspenseSpinner';
import { Suspense } from 'react';

export const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  fallback: React.ReactNode = <LoadingSuspenseSpinner fullScreen />
) => {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};
