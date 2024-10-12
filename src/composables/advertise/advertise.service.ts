import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { AdvertiseFormDto } from 'src/composables/advertise/advertiseForm.dto';

export const createAdvertiseSerivce = async (route: string, data: any) => {
  return await postData(route, data);
};

export const getAdvertiseListService = async (route: string, params?: any) => {
  return await fetchData(route, params);
};

export const updateAdvertiseSerivce = async (
  route: string,
  data: AdvertiseFormDto
) => {
  return await putData(route, data);
};
export const deleteAdvertiseSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleAdvertiseService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
