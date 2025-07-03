<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold font-kantumruy">{{ $t("title.Users") }}</h1>

    <!-- Create Button -->
    <div class="flex justify-end mb-3">
      <button
        @click="openModal('create')"
        class="bg-[#111827] text-white px-4 py-2 rounded font-kantumruy"
      >
        {{ $t("button.create_user") }}
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">
          {{
            modalMode === "preview"
              ? $t("title.UserPreview")
              : modalMode === "edit"
              ? $t("button.edit_user")
              : $t("button.create_user")
          }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="border p-2 mb-3 w-full rounded"
            :readonly="modalMode === 'preview'"
            required
          />
          <!-- <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="border p-2 mb-3 w-full rounded"
            :required="modalMode === 'create'"
            :readonly="modalMode === 'preview'"
          /> -->
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            class="border p-2 mb-3 w-full rounded"
            :readonly="modalMode === 'preview'"
          />
          <select
            v-model="form.role"
            class="border p-2 mb-3 w-full rounded"
            :disabled="modalMode === 'preview'"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded mr-2"
            >
              {{ $t("button.Cancel") }}
            </button>
            <button
              v-if="modalMode !== 'preview'"
              type="submit"
              class="px-5 py-2 rounded bg-[#111827] text-white hover:bg-gray-900"
            >
              {{
                modalMode === "edit"
                  ? $t("button.Update")
                  : $t("button.create_user")
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading/Error -->
    <div v-if="userStore.loading" class="mt-4">Loading users...</div>
    <div v-if="userStore.error" class="mt-2 text-red-600">
      {{ userStore.error }}
    </div>

    <!-- Users Table -->
    <div v-if="userStore.users.length" class="w-full mx-auto mt-4">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#111827] text-white">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium">#</th>
              <th class="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th class="px-4 py-2 text-left text-sm font-medium">Username</th>
              <th class="px-4 py-2 text-left text-sm font-medium">Role</th>
              <th class="px-4 py-2 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(user, index) in userStore.users"
              :key="user.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 text-sm text-gray-700">{{ index + 1 }}</td>
              <td class="px-4 py-2 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-4 py-2 text-sm text-gray-600">
                {{ user.username }}
              </td>
              <td class="px-4 py-2 text-sm text-gray-600">{{ user.role }}</td>
              <td class="px-4 py-2 text-right space-x-2">
                <button
                  @click="openModal('preview', user)"
                  class="text-blue-600 hover:text-blue-800"
                  title="Preview"
                >
                  <Icon icon="mdi:eye" class="w-5 h-5" />
                </button>
                <button
                  @click="openModal('edit', user)"
                  class="text-green-600 hover:text-green-800"
                  title="Edit"
                >
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
                <button
                  @click="removeUser(user.id)"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify"; // import toast directly
import "vue3-toastify/dist/index.css"; // make sure CSS is imported once globally

const userStore = useUserStore();
const { t } = useI18n();

const showModal = ref(false);
const modalMode = ref("create"); // 'create' | 'edit' | 'preview'
const editingId = ref(null);

const form = reactive({
  email: "",
  password: "",
  username: "",
  role: "USER",
});

function openModal(mode, user = null) {
  modalMode.value = mode;
  showModal.value = true;

  if (user) {
    editingId.value = user.id;
    form.email = user.email;
    form.username = user.username;
    form.role = user.role;
    form.password = "";
  } else {
    resetForm();
  }
}

function resetForm() {
  form.email = "";
  form.password = "";
  form.username = "";
  form.role = "USER";
  editingId.value = null;
}

function closeModal() {
  showModal.value = false;
  resetForm();
}

async function handleSubmit() {
  try {
    if (modalMode.value === "edit" && editingId.value) {
      await userStore.updateUser(editingId.value, { ...form });
      toast.success(t("toast.update_success"), {
        autoClose: 3000,
        position: "top-right",
      });
    } else {
      await userStore.addUser({ ...form });
      toast.success(t("toast.create_success"), {
        autoClose: 3000,
        position: "top-right",
      });
    }
    closeModal();
  } catch (err) {
    toast.error(t("toast.action_failed"), {
      autoClose: 3000,
      position: "top-right",
    });
  }
}

async function removeUser(id) {
  try {
    await userStore.removeUser(id);
    toast.success(t("toast.delete_success"), {
      autoClose: 3000,
      position: "top-right",
    });
  } catch (err) {
    toast.error(t("toast.action_failed"), {
      autoClose: 3000,
      position: "top-right",
    });
  }
}

onMounted(() => {
  userStore.loadUsers();
});
</script>

<style scoped>
.font-kantumruy {
  font-family: "Kantumruy", sans-serif;
}
</style>
