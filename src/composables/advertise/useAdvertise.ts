import { reactive, ref, Ref, toRefs } from 'vue';
import { AdvertiseDto } from 'src/composables/advertise/advertise.dto';
import {
  getAdvertiseListService,
  createAdvertiseSerivce,
  deleteAdvertiseSerivce,
  deleteMultipleAdvertiseService,
  updateAdvertiseSerivce,
} from 'src/composables/advertise/advertise.service';
import { useRoute, useRouter } from 'vue-router';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { advertiseColumn } from 'src/composables/advertise/advertise.validate';
import { CategoryDto } from 'src/composables/category/category.dto';
import { useI18n } from 'vue-i18n';

const baseRoute: string = '/advertise';
export const getAllAdvertise = () => {
  const items = reactive<{ loading: boolean; data: AdvertiseDto[] }>({
    loading: false,
    data: [],
  });
  const columns: Ref<ColumnI[]> = ref([]);
  const { t } = useI18n();
  const request = (params?: any) => {
    items.loading = true;
    getAdvertiseListService(baseRoute, params)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as [];
          columns.value = createColumn(advertiseColumn, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const getAdvertise = () => {
  const route = useRoute();
  const items = reactive<{ loading: boolean; data: AdvertiseDto }>({
    loading: false,
    data: {} as AdvertiseDto,
  });

  const request = () => {
    items.loading = true;
    getAdvertiseListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as AdvertiseDto;
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
export const useCreateAdvertise = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: any) => {
    loading.value = true;
    createAdvertiseSerivce(baseRoute, values)
      .then(async (res) => {
        loading.value = false;
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useUpdateAdvertise = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: any) => {
    loading.value = true;
    updateAdvertiseSerivce(baseRoute + '/' + route.params.id, values)
      .then(async (res) => {
        loading.value = false;
        await router.push(baseRoute);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useDeleteAdvertise = () => {
  const loading: Ref<boolean> = ref(false);
  const data: Ref<CategoryDto | undefined> = ref();
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteAdvertiseSerivce(baseRoute + '/' + id)
      .then(async (res) => {
        loading.value = false;
        afterDelete();
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request, data };
};
export const useMultipleDeleteAdvertise = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleAdvertiseService(baseRoute, { ids: data })
      .then(async (res) => {
        loading.value = false;
        afterDelete();
        console.log(res);
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
