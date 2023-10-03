import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import todoApi from '../services/todo.api';
import { ResponseData, TodoData } from '../services/types';
import { QueryOptions } from '@/ts/types';

const todos = createQueryKeys('todos', {
  list: () => ({
    queryKey: ['todos'],
    queryFn: () => todoApi.getList(),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => todoApi.getDetail(id),
  }),
});

export const useTodoListQuery = <T = ResponseData>(
  options: QueryOptions<T, ResponseData> = {},
) => {
  return useQuery({
    ...todos.list(),
    keepPreviousData: true,
    ...options,
  });
};

export const useTodoDetailQuery = (
  id: string,
  options: QueryOptions<TodoData> = {},
) => {
  return useQuery({
    ...todos.detail(id),
    ...options,
  });
};

export const useAddTodoMutation = () => {
  return useMutation({
    mutationFn: todoApi.add,
    onSuccess: () => {
      void toast.success('Create new Todo successfully');
    },
    onError: () => {
      void toast.error('Create new Todo failed');
    },
  });
};

export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: todoApi.update,
    onSuccess: () => {
      void toast.success('Update Todo successfully');
    },
    onError: () => {
      void toast.error('Update Todo failed');
    },
  });
};

export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => {
      void toast.success('Delete Todo successfully');
    },
    onError: () => {
      void toast.error('Delete Todo failed');
    },
  });
};
