import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { UserFormDto } from 'src/composables/user/userForm.dto';

interface Data {
  data: Array<User>;
  msg: string;
}

interface User {
  name: string;
  username: string;
  email: string;
  role: string;
  userTag: Array<{ id: number; name: string }> | [];
}

export const createUserSerivce = async (route: string, data: UserFormDto) => {
  return await postData(route, data);
};
export const getUserListService = async (route: string): Promise<Data> => {
  return (await fetchData(route)) as Data;
};
export const updateUserSerivce = async (route: string, data: UserFormDto) => {
  return await putData(route, data);
};
export const deleteUserSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleUserService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};

export default Data;
