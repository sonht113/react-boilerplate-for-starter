import { ResponseData, TodoData, TodoDataMutation } from './types';
import axiosClient from '@/apis/axios-client';

const baseUrl = 'todos';

const todoApi = {
  getList: (): Promise<ResponseData> => axiosClient.get(baseUrl),
  getDetail: (id: string): Promise<{ code: number; data: TodoData }> =>
    axiosClient.get(`${baseUrl}/${id}`),
  add: (body: TodoDataMutation): Promise<{ code: number; data: TodoData }> =>
    axiosClient.post(baseUrl, body),
  update: (body: {
    id: string;
    data: TodoDataMutation;
  }): Promise<{ code: number; data: TodoData }> =>
    axiosClient.put(baseUrl + `/${body.id}`, body.data),
  delete: (id: string): Promise<{ code: number; message: string }> =>
    axiosClient.delete(baseUrl + `/${id}`),
};

export default todoApi;
