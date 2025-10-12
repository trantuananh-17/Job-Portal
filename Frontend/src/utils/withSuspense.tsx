import LoadingSuspenseSpinner from '@components/common/LoadingSuspenseSpinner';
import { Suspense } from 'react';

export const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  fallback: React.ReactNode = <LoadingSuspenseSpinner fullScreen />
) => {
  return function WrappedWithSuspense(props: any) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const withSuspenseDashboard = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  fallback: React.ReactNode = <LoadingSuspenseSpinner />
) => {
  return function WrappedWithSuspense(props: any) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
};
