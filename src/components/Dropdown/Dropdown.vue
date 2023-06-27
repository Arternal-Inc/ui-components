<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { SelectDropdown } from '@@/types'

type Props = {
  placeholder?: string
  selected?: SelectDropdown
  selectedValue?: string
  triggerId?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Select', // default
  triggerId: '',
})

const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)

onClickOutside(target, () => (isOpen.value = false))
</script>

<template>
  <div class="relative flex items-center gap-x-2">
    <div ref="target" class="relative grow" :id="triggerId">
      <button
        type="button"
        @click="toggle"
        class="inline-flex w-full items-center rounded border border-slate-300 px-3 py-2.5 text-center text-sm font-medium hover:bg-slate-100"
        :class="{
          'text-slate-400': !selectedValue,
          'text-slate-600': selectedValue,
        }"
      >
        <slot name="trigger-text">
          {{ selected?.value ? selected.name : `${placeholder}` }}
        </slot>

        &nbsp;
        <svg
          class="ml-auto h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <!-- Dropdown menu -->
      <Transition name="to-bottom">
        <div
          v-if="isOpen"
          class="absolute z-10 w-full overflow-hidden rounded-md border border-slate-300 bg-white text-slate-600 shadow"
          @click="toggle"
        >
          <slot name="options" />
        </div>
      </Transition>
    </div>

    <slot name="after-dropdown" />
  </div>
</template>
