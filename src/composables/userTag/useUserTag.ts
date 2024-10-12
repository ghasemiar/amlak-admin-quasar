import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { UserTagCreateDto } from 'src/composables/userTag/userTagForm.dto';
import {
  getUserTagListService,
  createUserTagSerivce,
  deleteMultipleUserTagService,
  deleteUserTagSerivce,
  updateUserTagSerivce,
} from 'src/composables/userTag/userTag.service';
import {
  userTagListTransformer,
  UserTagDto,
  UserTagListDto,
  userTagTransformer,
} from 'src/composables/userTag/userTag.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { useI18n } from 'vue-i18n';
import { userTagColumns } from 'src/composables/userTag/userTag.validate';

const baseRoute: string = '/user-tag';

export const useCreateUserTag = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserTagCreateDto) => {
    loading.value = true;
    createUserTagSerivce(baseRoute, values)
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
export const useUserTag = () => {
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const data = ref();
  const request = () => {
    loading.value = true;
    getUserTagListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        loading.value = false;
        if (res != undefined) {
          data.value = userTagTransformer(res);
        }
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request, data };
};
export const useUserTagList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: UserTagDto[] }>({
    loading: false,
    data: [],
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getUserTagListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as [];
          columns.value = createColumn(userTagColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useUpdateUserTag = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserTagCreateDto) => {
    loading.value = true;
    updateUserTagSerivce(baseRoute + '/' + route.params.id, values)
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
export const useDeleteUserTag = () => {
  const loading: Ref<boolean> = ref(false);
  const data: Ref<UserTagDto | undefined> = ref();
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteUserTagSerivce(baseRoute + '/' + id)
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
export const useMultipleDeleteUserTag = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleUserTagService(baseRoute, { ids: data })
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
