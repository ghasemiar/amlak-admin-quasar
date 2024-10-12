import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import {
  deleteMultipleUserRequestAdvertiseService,
  getUserRequestAdvertiseListService,
  createUserRequestAdvertiseSerivce,
  deleteUserRequestAdvertiseSerivce,
  getUserRequestAdvertiseService,
  updateUserRequestAdvertiseSerivce,
} from 'src/composables/userRequestAdvertise/userRequestAdvertise.serivce';
import {
  UserRequestAdvertiseListDto,
  UserRequestAdvertiseDto,
  userRequestAdvertiseListTransformer,
  userRequestAdvertiseTransformer,
} from 'src/composables/userRequestAdvertise/userRequestAdvertise.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { useI18n } from 'vue-i18n';
import { userTagColumns } from 'src/composables/userTag/userTag.validate';
import { UserRequestAdvertiseFormDto } from 'src/composables/userRequestAdvertise/userRequestAdvertiseForm.dto';
import {
  userRequestAdvertiseColumns,
  userRequestAdvertiseInfoColumns,
} from 'src/composables/userRequestAdvertise/userRequestAdvertise.validate';

const baseRoute: string = '/user-request-advertise';

export const useCreateUserRequestAdvertise = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserRequestAdvertiseFormDto) => {
    loading.value = true;
    createUserRequestAdvertiseSerivce(baseRoute, values)
      .then(async (res) => {
        loading.value = false;
        await router.push(baseRoute);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { loading, request };
};
export const useUserRequestAdvertise = () => {
  const route = useRoute();
  const items = reactive<{
    loading: boolean;
    data: UserRequestAdvertiseDto;
  }>({
    loading: false,
    data: {} as UserRequestAdvertiseDto,
  });
  const columns: Ref<ColumnI[]> = ref([]);
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getUserRequestAdvertiseService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = userRequestAdvertiseTransformer(res);
          columns.value = createColumn(userRequestAdvertiseInfoColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { request, ...toRefs(items), columns };
};
export const useUserRequestAdvertiseList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{
    loading: boolean;
    data: UserRequestAdvertiseListDto;
  }>({
    loading: false,
    data: {} as UserRequestAdvertiseListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getUserRequestAdvertiseListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = userRequestAdvertiseListTransformer(res);
          columns.value = createColumn(userRequestAdvertiseColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useUpdateUserRequestAdvertise = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserRequestAdvertiseFormDto) => {
    loading.value = true;
    updateUserRequestAdvertiseSerivce(baseRoute + '/' + route.params.id, values)
      .then(async (res) => {
        loading.value = false;
        console.log(res);
        await router.push('/');
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
export const useDeleteUserRequestAdvertise = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteUserRequestAdvertiseSerivce(baseRoute + '/' + id)
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
export const useMultipleDeleteUserRequestAdvertise = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleUserRequestAdvertiseService(baseRoute, { ids: data })
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
