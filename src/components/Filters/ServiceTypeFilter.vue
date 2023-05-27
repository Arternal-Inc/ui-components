<script setup lang="ts">
import { ref } from 'vue'
import { FilterItemValue } from '@@/types'

const emit = defineEmits<{
  (e: 'select', value: FilterItemValue): void
}>()

const isLoading = ref<boolean>(false)

let options: FilterItemValue[] = [
  {
    id: 'ret',
    value: 'Retainer',
  },
  {
    id: 'vw',
    value: 'Valuation Work',
  },
  {
    id: 'rw',
    value: 'Report Writing',
  },
  {
    id: 'other',
    value: 'Other',
  },
]

function onSelect(option: any) {
  emit('select', option)
}
</script>

<template v-if="fixedFee">
  <ul class="overflow-y-auto text-slate-600">
    <li v-if="!isLoading" class="w-full">
      <label
        v-for="option in options"
        class="flex w-full cursor-pointer items-center py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        <input @click="onSelect(option)" type="checkbox" class="mr-2 w-4" />
        {{ option.value }}
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
