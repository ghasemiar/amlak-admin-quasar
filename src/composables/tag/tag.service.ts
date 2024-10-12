import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { TagCreateDto } from 'src/composables/tag/tagForm.dto';

export const createTagSerivce = async (route: string, data: TagCreateDto) => {
  return await postData(route, data);
};
export const getTagListService = async (route: string) => {
  return await fetchData(route);
};
export const updateTagSerivce = async (route: string, data: TagCreateDto) => {
  return await putData(route, data);
};
export const deleteTagSerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleTagService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
