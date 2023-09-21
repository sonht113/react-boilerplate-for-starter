import { FC, useMemo } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { usePostListQuery } from '@/features/posts';

const Posts: FC = () => {
  const { data: posts } = usePostListQuery();

  const limitPosts = useMemo(() => {
    return posts?.filter((post) => post.id <= 10);
  }, [posts]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {limitPosts?.map((post) => (
        <Card
          key={post.id}
          className="bg-muted cursor-pointer hover:scale-105 hover:transition-all duration-150"
        >
          <CardHeader>
            <CardTitle className="text-lg text-ellipsis overflow-hidden whitespace-nowrap">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-ellipsis whitespace-nowrap overflow-hidden">
              {post.body}
            </CardDescription>
          </CardContent>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
