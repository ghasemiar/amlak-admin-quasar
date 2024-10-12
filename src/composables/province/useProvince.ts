import { reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  ProvinceListDto,
  provinceListTransformer,
} from 'src/composables/province/province.dto';
import { getProvinceListService } from 'src/composables/province/province.service';

const baseRoute = '/province';
export const useProvinceList = () => {
  const items = reactive<{ loading: boolean; data: ProvinceListDto }>({
    loading: false,
    data: {} as ProvinceListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getProvinceListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = provinceListTransformer(res);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
