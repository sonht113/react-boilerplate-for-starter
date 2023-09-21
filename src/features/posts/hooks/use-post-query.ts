import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';

import postApi from '../services/post.api';
import { PostData } from '../services/types';
import { QueryOptions } from '@/ts/types';

const posts = createQueryKeys('posts', {
  list: () => ({
    queryKey: ['posts'],
    queryFn: () => postApi.getList(),
  }),
});

export const usePostListQuery = <T = PostData[]>(
  options: QueryOptions<T, PostData[]> = {},
) => {
  return useQuery({
    ...posts.list(),
    keepPreviousData: true,
    ...options,
  });
};
