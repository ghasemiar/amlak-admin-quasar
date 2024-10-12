import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { UserTagCreateDto } from 'src/composables/userTag/userTagForm.dto';

export const createUserTagSerivce = async (
  route: string,
  data: UserTagCreateDto
) => {
  return await postData(route, data);
};
export const getUserTagListService = async (route: string) => {
  return await fetchData(route);
};
export const updateUserTagSerivce = async (
  route: string,
  data: UserTagCreateDto
) => {
  return await putData(route, data);
};
export const deleteUserTagSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleUserTagService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
