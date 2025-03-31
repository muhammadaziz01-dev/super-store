import { createRouter, createWebHistory } from 'vue-router';
import {Login , Dashboard , Error , Admins , Store , Warehouse, Categories , Products, Settings} from "../views"
import SuperAdminLayout from "../layout/super-admin/index.vue";
import AdminLayout from "../layout/admin/index.vue";
import { getCookies } from '../utils/cookie';

// Router sahifalari
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/super-admin',
    component: SuperAdminLayout,
    meta: { requiresAuth: true, role: 'super-admin' },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'admins', component: Admins },
      { path: 'settings', component: Settings },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'categories', component: Categories },
      { path: 'store', component: Store },
      { path: 'warehouse', component: Warehouse },
      { path: 'settings', component: Settings },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error,
  },
];

// Router yaratish
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard (Token va Rol tekshirish)
router.beforeEach((to, _, next) => {
  const token = getCookies('token');
  const role = getCookies('role');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.role && to.meta.role !== role) {
    next('/error');
  } else {
    next();
  }
});

export default router;
