<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div
      class="w-full max-w-md p-8 rounded-l-2xl shadow-lg"
      style="background-color: #31247d"
    >
      <img src="../../assets/image/FSA_Logo.png" alt="FSA Logo" />
    </div>

    <div
      class="w-full max-w-md bg-white p-8 rounded-r-2xl shadow-[0_4px_12px_rgba(76,56,187,0.25)]"
      style="height: 448px"
    >
      <div v-if="!showLoginForm">
        <div class="flex flex-col items-center justify-center mb-6 mt-7">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">សូមស្វាគមន៍</h1>
          <div class="text-gray-600" style="font-size: 14px">
            សូមធ្វើការជ្រើសរើសវិធីណាមួយដើម្បីចូលទៅកាន់ប្រព័ន្ធឌីជីថល
          </div>
        </div>
        <div class="flex flex-col gap-4 mb-4">
          <div
            class="flex items-start p-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(76,56,187,0.25)] border border-purple-100 max-w-2xl"
          >
            <div
              class="text-gray-800 space-y-1 flex flex-row justify-center items-center gap-4"
              style="cursor: pointer"
            >
              <svg
                width="63"
                height="58"
                viewBox="0 0 63 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="63" height="58" fill="url(#pattern0_24_108)" />
                <defs>
                  <pattern
                    id="pattern0_24_108"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_24_108"
                      transform="matrix(0.0078125 0 0 0.00848599 0 -0.0431034)"
                    />
                  </pattern>
                  <image
                    id="image0_24_108"
                    width="128"
                    height="128"
                    preserveAspectRatio="none"
                    xlink:href="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <div class="flex flex-col gap-1" style="font-size: 12px">
                <p class="font-semibold">ចូលប្រព័ន្ធដោយប្រើប្រាស់ CamDigiKey</p>
                <p>ចូលប្រព័ន្ធដោយប្រើប្រាស់កម្មវិធីទូរស័ព្ទ​ដៃ CamDigiKey</p>
              </div>
            </div>
          </div>

          <div
            class="flex items-start p-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(76,56,187,0.25)] border border-purple-100 max-w-2xl"
          >
            <div
              class="text-gray-800 space-y-1 flex flex-row justify-center items-center gap-4"
              @click="showLoginForm = true"
              style="cursor: pointer"
            >
              <div>
                <svg
                  width="63"
                  height="61"
                  viewBox="0 0 63 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="63" height="61" fill="url(#pattern0_24_120)" />
                  <defs>
                    <pattern
                      id="pattern0_24_120"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_24_120"
                        transform="matrix(0.0078125 0 0 0.00806865 0 -0.0163934)"
                      />
                    </pattern>
                    <image
                      id="image0_24_120"
                      width="128"
                      height="128"
                      preserveAspectRatio="none"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>

              <div class="flex flex-col gap-1" style="font-size: 12px">
                <p class="">ចូលប្រព័ន្ធដោយប្រើប្រាស់ពាក្យសម្ងាត់</p>
                <p>
                  ចូលប្រព័ន្ធដោយប្រើអត្តសញ្ញាណប័ណ្ណ ប័ណ្ណមន្រ្តីរាជការ
                  លេខទូរស័ព្ទ ឬអ៊ីម៉ែល និងពាក្យសម្ងាត់។
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Login form -->
      <div v-else>
        <button
          @click="showLoginForm = false"
          class="mb-4 text-md text-blue-600"
        >
          ←
        </button>

        <h2
          class="font-bold text-gray-800 mb-6 text-center"
          style="font-size: 18px"
        >
          ចូលប្រព័ន្ធដោយប្រើប្រាស់ពាក្យសម្ងាត់
        </h2>
        <h2 class="text-gray-800 mb-6" style="font-size: 14px">
          សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណ លេខប័ណ្ណមន្រ្តីរាជការ លេខទូរស័ព្ទ ឬអ៊ីម៉ែល
          និងពាក្យសម្ងាត់ដើម្បីចូលប្រព័ន្ធ
        </h2>
        <form @submit.prevent="login" class="space-y-5">
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              class="peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-4 pb-1 text-gray-900 placeholder-transparent focus:border-[#31247d] focus:outline-none"
              placeholder="អ៊ីមែល"
            />
            <label
              class="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#31247d]"
            >
              ឈ្មោះគណនី
            </label>
          </div>

          <div class="relative">
            <input
              v-model="password"
              type="password"
              required
              class="peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-4 pb-1 text-gray-900 placeholder-transparent focus:border-[#31247d] focus:outline-none"
              placeholder="លេខសម្ងាត់"
            />
            <label
              class="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#31247d]"
            >
              ពាក្យសម្ងាត់
            </label>
          </div>

          <div class="flex justify-between items-center mt-4">
            <div class="text-[#31247d] cursor-pointer" style="font-size: 14px">
              ផ្លាស់ប្តូរពាក្យសម្ងាត់
            </div>
            <button
              type="submit"
              class="bg-[#31247d] text-white rounded-lg h-7"
              style="width: 90px; font-size: 13px"
            >
              ចូលប្រព័ន
            </button>
          </div>
        </form>

        <p v-if="error" class="text-red-500 text-sm text-center mt-4">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "vue3-toastify";

const email = ref("");
const password = ref("");
const error = ref("");
const showLoginForm = ref(false);
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: email.value,
      password: password.value,
    });

    const token = response.data.access_token;
    localStorage.setItem("token", token);

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    toast.success("Login successful!", {
      autoClose: 2000,
      position: "top-right",
    });

    if (userRole === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/home");
    }
  } catch (error) {
    toast.error("Login failed. Please check your credentials.", {
      autoClose: 3000,
      position: "top-right",
    });
  }
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
