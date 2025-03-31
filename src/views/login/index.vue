

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  // Backend login so‘rovini bajaramiz (simulyatsiya qilamiz)
  const userData = { token: '123456', role: username.value === 'super' ? 'super-admin' : 'admin' };

  Cookies.set('token', userData.token, { expires: 1 });
  Cookies.set('role', userData.role, { expires: 1 });

  if (userData.role === 'super-admin') {
    router.push('/super-admin/dashboard');
  } else {
    router.push('/admin/dashboard');
  }
};
</script>
