import { FC, ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useToast } from '@/hooks';

type Props = {
  children: ReactNode;
};

const QueryProvider: FC<Props> = ({ children }) => {
  const { toast } = useToast();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            onError: (error: unknown) => {
              void toast.error(
                `Something went wrong: ${
                  (
                    error as AxiosError<{
                      message: string;
                    }>
                  )?.response?.data.message || 'unknown'
                }`,
              );
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
