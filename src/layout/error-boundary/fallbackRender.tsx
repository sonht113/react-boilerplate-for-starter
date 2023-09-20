import { ReactNode } from 'react';

import { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components';

const fallbackRender: (props: FallbackProps) => ReactNode = ({
  error,
  resetErrorBoundary,
}: {
  error: Record<'message', string>;
  resetErrorBoundary: FallbackProps['resetErrorBoundary'];
}) => {
  return (
    <div role="alert">
      <span>Something went wrong:</span>
      <pre className="text-red-500">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export default fallbackRender;
