import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { UserRequestAdvertiseDto } from 'src/composables/userRequestAdvertise/userRequestAdvertise.dto';
import { UserRequestAdvertiseFormDto } from 'src/composables/userRequestAdvertise/userRequestAdvertiseForm.dto';

export const createUserRequestAdvertiseSerivce = async (
  route: string,
  data: UserRequestAdvertiseFormDto
) => {
  return await postData(route, data);
};
export const getUserRequestAdvertiseListService = async (
  route: string
): Promise<UserRequestAdvertiseDto[]> => {
  return await fetchData(route);
};
export const getUserRequestAdvertiseService = async (
  route: string
): Promise<UserRequestAdvertiseDto> => {
  return await fetchData(route);
};
export const updateUserRequestAdvertiseSerivce = async (
  route: string,
  data: UserRequestAdvertiseFormDto
) => {
  return await putData(route, data);
};
export const deleteUserRequestAdvertiseSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleUserRequestAdvertiseService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
