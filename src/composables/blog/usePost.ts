import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  PostFromDto,
  transformPostFrom,
} from 'src/composables/blog/postFrom.dto';
import {
  createPostService,
  deletePostService,
  getPostService, updatePostService
} from 'src/composables/blog/post.service';
import {
  PostDto,
  PostListDto,
  postListTransformer, postTransformer
} from 'src/composables/blog/post.dto';
import { ColumnI } from 'src/types';
import { createColumn } from 'src/helper/createColumn';
import { postColumns } from 'src/composables/blog/post.validate';

const baseRoute: string = '/post';

export const useCreatePost = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: PostFromDto) => {
    loading.value = true;
    createPostService(baseRoute, values)
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
export const useUpdatePost = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const route = useRoute()
  const request = (values: PostFromDto) => {
    loading.value = true;
    updatePostService(baseRoute+'/'+route.params.id, values)
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
export const usePostList = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: PostListDto }>({
    loading: false,
    data: {} as PostListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getPostService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          console.log(postListTransformer(res))
          items.data = postListTransformer(res);
          columns.value = createColumn(postColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const usePost = () => {
  const columns: Ref<ColumnI[]> = ref([]);
  const items = reactive<{ loading: boolean; data: PostDto }>({
    loading: false,
    data: {} as PostDto,
  });
  const route = useRoute();
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getPostService(baseRoute+'/'+route.params.id)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = postTransformer(res);
          columns.value = createColumn(postColumns, t);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request, columns };
};
export const useDeletePost = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deletePostService(baseRoute + '/' + id)
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
