import { useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';

import { useI18n } from 'vue-i18n';
import { uploadImageService,deleteImageService,getImagesService } from 'src/composables/image/image.service';
import { ImageListDto, imageListTransformer } from 'src/composables/image/image.dto';

const baseRoute: string = '/image';

export const useUploadImage = () => {
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: FormData) => {
    loading.value = true;
    uploadImageService(baseRoute, values)
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
export const useImageList = () => {
  const items = reactive<{ loading: boolean; data: ImageListDto }>({
    loading: false,
    data: {} as ImageListDto,
  });
  const { t } = useI18n();
  const request = () => {
    items.loading = true;
    getImagesService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = imageListTransformer(res);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
export const useDeleteImage = () => {
  const loading: Ref<boolean> = ref(false);
  const request = (id: number | string, afterDelete: any) => {
    loading.value = true;
    deleteImageService(baseRoute + '/' + id)
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
