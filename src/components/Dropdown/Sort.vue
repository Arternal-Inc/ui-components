<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside, useUrlSearchParams } from '@vueuse/core'
import { provideApolloClient } from '@vue/apollo-composable'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { apolloClient } from '@/graphql'
import { useRouter, useRoute } from 'vue-router'
import { useMixpanel } from '@/plugins/mixpanel'

const mixpanel = useMixpanel()

const router = useRouter()
const route = useRoute()

provideApolloClient(apolloClient)

const sortOption = ref<any>(useUrlSearchParams('history'))
const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)

const sortOptions = [
  { text: 'Custom Sort', sort: 'cs', order: 'asc' },
  {
    text: 'Price (Highest)',
    sort: 'ph',
    order: 'desc',
  },
  { text: 'Price (Lowest)', sort: 'pl', order: 'asc' },
  { text: 'Updated (Newest)', sort: 'un', order: 'desc' },
  { text: 'Updated (Oldest)', sort: 'uo', order: 'asc' },
  { text: 'Created (Newest)', sort: 'cn', order: 'desc' },
  { text: 'Created (Oldest)', sort: 'co', order: 'asc' },
]

const sortLabel = computed(() => {
  let text = 'Sort By'
  sortOptions.find((option) => {
    if (option.sort === route.query.sort) {
      text = option.text
    }
  })
  return text
})

onClickOutside(target, () => (isOpen.value = false))

const updateValues = (e: any) => {
  const value = e.target.value
  sortOption.value = sortOptions.find((option) => option.sort === value)

  mixpanel.track(`Kanban Sort By ${sortOption.value.text}`)

  router.push({
    query: { sort: sortOption.value.sort },
  })
}
</script>

<template>
  <div ref="target" class="relative">
    <button
      @click="toggle"
      class="inline-flex items-center rounded-lg border-2 bg-slate-100 px-3 py-2 text-center text-sm font-medium"
    >
      <div class="flex">
        {{ sortLabel }}
        <ChevronDownIcon class="ml-1 h-5 w-5" />
      </div>
    </button>
    <!-- Dropdown menu -->
    <Transition name="to-bottom">
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 rounded-md border border-slate-300 bg-white shadow"
      >
        <ul class="space-y-1 p-1 text-sm text-gray-700">
          <li v-for="option in sortOptions">
            <div
              class="flex items-center whitespace-nowrap rounded p-2 hover:bg-gray-100"
            >
              <input
                :id="option.sort"
                type="radio"
                :value="option.sort"
                :order="option.order"
                name="default-radio"
                @change="updateValues($event)"
              />
              <label
                :for="option.sort"
                class="ml-2 rounded text-sm font-medium text-gray-900"
                >{{ option.text }}</label
              >
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
