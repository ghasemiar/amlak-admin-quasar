import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'stores/auth.store';

export default boot(({ router }) => {
  const store = useAuthStore();
  router.beforeEach((to, from, next) => {
    if (store.isAuthenticated()) {
      if (to.path != '/login') next();
      else next('/');
    } else {
      if (to.path != '/login') next('/login');
      else next();
    }
  });
});
