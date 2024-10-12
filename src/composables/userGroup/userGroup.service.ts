import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { UserGroupCreateDto } from 'src/composables/userGroup/userGroupForm.dto';

export const createUserGroupSerivce = async (
  route: string,
  data: UserGroupCreateDto
) => {
  return await postData(route, data);
};
export const getUserGroupListService = async (route: string) => {
  return await fetchData(route);
};
export const updateUserGroupSerivce = async (
  route: string,
  data: UserGroupCreateDto
) => {
  return await putData(route, data);
};
export const deleteUserGroupSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleUserGroupService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
