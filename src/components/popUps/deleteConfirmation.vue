<template>
  <div
    v-if="showDeleteConfirmation"
    class="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
  >
    <div
      class="h-5/6 max-h-[250px] w-5/6 max-w-[800px] rounded-2xl bg-white shadow-2xl outline outline-2 outline-grey-mid"
    >
      <div class="flex justify-end">
        <div
          @click="$emit('toggleShowDeleteConfirmation')"
          class="m-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-accent transition hover:scale-105 hover:brightness-110"
        >
          <i class="fa-solid fa-xmark text-xl text-white"></i>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <h1 class="text-2xl">Czy na pewno chcesz usunąć ten profil?</h1>
      </div>

      <div class="mt-10 flex w-full justify-evenly px-7">
        <button
          @click="
            $emit('toggleShowDeleteConfirmation'), $emit('deleteSelected')
          "
          class="h-12 w-36 rounded-xl border bg-blue-500 text-lg text-white transition hover:scale-105"
        >
          Tak
        </button>
        <button
          @click="$emit('toggleShowDeleteConfirmation'), $emit('leaveSelected')"
          class="h-12 w-36 rounded-xl border bg-blue-500 text-lg text-white transition hover:scale-105"
        >
          Nie
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits([
  "toggleShowDeleteConfirmation",
  "leaveSelected",
  "deleteSelected",
]);

const props = defineProps({
  showDeleteConfirmation: Boolean,
});
</script>
