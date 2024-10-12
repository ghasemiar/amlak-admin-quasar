import { fetchData } from 'src/helper/axios.instans';

export const getCityListService = async (route: string) => {
  return await fetchData(route);
};
