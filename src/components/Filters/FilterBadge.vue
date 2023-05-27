<script setup lang="ts">
import {
  XMarkIcon,
  CheckBadgeIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import { Contact, FilterItem } from '@@/types'
import { getInitials } from '@/utils'
import {
  ContactFilter,
  CurrencyFilter,
  PriceFilter,
  DealTierFilter,
  ClientTierFilter,
  ProbabilityFilter,
  ConsignmentTypeFilter,
  IBStatusFilter,
  DealStageFilter,
  ServiceTypeFilter,
  ContactCodenameFilter,
} from './filters'
import { ref } from 'vue'
import { useToggle, onClickOutside } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    filter: FilterItem | any
  }>(),
  {}
)

const [isFilterOpen] = useToggle()

const filterType = ref('')

const selectedFilter = ref(props.filter)

const editFilter = () => {
  if (props.filter.component === 'DealTypeFilter') {
    return
  } else {
    isFilterOpen.value = !isFilterOpen.value
    filterType.value = props.filter.component
    console.log('this', filterType.value)
  }
}

const target = ref(null)

onClickOutside(target, () => {
  isFilterOpen.value = false
})

function onSelect(value: any) {
  selectedFilter.value = props.filter
  console.log('ss', value)
  if (selectedFilter.value && value) {
    if (selectedFilter.value.hasMultipleOptions) {
      if (!selectedFilter.value.value) {
        selectedFilter.value.value = []
      }

      if (selectedFilter.value.component === 'CurrencyFilter') {
        if (
          !selectedFilter.value.value
            .map((e: any) => e.code)
            .includes(value.code)
        ) {
          selectedFilter.value.value.push(value)
        } else {
          const pos = selectedFilter.value.value
            .map((e: any) => e.code)
            .indexOf(value.code)

          selectedFilter.value.value.splice(pos, 1)
        }
      } else if (selectedFilter.value.component === 'DealStageFilter') {
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
      } else if (
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
    } else {
      selectedFilter.value.value = value
    }

    emit('filterUpdated', selectedFilter.value)
  }
}

const emit = defineEmits<{
  (e: 'remove', value: FilterItem): void
  (e: 'filterUpdated', value: FilterItem): void
}>()
</script>

<template>
  <div
    class="inline-flex w-fit items-center self-start rounded-[5px] border border-slate-200 bg-slate-50 text-xs"
  >
    <div
      @click="editFilter"
      class="border-r border-neutral-300 py-2 pl-2 hover:cursor-pointer"
    >
      <div class="mr-2 flex h-5 items-center space-x-1 whitespace-nowrap">
        <span>{{ filter.label }}</span>

        <div class="flex items-center space-x-1 text-neutral-500">
          <template v-if="filter.type === 'contact'">
            <UserCircleIcon
              v-if="!filter.value?.display_name"
              class="h-5 w-5"
            />
            <div
              v-else-if="!filter.value?.image_url"
              class="dark relative overflow-hidden rounded-full uppercase outline outline-slate-50"
            >
              <div
                class="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-gray-100 p-2 dark:bg-gray-600"
              >
                <div
                  class="text-[10px] font-medium text-gray-600 dark:text-gray-300"
                >
                  {{
                    getInitials(
                      filter.label?.toLowerCase().includes('codename')
                        ? filter.value?.code_name
                        : filter.value?.display_name
                    )
                  }}
                </div>
              </div>
            </div>

            <div
              v-else
              class="relative w-5 overflow-hidden rounded-full border border-slate-200"
            >
              <img
                :src="filter.value?.image_url"
                loading="lazy"
                draggable="false"
              />
            </div>

            <span>{{
              filter.label?.toLowerCase().includes('codename')
                ? filter.value?.code_name
                : filter.value?.display_name
            }}</span>
          </template>

          <template v-else-if="['currency'].includes(`${filter.type}`)">
            is {{ filter.value?.map((f: any) => f?.code).join(' or ') || '' }}
          </template>

          <template v-else-if="['price'].includes(`${filter.type}`)">
            is between {{ `${filter.value?.min} - ${filter.value?.max}` || '' }}
          </template>

          <template v-else-if="['clientTier'].includes(`${filter.type}`)">
            <CheckBadgeIcon class="mr-2 w-5" />
            {{ filter.value?.map((f: any) => f?.value).join(' or ') || '' }}
          </template>

          <template
            v-else-if="
              Array.isArray(filter.value) &&
              ['ibStatus', 'serviceType', 'stage'].includes(`${filter.type}`)
            "
          >
            is
            {{ filter.value?.map((f: any) => f?.value).join(' or ') || '' }}
          </template>

          <template v-else-if="Array.isArray(filter.value)">
            is
            {{
              filter.value
                ?.map(
                  (f: any) => f?.id.charAt(0).toUpperCase() + f?.id.slice(1)
                )
                .join(' or ') || ''
            }}
          </template>

          <template v-else> is {{ filter.value?.value || '' }} </template>
        </div>
      </div>
    </div>

    <div class="absolute">
      <div
        class="absolute z-10 mt-5 min-w-[15vw] max-w-[30vw] rounded-md bg-white"
      >
        <!-- ContactFilter -->
        <ContactCodenameFilter
          v-if="filterType === 'ContactCodenameFilter' && isFilterOpen"
          @select="onSelect"
          autofocus
          ref="target"
          @click="() => (isFilterOpen = !isFilterOpen)"
        />

        <ContactFilter
          v-if="filterType === 'ContactFilter' && isFilterOpen"
          @select="onSelect"
          autofocus
          ref="target"
          @click="() => (isFilterOpen = !isFilterOpen)"
        />

        <!-- CurrencyFilter -->
        <CurrencyFilter
          v-if="filterType === 'CurrencyFilter' && isFilterOpen"
          @select="onSelect"
          autofocus
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- PriceFilter -->
        <PriceFilter
          v-if="filterType === 'PriceFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
        />

        <!-- DealTierFilter -->
        <DealTierFilter
          v-if="filterType === 'DealTierFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- ClientTierFilter -->
        <ClientTierFilter
          v-if="filterType === 'ClientTierFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- ProbabilityFilter -->
        <ProbabilityFilter
          v-if="filterType === 'ProbabilityFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- ConsignmentTypeFilter -->
        <ConsignmentTypeFilter
          v-if="filterType === 'ConsignmentTypeFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
          @click="() => (isFilterOpen = !isFilterOpen)"
        />

        <!-- ServiceTypEFilter -->
        <ServiceTypeFilter
          v-if="filterType === 'ServiceTypeFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- IBStatusFilter -->
        <IBStatusFilter
          v-if="filterType === 'IBStatusFilter' && isFilterOpen"
          @select="onSelect"
          ref="target"
          :value="selectedFilter.value"
        />

        <!-- DealStageFilter -->
        <DealStageFilter
          v-if="filterType === 'DealStageFilter' && isFilterOpen"
          @select="onSelect"
          autofocus
          ref="target"
          :value="selectedFilter.value"
        />
      </div>
    </div>

    <span
      class="px-2 text-primary-500 hover:cursor-pointer hover:text-primary-600"
      @click="$emit('remove', filter)"
    >
      <XMarkIcon class="h-4 w-4 stroke-2" />
    </span>
  </div>
</template>
