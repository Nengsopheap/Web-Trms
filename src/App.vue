<template>
  <div id="app">
    <header />
    <router-view />
  </div>
</template>

<script>
import header from "../src/components/Header.vue"
export default {
  components: {
    header,
  },
  name: "App",
};
</script>
