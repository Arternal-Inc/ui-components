<script setup lang="ts">
import { ref } from 'vue'
import { FilterItemValue } from '@@/types'
import { useRoute } from 'vue-router'

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

const route = useRoute()

let options: FilterItemValue[] = [
  {
    id: 'ibr',
    value: 'IB Rejected',
  },
  {
    id: 'ibbn',
    value: "IB'd by BN",
  },
  {
    id: 'ibnbn',
    value: "IB'd not by BN",
  },
  {
    id: 'cbib',
    value: "Cannot be IB'd",
  },
  {
    id: 'ga',
    value: 'Guaranteed',
  },
  {
    id: 'not guaranteed',
    value: 'Not Guaranteed',
  },
]

switch (route.name) {
  case 'DealPipeline':
    break
  case 'DealBuySide':
    options = options.slice(0, 4)
    break
  case 'DealSaleSide':
    options = options.slice(4, 6)
    break
  default:
    break
}

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
        {{ option.value }}
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
