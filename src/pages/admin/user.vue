<template>
  <div class="p-3">
    <h2 class="text-2xl font-bold font-kantumruy">
      {{ $t("title.user_management") }}
    </h2>
    <div class="flex justify-end items-end">
      <button
        class="bg-[#111827] p-2 rounded-md text-white mb-3 font-kantumruy"
        @click="openModal()"
      >
        {{ $t("title.create_user") }}
      </button>
    </div>

    <!-- User Table -->
    <div class="w-full mx-auto">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#111827] text-white">
            <tr>
              <!-- <th class="px-4 py-2 text-left text-sm font-medium">#</th> -->
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.email") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.username") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.role") }}
              </th>
              <th class="px-4 py-2 text-end text-sm font-medium">
                {{ $t("title.Actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <!-- <td class="px-4 py-2 text-sm font-semibold text-gray-600">{{ user.id }}</td> -->
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ user.username }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ user.email }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ user.role }}
              </td>
              <td class="px-4 py-2 text-right">
                <button
                  @click="openModal(user)"
                  class="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <SquarePen width="19" height="19" />
                </button>
                <!-- <button
            class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
            @click="deleteUser(user.id)"
          >
            Delete
          </button> -->
                <button
                  @click="deleteUser(user.id)"
                  class="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Icon icon="mdi:trash-can" class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click.self="closeModal"
    ></div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden"
      >
        <form @submit.prevent="saveUser" class="flex flex-col">
          <div class="flex justify-between items-center px-6 py-4 border-b">
            <h5 class="text-lg font-semibold">
              {{ form.id ? $t("title.update_user") : $t("title.create_user") }}
            </h5>
            <button
              type="button"
              class="text-gray-600 hover:text-gray-900 focus:outline-none"
              @click="closeModal"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div class="p-6 space-y-4">
            <div>
              <label class="block mb-1 font-medium">{{
                $t("title.email")
              }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block mb-1 font-medium">{{
                $t("title.username")
              }}</label>
              <input
                v-model="form.username"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block mb-1 font-medium">{{
                $t("title.password")
              }}</label>
              <input
                v-model="form.password"
                type="password"
                :required="!form.id"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autocomplete="new-password"
              />
            </div>

            <div>
              <label class="block mb-1 font-medium">{{
                $t("title.role")
              }}</label>
              <select
                v-model="form.role"
                required
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end px-6 py-4 border-t space-x-2">
              <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded mr-2"
            >
              {{ $t("button.Cancel") }}
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded bg-[#111827] text-white hover:bg-gray-900"
            >
              {{$t("button.Save")}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { SquarePen } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

// const toast = useToast();

const { t } = useI18n();
const users = ref([]);
const showModal = ref(false);

// Important: Use a fresh object to replace `form`
// to ensure reactivity and inputs reset properly.
const form = ref({
  id: null,
  email: "",
  username: "",
  password: "",
  role: "user",
});

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users/all");
    users.value = res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const openModal = (user = null) => {
  if (user) {
    // Replace the entire form object — Vue tracks reactivity better this way.
    form.value = {
      id: user.id,
      email: user.email,
      username: user.username,
      password: "",
      role: user.role,
    };
  } else {
    form.value = {
      id: null,
      email: "",
      username: "",
      password: "",
      role: "user",
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveUser = async () => {
  try {
    if (form.value.id) {
      await axios.put(
        `http://localhost:3000/users/${form.value.id}`,
        form.value
      );
      toast.success(t("button.update_success"), {
        autoClose: 2000,
        position: "top-right",
      });
    } else {
      await axios.post("http://localhost:3000/users/create", form.value);
      toast.success(t("button.Create_successful"), {
        autoClose: 2000,
        position: "top-right",
      });
    }
    closeModal();
    fetchUsers();
  } catch (error) {
    toast.error(t("button.save_failed"), {
      autoClose: 3000,
      position: "top-right",
    });
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    toast.success(t("button.delete_success"), {
      autoClose: 2000,
      position: "top-right",
    });

    fetchUsers();
  } catch (error) {
    toast.error(t("button.delete_failed"), {
      autoClose: 3000,
      position: "top-right",
    });
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
