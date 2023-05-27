<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'select', value: any): void;
}>();

const min = ref<number>();
const max = ref<number>();

function onSubmit(e: any) {
  e.preventDefault();
  emit('select', { min: min.value, max: max.value });
  return false;
}
</script>
<template>
  <form @submit="onSubmit" role="form" class="flex flex-col p-5 text-slate-600">
    <div class="mb-3 text-sm">Asking Price</div>
    <div class="mb-5 flex items-center">
      <input v-model="min" type="text" class="block h-11 w-max text-sm" placeholder="0" />
      <span class="mx-6">to</span>
      <input v-model="max" type="text" class="block h-11 w-max text-sm" placeholder="0" />
    </div>
    <button
      type="submit"
      class="inline-flex items-center border text-center transition-colors duration-100 hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 undefined px-4 py-3 text-sm rounded-xl border-transparent w-full justify-center self-center"
      :disabled="Number(max) < Number(min)"
      :class="{
        'bg-primary-500 hover:bg-primary-600 text-white': Number(max) > Number(min),
        'bg-disabled-100 text-disabled-400 cursor-not-allowed ': !(Number(max) > Number(min)),
      }"
    >
      <span class="whitespace-nowrap first-letter:uppercase capitalize">apply</span>
    </button>
  </form>
</template>
