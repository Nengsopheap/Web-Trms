<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- Background Animation -->
    <div class="area absolute inset-0 -z-10">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>

    <!-- Page Content -->
    <Header />

    <div class="flex-grow bg-[#31247D]" style="height: 300px;">
      <div class="container">
        <div
          class="flex flex-col text-white font-kantumruy"
          style="margin-top: 100px"
        >
          <div class="text-3xl font-semibold">Contact Us</div>
          <div class="text-lg font-bold mt-2">
            Home <span class="text-red-600"> > </span> <span>Contact Us</span>
          </div>
        </div>
      </div>
    </div>
    <ContactUS />
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/footer.vue";
import ContactUS from "../../components/ContactUS.vue"

export default {
  components: {
    Header,
    Footer,
    ContactUS
  },
};
</script>

<style scoped>
.area {
  background: white;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
}

.circles {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: red;
  animation: animate 25s linear infinite;
  bottom: -150px;
  border-radius: 50%;
}

/* Randomize position and animation */
.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-duration: 22s;
}
.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-duration: 18s;
}
.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-duration: 25s;
}
.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 20s;
}
.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-duration: 19s;
}
.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-duration: 28s;
}
.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-duration: 30s;
}
.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-duration: 24s;
}
.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-duration: 26s;
}
.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-duration: 32s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
  }
}
</style>
