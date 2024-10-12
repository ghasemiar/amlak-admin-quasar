import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, Ref, toRefs } from 'vue';
import { ProfileFormDto } from 'src/composables/profile/profileForm.dto';
import {
  getProfileListService,
  updateProfileSerivce,
} from 'src/composables/profile/profile.serivce';
import { getCategoryListService } from 'src/composables/category/category.service';
import {
  ProfileDto,
  ProfileListDto,
  profileTransformer,
} from 'src/composables/profile/profile.dto';
const baseRoute: string = '/profile';
export const useUpdateProfile = () => {
  const router = useRouter();
  const route = useRoute();
  const loading: Ref<boolean> = ref(false);
  const request = (values: ProfileFormDto) => {
    loading.value = true;
    updateProfileSerivce(baseRoute + '/', values)
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
export const useProfile = () => {
  const items = reactive<{ loading: boolean; data: ProfileDto }>({
    loading: false,
    data: {} as ProfileDto,
  });
  const route = useRoute();
  const request = () => {
    items.loading = true;
    getProfileListService(baseRoute)
      .then(async (res) => {
        items.loading = false;
        if (res != undefined) {
          items.data = profileTransformer(res);
        }
      })
      .catch((error) => {
        items.loading = false;
        console.log(error);
      });
  };
  return { ...toRefs(items), request };
};
