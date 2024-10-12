import { reactive, ref, Ref, toRefs } from 'vue';
import { ColumnI } from 'src/types';
import {
  LocationDto,
  transformLocation,
} from 'src/composables/Location/location.dto';
import {
  getLocationListService,
  deleteMultipleLocationService,
  deleteLocationSerivce,
  createLocationSerivce,
  updateLocationSerivce,
} from 'src/composables/Location/location.service';
import { useRoute, useRouter } from 'vue-router';

import { LocationFormDto } from 'src/composables/Location/locationForm.dto';
import { createColumn } from 'src/helper/createColumn';
import { locationColumns } from 'src/composables/Location/location.validate';
import { useI18n } from 'vue-i18n';
const baseRoute: string = '/location';
export const getAllLocation = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: LocationDto[] }>({
    loading: false,
    data: [],
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getLocationListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as [];
          columns.value = createColumn(locationColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useCreateLocation = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: LocationFormDto) => {
    loading.value = true;
    createLocationSerivce(baseRoute, values)
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
export const useLocation = () => {
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const data: Ref<LocationDto | undefined> = ref();
  const request = () => {
    loading.value = true;
    getLocationListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        loading.value = false;
        if (res != undefined) {
          data.value = transformLocation(res);
        }
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request, data };
};
export const useUpdateLocation = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: LocationFormDto) => {
    loading.value = true;
    updateLocationSerivce(baseRoute + '/' + route.params.id, values)
      .then(async (res) => {
        loading.value = false;
        await router.push('/');
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useDeleteLocation = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteLocationSerivce(baseRoute + '/' + id)
      .then(async (res) => {
        loading.value = false;
        afterDelete();
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useMultipleDeleteLocation = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleLocationService(baseRoute, { ids: data })
      .then(async (res) => {
        loading.value = false;
        afterDelete();
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
