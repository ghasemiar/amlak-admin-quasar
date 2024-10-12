import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { PostFromDto } from 'src/composables/blog/postFrom.dto';

export const createPostService = async (route: string, data: PostFromDto) => {
  return await postData(route, data);
};
export const updatePostService = async (route: string, data: PostFromDto) => {
  return await putData(route, data);
};
export const getPostService = async (route: string) => {
  return await fetchData(route);
};
export const deletePostService = async (route: string) => {
  return await deleteData(route);
};
