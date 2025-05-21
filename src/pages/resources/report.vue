<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <Header />

    <div class="flex-grow bg-[#31247D]" style="height: 300px">
      <div class="container">
        <div
          class="flex flex-col text-white font-kantumruy"
          style="margin-top: 100px"
        >
          <div class="text-3xl font-semibold">Reports</div>
          <div class="text-lg font-bold mt-2">
            Home <span class="text-red-600"> > </span> <span>reports</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <ContactUS /> -->
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/footer.vue";
import ContactUS from "../../components/ContactUS.vue";

export default {
  components: {
    Header,
    Footer,
    ContactUS,
  },
};
</script>
