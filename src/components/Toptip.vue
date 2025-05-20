<template>
  <div class="container">
    <div class="min-h-screen">
      <div class="flex gap-4">
        <div class="w-[700px]">
          <!-- Card 1 -->
          <div
            class="relative h-72 rounded-lg overflow-hidden shadow-md mt-5 cursor-pointer"
            @click="goToLearntips(store.allToptips[0]?.id)"
          >
            <img
              src="/src/assets/image/Cyber.jpg"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
            >
              <h3 class="font-semibold text-lg mb-1">
                {{ store.allToptips[0]?.title || "Default Title" }}
              </h3>
              <p class="text-sm leading-snug">
                {{
                  store.allToptips[0]?.description ||
                  "Default description text."
                }}
              </p>
            </div>
          </div>

          <!-- Card 2 Grid -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Card 2 and 3 -->
            <div
              v-if="store.allToptips[1]"
              class="relative h-64 rounded-lg overflow-hidden shadow-md mt-2 cursor-pointer"
              style="height: 300px; width: 340px"
              @click="goToLearntips(store.allToptips[1]?.id)"
            >
              <img
                src="/src/assets/image/Cyber.jpg"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
              >
                <h3 class="font-semibold text-lg mb-1">
                  {{ store.allToptips[1]?.title || "Default Title" }}
                </h3>
                <p class="text-sm leading-snug">
                  {{
                    store.allToptips[1]?.description ||
                    "Default description text."
                  }}
                </p>
              </div>
            </div>

            <div
              v-if="store.allToptips[2]"
              class="relative h-64 rounded-lg overflow-hidden shadow-md mt-2 cursor-pointer"
              style="height: 300px; width: 340px"
              @click="goToLearntips(store.allToptips[2]?.id)"
            >
              <img
                src="/src/assets/image/Cyber.jpg"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
              >
                <h3 class="font-semibold text-lg mb-1">
                  {{ store.allToptips[2]?.title || "Default Title" }}
                </h3>
                <p class="text-sm leading-snug">
                  {{
                    store.allToptips[2]?.description ||
                    "Default description text."
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div
            class="relative h-72 rounded-lg overflow-hidden shadow-md mt-2 cursor-pointer"
            @click="goToLearntips(store.allToptips[3]?.id)"
          >
            <img
              src="/src/assets/image/Cyber.jpg"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
            >
              <h3 class="font-semibold text-lg mb-1">
                {{ store.allToptips[3]?.title || "Default Title" }}
              </h3>
              <p class="text-sm leading-snug">
                {{
                  store.allToptips[3]?.description ||
                  "Default description text."
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="flex flex-col">
          <div class="grid grid-cols-2 gap-3">
            <!-- Card 4 and 5 -->
            <div
              v-if="store.allToptips[4]"
              class="relative h-64 rounded-lg overflow-hidden shadow-md mt-5 cursor-pointer"
              style="height: 400px; width: 320px"
              @click="goToLearntips(store.allToptips[4]?.id)"
            >
              <img
                src="/src/assets/image/Cyber.jpg"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
              >
                <h3 class="font-semibold text-lg mb-1">
                  {{ store.allToptips[4]?.title || "Default Title" }}
                </h3>
                <p class="text-sm leading-snug">
                  {{
                    store.allToptips[4]?.description ||
                    "Default description text."
                  }}
                </p>
              </div>
            </div>

            <div
              v-if="store.allToptips[5]"
              class="relative h-64 rounded-lg overflow-hidden shadow-md mt-5 cursor-pointer"
              style="height: 400px; width: 320px"
              @click="goToLearntips(store.allToptips[5]?.id)"
            >
              <img
                src="/src/assets/image/Cyber.jpg"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
              >
                <h3 class="font-semibold text-lg mb-1">
                  {{ store.allToptips[5]?.title || "Default Title" }}
                </h3>
                <p class="text-sm leading-snug">
                  {{
                    store.allToptips[5]?.description ||
                    "Default description text."
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Final Card -->
          <div
            v-if="store.allToptips[6]"
            class="relative h-72 rounded-lg overflow-hidden shadow-md mt-2 cursor-pointer"
            style="height: 100%; width: 640px"
            @click="goToLearntips(store.allToptips[6]?.id)"
          >
            <img
              src="/src/assets/image/Cyber.jpg"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end text-white"
            >
              <h3 class="font-semibold text-lg mb-1">
                {{ store.allToptips[6]?.title || "Default Title" }}
              </h3>
              <p class="text-sm leading-snug">
                {{
                  store.allToptips[6]?.description ||
                  "Default description text."
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useToptipStore } from "../stores/toptip";
import { useRouter } from "vue-router";

const store = useToptipStore();
const router = useRouter();

onMounted(() => {
  store.fetchToptips();
});
function goToLearntips(id) {
  router.push(`/toptip/${id}/learntips`);
}
</script>
