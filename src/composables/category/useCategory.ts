import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { CategoryCreateDto } from 'src/composables/category/categoryForm.dto';
import {
  createCategorySerivce,
  deleteCategorySerivce,
  deleteMultipleCategoryService,
  getCategoryListService,
  updateCategorySerivce,
} from 'src/composables/category/category.service';
import {
  CategoryDto,
  CategoryListDto,
  categoryListTransformer,
  categoryTransformer,
} from 'src/composables/category/category.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { categoryColumns } from 'src/composables/category/category.validate';
import { useI18n } from 'vue-i18n';

const baseRoute: string = '/category';

export const useCreateCategory = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: CategoryCreateDto) => {
    loading.value = true;
    createCategorySerivce(baseRoute, values)
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
export const useCategory = () => {
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const data: Ref<CategoryDto | undefined> = ref();
  const request = () => {
    loading.value = true;
    getCategoryListService(baseRoute + '/' + route.params.id)
      .then(async (res) => {
        loading.value = false;
        if (res != undefined) {
          data.value = categoryTransformer(res);
        }
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request, data };
};
export const useCategoryList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: CategoryDto[] }>({
    loading: false,
    data: [],
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getCategoryListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = res as [];
          columns.value = createColumn(categoryColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useUpdateCategory = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: CategoryCreateDto) => {
    loading.value = true;
    updateCategorySerivce(baseRoute + '/' + route.params.id, values)
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
export const useDeleteCategory = () => {
  const loading: Ref<boolean> = ref(false);
  const data: Ref<CategoryDto | undefined> = ref();
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteCategorySerivce(baseRoute + '/' + id)
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
export const useMultipleDeleteCategory = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (data: number[], afterDelete: any) => {
    loading.value = true;
    deleteMultipleCategoryService(baseRoute, { ids: data })
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
