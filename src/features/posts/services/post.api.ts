import { PostData } from './types';
import axiosClient from '@/apis/axios-client';

const baseUrl = 'posts';

const postApi = {
  getList: (): Promise<PostData[]> => axiosClient.get(baseUrl),
};

export default postApi;