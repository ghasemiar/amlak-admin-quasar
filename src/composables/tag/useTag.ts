import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { UserTagCreateDto } from 'src/composables/userTag/userTagForm.dto';
import {
  createTagSerivce,
  deleteMultipleTagService,
  deleteTagSerivce,
  getTagListService,
  updateTagSerivce,
} from 'src/composables/tag/tag.service';
import {
  TagDto,
  TagListDto,
  tagListTransformer,
  tagTransformer,
} from 'src/composables/tag/tag.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { useI18n } from 'vue-i18n';
import { tagColumns } from 'src/composables/tag/tag.validate';
import { updateUserTagSerivce } from 'src/composables/userTag/userTag.service';

const baseRoute: string = '/tag';

export const useCreateTag = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserTagCreateDto) => {
    loading.value = true;
    createTagSerivce(baseRoute, values)
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
export const useTag = () => {
  const route = useRoute();
  const items = reactive<{ loading: boolean; data: TagDto }>({
    loading: false,
    data: {} as TagDto,
  });
  const request = () => {
    items.loading = true;
    getTagListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = tagTransformer(res);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
export const useTagList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: TagListDto }>({
    loading: false,
    data: {} as TagListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getTagListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = tagListTransformer(res);
          columns.value = createColumn(tagColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useUpdateTag = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: UserTagCreateDto) => {
    loading.value = true;
    updateTagSerivce(baseRoute + '/' + route.params.id, values)
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
export const useDeleteTag = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteTagSerivce(baseRoute + '/' + id)
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
export const useMultipleDeleteTag = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleTagService(baseRoute, { ids: data })
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
