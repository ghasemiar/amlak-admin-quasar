import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { LocationFormDto } from 'src/composables/Location/locationForm.dto';

export const uploadImageService = async (route: string, data: FormData) => {
  return await postData(route, data);
};
export const getImagesService = async (route: string) => {
  return await fetchData(route);
};
export const deleteImageService = async (route: string) => {
  return await deleteData(route);
};
