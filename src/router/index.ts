import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Attendance from '../views/Attendance.vue'
import NewAttendance from '../views/NewAttendance.vue'
import EditAttendace from '../views/EditAttendace.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import store from '../store/index'

const routes: Array<RouteRecordRaw> =[
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: Attendance
  },
  {
    path: '/create-attendance',
    name: 'create-attendance',
    component: NewAttendance
  },
  {
    path: '/attendance/edit/:id',
    name: 'edit-attendance',
    component: EditAttendace,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.getUser;
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
