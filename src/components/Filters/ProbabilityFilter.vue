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

interface ProbabilityType extends FilterItemValue {
  class: string
}

const options: ProbabilityType[] = [
  {
    id: 'low',
    value: 'low',
    class: 'bg-[#DBEAFE] text-[#3B82F6]',
  },
  {
    id: 'medium',
    value: 'medium',
    class: 'bg-[#FFEDD5] text-[#F97316]',
  },
  {
    id: 'high',
    value: 'high',
    class: 'bg-[#DCFCE7] text-[#22C55E]',
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
        class="flex cursor-pointer items-center space-x-3 py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        <input
          @click="onSelect(option)"
          type="checkbox"
          class="w-4"
          :checked="selected.map((s: any) => s.value).includes(option.value)"
        />
        <span
          :class="option.class"
          class="flex items-center space-x-1.5 overflow-hidden rounded-md py-0.5 px-2"
        >
          <svg
            v-if="option.id === 'l'"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 5.85291H2.78571V13.5H0V5.85291Z" fill="#3B82F6" />
            <path
              opacity="0.75"
              d="M4.64307 3.55872H7.42878V13.4999H4.64307V3.55872Z"
              fill="#93C5FD"
            />
            <path
              opacity="0.75"
              d="M9.28564 0.5H12.0714V13.5H9.28564V0.5Z"
              fill="#93C5FD"
            />
          </svg>

          <svg
            v-if="option.id === 'm'"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 5.85291H2.78571V13.5H0V5.85291Z" fill="#F97316" />
            <path
              d="M4.64307 3.55872H7.42878V13.4999H4.64307V3.55872Z"
              fill="#F97316"
            />
            <path
              opacity="0.75"
              d="M9.28564 0.5H12.0714V13.5H9.28564V0.5Z"
              fill="#FDBA74"
            />
          </svg>

          <svg
            v-if="option.id === 'h'"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 5.85291H2.78571V13.5H0V5.85291Z" fill="#22C55E" />
            <path
              d="M4.64307 3.55872H7.42878V13.4999H4.64307V3.55872Z"
              fill="#22C55E"
            />
            <path d="M9.28564 0.5H12.0714V13.5H9.28564V0.5Z" fill="#22C55E" />
          </svg>

          <span :class="option.class" class="text-sm">{{
            option.value.charAt(0).toUpperCase() + option.value.slice(1)
          }}</span>
        </span>
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
