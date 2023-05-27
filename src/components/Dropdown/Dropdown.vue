<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { DropdownOptions, DropdownOption } from '@@/types'

type Props = {
  label: string
  options: DropdownOptions
}

const props = withDefaults(defineProps<Props>(), {
  label: '', // default
})

const emit = defineEmits<{
  (e: 'onChange', id: string): void
}>()

const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)
const selected = ref()

onClickOutside(target, () => (isOpen.value = false))

watch(selected, (value) => {
  isOpen.value = false
  emit('onChange', value)
  const choosen = props.options.filter(
    (option: DropdownOption) => value === option.value
  )
  if (choosen?.length) {
    selected.value = choosen[0]
    emit('onChange', value)
  }
})
</script>

<template>
  <div ref="target" class="relative">
    <button
      type="button"
      @click="toggle"
      class="inline-flex w-full items-center rounded border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-400 hover:bg-gray-100"
    >
      {{ selected?.value ? selected.label : `${$t('forms.select')} ${label}` }}
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
        class="absolute z-10 w-full overflow-hidden rounded-md border border-slate-300 bg-white shadow"
      >
        <div class="overflow-y-auto text-slate-400">
          <label
            v-for="option in options"
            :for="option.value"
            class="flex cursor-pointer items-center space-x-2 p-3 hover:bg-gray-100"
          >
            <input
              v-model="selected"
              :id="option.value"
              :value="option.value"
              type="radio"
              class="hidden p-1 hover:bg-gray-100"
            />
            <span class="text-sm">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
button {
  text-transform: capitalize;
}
</style>
