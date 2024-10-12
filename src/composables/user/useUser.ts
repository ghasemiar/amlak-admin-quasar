import { reactive, ref, Ref, toRefs } from 'vue';
import { ColumnI } from 'src/types';

import { useRoute, useRouter } from 'vue-router';

import { LocationFormDto } from 'src/composables/Location/locationForm.dto';
import { createColumn } from 'src/helper/createColumn';
import { locationColumns } from 'src/composables/Location/location.validate';
import { useI18n } from 'vue-i18n';
import {
  createUserSerivce,
  deleteMultipleUserService,
  deleteUserSerivce,
  getUserListService,
  updateUserSerivce,
} from 'src/composables/user/user.serivce';
import { UserFormDto } from 'src/composables/user/userForm.dto';
import { userListTransformer, userTransformer } from 'src/composables/user/user.dto';
import { userColumns } from 'src/composables/user/user.validate';
const baseRoute: string = '/user';
import Data from './user.serivce';
export const getAllUser = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: any }>({
    loading: false,
    data: [],
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getUserListService(baseRoute)
      .then((res: Data) => {
        items.loading = false;
        if (res != undefined) {
          items.data = userListTransformer(res);
          columns.value = createColumn(userColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};


export const useCreateUser = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values) => {
    loading.value = true;
    createUserSerivce(baseRoute, values)
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
export const useUser = () => {
  const route = useRoute();
  const { t } = useI18n();
  const items = reactive<{ loading: boolean; data: any }>({
    loading: false,
    data: [],
  });
  const columns: Ref<ColumnI[]> = ref([]);
  const request = () => {
    items.loading = true;
    getUserListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = userTransformer(res);
          columns.value = createColumn(userColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { request, ...toRefs(items),columns };
};
export const useUpdateUser = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values) => {
    loading.value = true;
    updateUserSerivce(baseRoute + '/' + route.params.id, values)
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
export const useDeleteUser = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteUserSerivce(baseRoute + '/' + id)
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
export const useMultipleDeleteUser = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleUserService(baseRoute, { ids: data })
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
