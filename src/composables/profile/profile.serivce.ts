import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { ProfileFormDto } from 'src/composables/profile/profileForm.dto';

export const createProfileSerivce = async (
  route: string,
  data: ProfileFormDto
) => {
  return await postData(route, data);
};
export const getProfileListService = async (route: string) => {
  return await fetchData(route);
};
export const updateProfileSerivce = async (
  route: string,
  data: ProfileFormDto
) => {
  return await putData(route, data);
};
export const deleteProfileSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleProfileService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
