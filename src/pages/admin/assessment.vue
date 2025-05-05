<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold mb-4">Assessments</h1>

    <!-- Add New Button -->
    <div class="flex justify-end items-end">
      <button
        @click="openCreateModal"
        class="bg-[#B90C0E] p-2 rounded-md text-white mb-3"
      >
        Add New
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">
          {{ editing ? "Edit Assessment" : "Add New Assessment" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            class="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            v-model="form.description"
            type="text"
            placeholder="Description"
            class="border p-2 mb-3 w-full rounded"
          />

          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-[#B90C0E] text-white px-4 py-2 rounded"
            >
              {{ editing ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Table -->
    <div v-if="assessmentStore.loading">Loading assessments...</div>
    <div v-if="assessmentStore.error" class="text-red-600">
      {{ assessmentStore.error }}
    </div>

    <div v-if="assessmentStore.assessments.length" class="w-full mx-auto">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#31247d] text-white">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium">#</th>
              <th class="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                Created At
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                Updated At
              </th>
              <th class="px-4 py-2 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(a, index) in assessmentStore.assessments"
              :key="a.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 text-sm text-gray-700">{{ index + 1 }}</td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ a.name }}
              </td>
              <td class="px-4 py-2 text-sm text-gray-600">
                {{ formatDate(a.created_at) }}
              </td>
              <td class="px-4 py-2 text-sm text-gray-600">
                {{ formatDate(a.updated_at) }}
              </td>
              <td class="px-4 py-2 text-right">
                <button
                  @click="openEditModal(a)"
                  class="text-sm text-blue-600 hover:text-blue-800 mr-3"
                >
                  <!-- Edit Icon (Modern Pencil) -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2zm8 8h4m-2-2v4m-4-4v4"
                    />
                  </svg>
                </button>
                <button
                  @click="remove(a.id)"
                  class="text-sm text-red-600 hover:text-red-800"
                >
                  <!-- Delete Icon (Trash Can) -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-1 14H6L5 7m6 0V3m0 4h-2m2 0h2"
                    />
                  </svg>
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
import { ref, onMounted } from "vue";
import { useAssessmentStore } from "../../stores/assessment";

const assessmentStore = useAssessmentStore();

const form = ref({
  name: "",
  description: "",
});
const showModal = ref(false);
const editing = ref(false);
const editingId = ref(null);

const openCreateModal = () => {
  form.value = { name: "", description: "" };
  editing.value = false;
  editingId.value = null;
  showModal.value = true;
};

const openEditModal = (assessment) => {
  form.value = {
    name: assessment.name,
    description: assessment.description,
  };
  editing.value = true;
  editingId.value = assessment.id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editing.value = false;
  editingId.value = null;
  form.value = { name: "", description: "" };
};

const handleSubmit = async () => {
  if (editing.value && editingId.value) {
    await assessmentStore.updateExistingAssessment(editingId.value, form.value);
  } else {
    await assessmentStore.createNewAssessment(form.value);
  }
  closeModal();
};

const remove = async (id) => {
  await assessmentStore.removeAssessment(id);
};

const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];

onMounted(() => {
  assessmentStore.loadAssessments();
});
</script>
