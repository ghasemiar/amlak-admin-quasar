import { reactive, ref, Ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { getCityListService } from 'src/composables/city/city.service';
import {
  CityListDto,
  cityListTransformer,
} from 'src/composables/city/city.dto';
const baseRoute = '/city';
export const useCityList = () => {
  const items = reactive<{ loading: boolean; data: CityListDto }>({
    loading: false,
    data: {} as CityListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getCityListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = cityListTransformer(res);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
