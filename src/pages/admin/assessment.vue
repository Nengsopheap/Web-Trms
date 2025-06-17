<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold font-kantumruy">
      {{ $t("title.Assessment") }}
    </h1>

    <!-- Add New Button -->
    <div class="flex justify-end items-end">
      <button
        @click="openCreateModal"
        class="bg-[#111827] p-2 rounded-md text-white mb-3 font-kantumruy"
      >
        {{ $t("button.create_assessment") }}
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
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="border p-2 mb-3 w-full rounded resize-y min-h-[80px]"
          ></textarea>

          <div class="flex justify-end">
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
              <!-- {{ editing ? "Update" : "Create" }} -->
              {{ $t("button.create_assessment") }}
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
          <thead class="bg-[#111827] text-white">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium">#</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.Assessment") }}
              </th>
              <!-- <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.description") }}
              </th> -->
              <th
                class="px-4 py-2 text-right text-sm font-medium"
                style="width: 550px"
              >
                {{ $t("title.created_at") }}
              </th>
              <th
                class="px-4 py-2 text-right text-sm font-medium"
                style="width: 200px"
              >
                {{ $t("title.updated_at") }}
              </th>
              <th class="px-4 py-2 text-right text-sm font-medium">
                {{ $t("title.Actions") }}
              </th>
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
              <!-- <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ a.description }}
              </td> -->
              <!-- Right-aligned Created At -->
              <td class="px-4 py-2 text-sm text-right text-gray-600">
                {{ formatDate(a.created_at) }}
              </td>
              <!-- Right-aligned Updated At -->
              <td class="px-4 py-2 text-sm text-right text-gray-600">
                {{ formatDate(a.updated_at) }}
              </td>
              <td class="px-4 py-2 text-right">
                <button
                  @click="openEditModal(a)"
                  class="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <SquarePen width="19" height="19" />
                </button>

                <button
                  @click="remove(a.id)"
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
import { ref, onMounted } from "vue";
import { useAssessmentStore } from "../../stores/assessment";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { SquarePen } from "lucide-vue-next";

const assessmentStore = useAssessmentStore();
const { t } = useI18n();
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
