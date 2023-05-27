<script setup lang="ts">
import { ref } from 'vue'
import { FilterItemValue } from '@@/types'

const props = defineProps<{
  value?: any
}>()

const selected = ref([])

if (props.value) {
  selected.value = props.value
}

const emit = defineEmits<{
  (e: 'select', value: FilterItemValue): void
}>()

const isLoading = ref<boolean>(false)

interface DealTierType extends FilterItemValue {
  class: string
}

const options: DealTierType[] = [
  {
    id: 'green',
    value: 'green',
    class: 'bg-[#22C55E]',
  },
  {
    id: 'blue',
    value: 'blue',
    class: 'bg-[#0EA5E9]',
  },
  {
    id: 'gold',
    value: 'gold',
    class: 'bg-[#EECA6E]',
  },
]

function onSelect(option: any) {
  emit('select', option)
}
</script>
<template>
  <ul class="overflow-y-auto text-slate-600">
    <li v-if="!isLoading" class="w-full">
      <label
        v-for="option in options"
        class="flex w-full cursor-pointer items-center py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        <input
          @click="onSelect(option)"
          type="checkbox"
          class="mr-2 w-4"
          :checked="selected.map((s: any) => s.value).includes(option.value)"
        />
        <span class="mr-2 h-3 w-3 rounded-full" :class="option.class" />
        {{ option.value.charAt(0).toUpperCase() + option.value.slice(1) }}
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
