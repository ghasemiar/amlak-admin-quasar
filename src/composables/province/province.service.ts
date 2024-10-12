import { fetchData } from 'src/helper/axios.instans';

export const getProvinceListService = async (route: string) => {
  return await fetchData(route);
};
