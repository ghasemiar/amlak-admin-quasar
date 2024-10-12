import { RouteRecordRaw } from 'vue-router';
import generatedRoutes from 'src/router/route-generator/index';

const routes: RouteRecordRaw[] = [...generatedRoutes];

export default routes;
