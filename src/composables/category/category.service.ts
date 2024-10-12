import {
  deleteData,
  fetchData,
  postData,
  putData,
} from 'src/helper/axios.instans';
import { CategoryCreateDto } from 'src/composables/category/categoryForm.dto';

export const createCategorySerivce = async (
  route: string,
  data: CategoryCreateDto
) => {
  return await postData(route, data);
};
export const getCategoryListService = async (route: string) => {
  return await fetchData(route);
};
export const updateCategorySerivce = async (
  route: string,
  data: CategoryCreateDto
) => {
  return await putData(route, data);
};
export const deleteCategorySerivce = async (route: string) => {
  return await deleteData(route);
};
export const deleteMultipleCategoryService = async (
  route: string,
  data: { ids: number[] }
) => {
  return await deleteData(route, data);
};
