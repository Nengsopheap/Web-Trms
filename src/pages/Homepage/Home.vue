<template>
  <div>
    <Header />
    <Event />
    <Information />
    <Eventquize />
    <div
      class="flex flex-row justify-between items-center mt-5"
      style="background-color: #31247d"
    >
      <div class="flex flex-col gap-3">
        <div
          class="text-white ml-36 font-semibold w-[400px] custom-font"
          style="font-size: 20px"
        >
          Level up your cyber security
        </div>
        <div
          class="text-white ml-36 font-semibold w-[400px] custom-font"
          style="font-size: 20px"
        >
          Check out the following cyber security tips
        </div>
      </div>
      <div style="margin-right: 200px">
       image
      </div>
    </div>
    <div class="container mt-5">
      <div class="flex justify-center">
        <div class="w-full space-y-4">
          <!-- Row 1 -->
          <div class="flex gap-4">
            <div
              class="group flex-1 border-[3px] border-s-[#31247D] border-t-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-b-red-400 hover:border-r-red-400"
            >
              <h3 class="font-bold text-sm mb-1">Tip #1</h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Think about what you post online
              </p>

              <!-- Hidden content until hover -->
              <di
                v
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>
                    Before sharing anything online, consider the potential
                    impact. Personal information, even seemingly harmless
                    details, can be used in social engineering attacks.
                  </li>
                </ul>
              </di>
            </div>
            <div
              class="group w-1/3 border-[3px] border-b-[#31247D] border-r-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-t-red-400 hover:border-s-red-400"
            >
              <h3
                class="font-bold text-sm mb-1 group-hover:text-white transition-colors duration-300"
              >
                Tip #2
              </h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Update your passwords regularly.
              </p>

              <!-- Hidden list shown on hover -->
              <div
                class="mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 min-h-[40px]"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>hello</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="flex gap-4">
            <div
              class="group w-1/3 border-[3px] border-s-[#31247D] border-t-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-b-red-400 hover:border-r-red-400"
            >
              <h3
                class="font-bold text-sm mb-1 group-hover:text-white transition-colors duration-300"
              >
                Tip #3
              </h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Update your passwords regularly.
              </p>

              <!-- Hidden list shown on hover -->
              <div
                class="mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 min-h-[40px]"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>hello</li>
                </ul>
              </div>
            </div>
            <div
              class="group flex-1 border-[3px] border-b-[#31247D] border-r-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-s-red-400 hover:border-t-red-400"
            >
              <h3 class="font-bold text-sm mb-1">Tip #4</h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Think about what you post online
              </p>

              <!-- Hidden content until hover -->
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>
                    Before sharing anything online, consider the potential
                    impact. Personal information, even seemingly harmless
                    details, can be used in social engineering attacks.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Row 3 -->
          <div class="flex gap-4">
            <div
              class="group flex-1 border-[3px] border-s-[#31247D] border-t-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-b-red-400 hover:border-r-red-400"
            >
              <h3 class="font-bold text-sm mb-1">Tip #5</h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Think about what you post online
              </p>

              <!-- Hidden content until hover -->
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>
                    Before sharing anything online, consider the potential
                    impact. Personal information, even seemingly harmless
                    details, can be used in social engineering attacks.
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="group w-1/3 border-[3px] border-b-[#31247D] border-r-[#31247D] shadow-md rounded-lg p-4 bg-white hover:bg-[#31247D] hover:text-white transition-colors duration-300 hover:border-t-transparent hover:border-s-transparent hover:border-s-red-400 hover:border-t-red-400"
            >
              <h3
                class="font-bold text-sm mb-1 group-hover:text-white transition-colors duration-300"
              >
                Tip #6
              </h3>
              <p
                class="text-sm text-gray-700 group-hover:text-white transition-colors duration-300"
              >
                Update your passwords regularly.
              </p>

              <!-- Hidden list shown on hover -->
              <div
                class="mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 min-h-[40px]"
              >
                <ul class="list-disc ml-5 text-sm font-normal">
                  <li>hello</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-center text-[#31247D] font-bold">ព័ត៌មានថ្មីៗ</div>
    <div
      class="flex flex-row justify-center items-center mt-5 gap-24"
      style="background-color: #0b0726"
    >
      <div style="">
       image
      </div>

      <div
        class="text-white ml-36 font-semibold w-[430px] custom-font"
        style="font-size: 20px"
      >
        TOP TIPS FOR CYBER SECURITY PRACTICAL WAYS TO PROTECT YOURSELF ONLINE
      </div>
    </div>
    <div class="bg-[#0b0726]">
      <Toptip />
    </div>
    <div class="container">
      <ContactUS />
    </div>
    <div>
     <Footer />
    </div>
  </div>
</template>

<script>
import Event from "../../components/Event.vue";
import Header from "../../components/Header.vue";
import Information from "../../components/information.vue";
import Eventquize from "../../components/Eventquize.vue";
import Toptip from "../../components/Toptip.vue";
import ContactUS from "../../components/ContactUS.vue";
import Footer from "../../components/footer.vue"

export default {
  name: "Home",
  components: {
    Header,
    Event,
    Information,
    Eventquize,
    Toptip,
    ContactUS,
    Footer
  },
};
</script>
<style scoped>
.custom-font {
  font-family: "Ancizar Serif", serif;
}
</style>
