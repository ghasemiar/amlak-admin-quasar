import { Ref, ref } from 'vue';
import { loginUserService } from 'src/composables/auth/login/login.serivce';
import { LoginFormDto } from 'src/composables/auth/login/loginForm.dto';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth.store';
export const useLogin = () => {
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();
  const loading: Ref<boolean> = ref(false);
  const request = (values: LoginFormDto) => {
    loading.value = true;
    loginUserService(values)
      .then(async (res: any) => {
        loading.value = false;
        setToken(res.token);
        setUser(res.data.user);
        await router.push('/');
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
      });
  };
  return { loading, request };
};
