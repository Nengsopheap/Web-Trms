<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form @submit.prevent="login" class="space-y-5">
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
        <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email.value,
        password: password.value,
      });
  
      const token = response.data.access_token;
      localStorage.setItem('token', token);
  
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
  
      if (userRole === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/home');
      }
    } catch (err) {
      error.value = err?.response?.data?.message || 'Login failed';
      console.error('Login failed:', err);
    }
  };
  </script>
  
  <style scoped>
  /* You can include custom styles here if not using Tailwind */
  </style>
  