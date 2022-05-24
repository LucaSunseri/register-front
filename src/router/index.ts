import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Attendance from '../views/Attendance.vue'
import CreateAttendance from '../views/CreateAttendance.vue'
import EditAttendace from '../views/EditAttendace.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import store from '../store/index'

const routes: Array<RouteRecordRaw> =[
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { 
      requiresAuth: false,
      isLoggedInSkip: false  
    }
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: Attendance,
    meta: { 
      requiresAuth: true,
      isLoggedInSkip: false  
    }
  },
  {
    path: '/attendance/create',
    name: 'create-attendance',
    component: CreateAttendance,
    meta: { 
      requiresAuth: true,
      isLoggedInSkip: false  
    }
  },
  {
    path: '/attendance/edit/:id',
    name: 'edit-attendance',
    component: EditAttendace,
    meta: { 
      requiresAuth: true,
      isLoggedInSkip: false  
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { 
      requiresAuth: false,
      isLoggedInSkip: true  
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { 
      requiresAuth: false,
      isLoggedInSkip: true 
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.getUser;
  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'login' })
    
  } else if(loggedIn) {
    store.dispatch('checkSignature');
    if(to.meta.isLoggedInSkip) {
      next({ name: 'home' });
    }
    next();
  } else {
    next();
  }
});

export default router
