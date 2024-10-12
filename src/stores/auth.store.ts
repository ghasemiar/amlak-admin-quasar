import { defineStore } from 'pinia';
import { getCurrentInstance, Ref, ref } from 'vue';
import { UserDto } from 'src/composables/user/user.dto';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user: Ref<UserDto | undefined> = ref();
  const profile = ref();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  const setUser = (userInfo: UserDto) => {
    user.value = userInfo;
  };
  const setProfile = (profileInfo: any) => {
    profile.value = profileInfo;
  };
  const setToken = (newToken: string) => {
    token.value = newToken;
    token.value && localStorage.setItem('token', token.value);
  };
  const isAuthenticated = () => !!token.value;
  return {
    token,
    user,
    profile,
    setToken,
    isAuthenticated,
    setUser,
    setProfile,
    logout,
  };
});
