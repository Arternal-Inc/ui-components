<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { Currency } from '@@/types'

const props = defineProps<{
  autofocus?: boolean
  value?: any
}>()

const emit = defineEmits<{
  (e: 'select', value: Currency): void
}>()

const currencies = ref<Currency[]>([])
const isLoading = ref<boolean>(true)
const searchKeyword = ref<string>('')
const selected = ref()
const values = ref([])

if (props.value) {
  values.value = props.value
}

onMounted(async () => {
  if (props.autofocus) {
    const input = document.getElementById('currencySearch')
    input?.focus()
  }
})

const query = gql`
  query getCurrencyList($search: String!, $offset: Int!, $limit: Int!) {
    currencies: getCurrencyList(
      search: $search
      offset: $offset
      limit: $limit
    ) {
      name
      code
      symbol
    }
  }
`

const { onResult, refetch } = useQuery(query, {
  search: '',
  offset: 0,
  limit: 10,
})

onResult((result) => {
  currencies.value = result.data?.currencies || []
  isLoading.value = false
})

watch(
  () => searchKeyword.value,
  (keyword) => {
    if (keyword === '') {
      // @ts-ignore
      refetch({ search: '' })
    }
  },
  { immediate: true }
)

function search() {
  // @ts-ignore
  refetch({ search: searchKeyword.value })
}

function onSubmit(e: any) {
  e.preventDefault()

  // @ts-ignore
  refetch({ search: searchKeyword.value })

  return false
}

function onSelect(currency: Currency) {
  selected.value = currency
  emit('select', currency)
}
</script>

<template>
  <ul class="max-h-[70vh] overflow-y-auto text-slate-600">
    <li class="sticky top-0 z-10 border-b border-slate-300 bg-white p-3">
      <form @submit="onSubmit" class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center py-1.5 pl-1.5"
        >
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        </div>

        <input
          class="pl-8"
          v-model="searchKeyword"
          @keyup="search"
          type="search"
          placeholder="search ..."
          autofocus
          id="currencySearch"
        />
      </form>
    </li>
    <li v-if="!isLoading" class="w-full">
      <!-- <label
        v-for="currency in currencies"
        @click="onSelect(currency)"
        class="flex w-full cursor-pointer items-center py-2 px-3 text-[14px] hover:bg-slate-200"
      >
        ({{ currency.code }}) {{ currency.name }}
      </label> -->
      <label
        v-for="currency in currencies"
        class="flex w-full cursor-pointer items-center py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        <input
          @click="onSelect(currency)"
          type="checkbox"
          class="mr-2 w-4"
          :checked="values.map((s: any) => s.code).includes(currency.code)"
        />
        ({{ currency.code }}) {{ currency.name }}
      </label>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
