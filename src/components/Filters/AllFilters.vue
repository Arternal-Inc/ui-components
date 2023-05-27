<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { FilterItem } from '@@/types'
import { debouncedWatch } from '@vueuse/core'
import { useMixpanel } from '@/plugins/mixpanel'

import {
  ContactFilter,
  CurrencyFilter,
  PriceFilter,
  DealTierFilter,
  ClientTierFilter,
  ProbabilityFilter,
  DealTypeFilter,
  ConsignmentTypeFilter,
  IBStatusFilter,
  DealStageFilter,
  ServiceTypeFilter,
  ContactCodenameFilter,
} from './filters'

const mixpanel = useMixpanel()

const props = defineProps<{ filters: FilterItem[] }>()

const emit = defineEmits<{
  (e: 'filterUpdated', value: FilterItem): void
}>()

const showFilters = ref<FilterItem[]>([])
const selectedFilter = ref<FilterItem | any>()
const searchKeyword = ref<string>('')

onMounted(async () => {
  const input = document.getElementById('searchFilter')
  input?.focus()
})

showFilters.value = props.filters

function onFilterSelect(filter: FilterItem) {
  selectedFilter.value = filter
}

function onSelect(value: any) {
  if (selectedFilter.value && value) {
    if (selectedFilter.value.hasMultipleOptions) {
      if (!selectedFilter.value.value) {
        selectedFilter.value.value = []
      }
      if (selectedFilter.value.component === 'DealStageFilter') {
        if (
          !selectedFilter.value.value
            .map((e: any) => e.value)
            .includes(value.value)
        ) {
          selectedFilter.value.value.push(value)
        } else {
          const pos = selectedFilter.value.value
            .map((e: any) => e.value)
            .indexOf(value.value)

          selectedFilter.value.value.splice(pos, 1)
        }
      } else if (!selectedFilter.value.value.includes(value)) {
        selectedFilter.value.value.push(value)
      } else {
        const pos = selectedFilter.value.value
          .map((e: any) => e.value)
          .indexOf(value.value)

        selectedFilter.value.value.splice(pos, 1)
      }
    } else if (selectedFilter.value.component === 'CurrencyFilter') {
      selectedFilter.value.value = value.code
    } else {
      selectedFilter.value.value = value
    }

    let filterType = selectedFilter.value.label
    if (filterType === 'Relationship Manager') filterType = 'RM'
    else if (filterType === 'Account Manager') filterType = 'AM'

    mixpanel.track(`Kanban Filter ${filterType}`)

    emit('filterUpdated', selectedFilter.value)
  }
}

function onSubmit(e: any) {
  e.preventDefault()
  search()
  return false
}

function search() {
  showFilters.value = props.filters.filter((f: FilterItem) =>
    f.label.toLowerCase().includes(searchKeyword.value)
  )
}
debouncedWatch(
  () => searchKeyword.value,
  () => {
    if (searchKeyword.value) mixpanel.track('Kanban Filter Search')
  },
  { debounce: 500 }
)

function clear(e: any) {
  showFilters.value = props.filters
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute z-10 mt-1.5 min-w-[20vw] max-w-[30vw] overflow-hidden rounded-md border border-slate-200 bg-white"
    >
      <div
        v-if="!selectedFilter"
        class="sticky top-0 z-10 border-b border-slate-300 bg-white p-3"
      >
        <form @submit="onSubmit" @keyup.esc="clear" class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center py-1.5 pl-1.5"
          >
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>

          <input
            v-model="searchKeyword"
            @keyup="search"
            type="search"
            placeholder="search ..."
            id="searchFilter"
          />
        </form>
      </div>
      <button
        v-for="filter in showFilters"
        v-if="!selectedFilter?.id"
        @click="onFilterSelect(filter)"
        type="button"
        class="w-full border border-white py-2 px-3 text-left text-[16px] text-slate-600 hover:bg-slate-200"
      >
        {{ filter.label }}
      </button>

      <div v-if="selectedFilter?.id && selectedFilter.component">
        <!-- ContactFilter -->
        <ContactCodenameFilter
          v-if="selectedFilter.component === 'ContactCodenameFilter'"
          @select="onSelect"
          autofocus
        />

        <ContactFilter
          v-if="selectedFilter.component === 'ContactFilter'"
          @select="onSelect"
          autofocus
        />

        <!-- CurrencyFilter -->
        <CurrencyFilter
          v-if="selectedFilter.component === 'CurrencyFilter'"
          @select="onSelect"
          autofocus
        />

        <!-- PriceFilter -->
        <PriceFilter
          v-if="selectedFilter.component === 'PriceFilter'"
          @select="onSelect"
        />

        <!-- DealTierFilter -->
        <DealTierFilter
          v-if="selectedFilter.component === 'DealTierFilter'"
          @select="onSelect"
        />

        <!-- ClientTierFilter -->
        <ClientTierFilter
          v-if="selectedFilter.component === 'ClientTierFilter'"
          @select="onSelect"
        />

        <!-- ProbabilityFilter -->
        <ProbabilityFilter
          v-if="selectedFilter.component === 'ProbabilityFilter'"
          @select="onSelect"
        />

        <!-- DealTypeFilter -->
        <DealTypeFilter
          v-if="selectedFilter.component === 'DealTypeFilter'"
          @select="onSelect"
        />

        <!-- ConsignmentTypeFilter -->
        <ConsignmentTypeFilter
          v-if="selectedFilter.component === 'ConsignmentTypeFilter'"
          @select="onSelect"
        />

        <!-- ServiceTypEFilter -->
        <ServiceTypeFilter
          v-if="selectedFilter.component === 'ServiceTypeFilter'"
          @select="onSelect"
        />

        <!-- IBStatusFilter -->
        <DealStageFilter
          v-if="selectedFilter.component === 'DealStageFilter'"
          @select="onSelect"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(input[type='search']) {
  padding: 7px 10px 7px 30px;
  border-radius: 7px;
}
</style>
