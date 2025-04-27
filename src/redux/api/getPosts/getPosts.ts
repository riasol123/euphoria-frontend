import { PostArray } from '../../../types/getPosts/types';

import api from '../api';

const getPosts = async (): Promise<PostArray> => {
  const { data } = await api.get('/posts');
  return data;
};

export default getPosts;
