<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Currency } from '@@/types'
import CurrencyFilter from '@/components/Filters/CurrencyFilter.vue'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { apolloClient } from '@/graphql'
import gql from 'graphql-tag'

provideApolloClient(apolloClient)

const props = defineProps<{
  selected?: any
}>()

const emit = defineEmits<{
  (e: 'updateDeal', target: any, value: any): void
}>()

const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)
const selected = ref(props.selected)

const query = gql`
  query getCurrencyByCode($code: String!) {
    getCurrencyByCode(code: $code) {
      code
      name
      symbol
    }
  }
`
watch(
  () => props.selected,
  (currency) => {
    if ((props.selected as Currency)?.code) selected.value = currency
    else if (props.selected) {
      const { onResult } = useQuery(query, { code: props.selected })
      onResult((results) => {
        selected.value = results.data?.getCurrencyByCode
      })
    }
  },
  { immediate: true }
)

onClickOutside(target, () => (isOpen.value = false))

function onSelect(currency: Currency) {
  isOpen.value = false
  selected.value = currency

  emit('updateDeal', target.value, currency.code)
}
</script>

<template>
  <div ref="target" class="relative">
    <button
      type="button"
      @click="toggle"
      class="inline-flex w-full items-center rounded border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-600 hover:bg-gray-100 sm:py-2.5"
    >
      <span v-if="selected && selected.name"
        >({{ selected.code }}) {{ selected.name }}</span
      >
      <span v-else class="text-slate-400">{{
        $t('deals.selectCurrency')
      }}</span>
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
        <CurrencyFilter autofocus @select="onSelect" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
:deep(input[type='search']) {
  padding: 7px 10px 7px 30px;
  border-radius: 7px;
}
</style>
