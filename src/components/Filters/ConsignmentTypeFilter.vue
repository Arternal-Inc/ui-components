<script setup lang="ts">
import { ref } from 'vue'
import { FilterItemValue } from '@@/types'

const emit = defineEmits<{
  (e: 'select', value: FilterItemValue): void
}>()

const isLoading = ref<boolean>(false)

const options: FilterItemValue[] = [
  {
    id: 'auction',
    value: 'Auction',
  },
  {
    id: 'aps',
    value: 'Auction Private Sale',
  },
  {
    id: 'private',
    value: 'Private',
  },
  {
    id: 'trade',
    value: 'Trade',
  },
]

function onSelect(option: any) {
  emit('select', option)
}
</script>
<template>
  <ul class="overflow-y-auto text-slate-600">
    <li v-for="option in options" v-if="!isLoading" class="w-full">
      <button
        @click="onSelect(option)"
        class="flex w-full cursor-pointer items-center py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        {{ option.value }}
      </button>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
