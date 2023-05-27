<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { DealStage } from '@@/types'
import { useDealStore } from '@/stores/deals'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const dealStore = useDealStore()

const { deal } = storeToRefs(dealStore)

const route = useRoute()
const type = ref('')

switch (route.name) {
  case 'DealBuySide':
    type.value = 'buy'
    break
  case 'DealSaleSide':
    type.value = 'sell'
    break
  case 'DealFee':
    type.value = 'fixed_fee'
  default:
    break
}

const props = defineProps<{
  autofocus?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: any): void
}>()

const stages = ref<DealStage[]>([])
const isLoading = ref<boolean>(true)
const searchKeyword = ref<string>('')
const selected = ref()

onMounted(async () => {
  if (props.autofocus) {
    const input = document.getElementById('stageSearch')
    input?.focus()
  }
})

const query = gql`
  query getDealStages(
    $search: String!
    $type: String!
    $offset: Int!
    $limit: Int!
  ) {
    stages: getDealStages(
      search: $search
      type: $type
      offset: $offset
      limit: $limit
    ) {
      id
      stage
    }
  }
`

const { onResult, refetch } = useQuery(query, {
  search: '',
  type: deal.value.type || type.value || '',
  offset: 0,
  limit: 100,
})

onResult((result) => {
  stages.value = result.data?.stages || []
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

function onSelect(stage: DealStage) {
  selected.value = stage
  emit('select', { id: stage.id, value: stage.stage })
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
          v-model="searchKeyword"
          @keyup="search"
          type="search"
          placeholder="search ..."
          autofocus
          id="stageSearch"
        />
      </form>
    </li>
    <li v-if="!isLoading" class="w-full">
      <button
        v-for="stage in stages"
        @click="onSelect(stage)"
        type="button"
        class="flex w-full items-center py-2 px-3 text-[14px] hover:bg-slate-200"
      >
        {{ stage.stage }}
      </button>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
