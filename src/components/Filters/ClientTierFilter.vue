<script setup lang="ts">
import { ref } from "vue";
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";
import { FilterItemValue } from '@@/types';

const emit = defineEmits<{
  (e: "select", value: FilterItemValue): void;
}>();

const isLoading = ref<boolean>(false);

const options: FilterItemValue[] = [
  {
    id: 't1',
    value: 'T1'
  },
  {
    id: 't2',
    value: 'T2'
  },
  {
    id: 't3',
    value: 'T3'
  },
]

function onSelect(option: any) {
  emit("select", option);
}
</script>
<template>
  <ul class="overflow-y-auto text-slate-600">
    <li v-if="!isLoading" class="w-full">
      <label
        v-for="option in options"
        class="flex w-full items-center py-2 px-3 text-[16px] hover:bg-slate-200 cursor-pointer"
      >
        <input @click="onSelect(option)" type="checkbox" class="w-4 mr-2" />
        <CheckBadgeIcon class="w-5 mr-2" />
        {{ option.value }}
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
