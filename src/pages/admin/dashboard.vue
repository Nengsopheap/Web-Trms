<template>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions('auth', ['logout']),
      async handleLogout() {
        await this.logout();
        this.$router.push('/');
      }
    }
  }
  </script>
  