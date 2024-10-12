import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { LocationFormDto } from 'src/composables/Location/locationForm.dto';

export const createLocationSerivce = async (
  route: string,
  data: LocationFormDto
) => {
  return await postData(route, data);
};
export const getLocationListService = async (route: string) => {
  return await fetchData(route);
};
export const updateLocationSerivce = async (
  route: string,
  data: LocationFormDto
) => {
  return await putData(route, data);
};
export const deleteLocationSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleLocationService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
