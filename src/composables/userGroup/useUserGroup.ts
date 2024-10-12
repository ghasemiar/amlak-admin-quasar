import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { UserGroupCreateDto, userGroupFormTransformer } from 'src/composables/userGroup/userGroupForm.dto';
import {
  getUserGroupListService,
  createUserGroupSerivce,
  deleteMultipleUserGroupService,
  deleteUserGroupSerivce,
  updateUserGroupSerivce,
} from 'src/composables/userGroup/userGroup.service';
import {
  userGroupListTransformer,
  UserGroupDto,
  UserGroupListDto,
  userGroupTransformer,
} from 'src/composables/userGroup/userGroup.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { useI18n } from 'vue-i18n';
import { userGroupColumns } from 'src/composables/userGroup/userGroup.validate';

const baseRoute: string = '/user-group';

export const useCreateUserGroup = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserGroupCreateDto) => {
    loading.value = true;
    createUserGroupSerivce(baseRoute,userGroupFormTransformer(values))
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
export const useUserGroup = () => {
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const data = ref();
  const request = () => {
    loading.value = true;
    getUserGroupListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        loading.value = false;
        if (res != undefined) {
          data.value = userGroupTransformer(res);
        }
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request, data };
};
export const useUserGroupList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: UserGroupDto[] }>({
    loading: false,
    data: [],
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getUserGroupListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as [];
          columns.value = createColumn(userGroupColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useUpdateUserGroup = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserGroupCreateDto) => {
    loading.value = true;
    updateUserGroupSerivce(baseRoute + '/' + route.params.id, values)
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
export const useDeleteUserGroup = () => {
  const loading: Ref<boolean> = ref(false);
  const data: Ref<UserGroupDto | undefined> = ref();
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteUserGroupSerivce(baseRoute + '/' + id)
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
  return { loading, request, data };
};
export const useMultipleDeleteUserGroup = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleUserGroupService(baseRoute, { ids: data })
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
