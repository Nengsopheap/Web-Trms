<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <Header />

    <div class="flex-grow bg-[#31247D]" style="height: 300px">
      <div class="container">
        <div
          class="flex flex-col text-white font-kantumruy"
          style="margin-top: 100px"
        >
          <div class="text-3xl font-semibold">ច្បាប់</div>
          <div class="text-lg font-bold mt-2">
            ទំព័រដើម <span class="text-red-600"> > </span> <span>ច្បាប់</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      ច្បាប់
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
