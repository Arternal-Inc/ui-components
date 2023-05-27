<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import DealStageFilter from '@/components/Filters/DealStageFilter.vue'
import { useDealStore } from '@/stores/deals'
import { storeToRefs } from 'pinia'
import { useMixpanel } from '@/plugins/mixpanel'

const mixpanel = useMixpanel()

const dealStore = useDealStore()
const { deal } = storeToRefs(dealStore)

const props = defineProps<{
  selected: any
}>()

const emit = defineEmits<{
  (e: 'updateDeal', target: any, value: any): void
}>()

const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)
const selected = ref(props.selected)

watch(
  () => props.selected,
  (stage) => {
    selected.value = stage
  },
  { immediate: true }
)

onClickOutside(target, () => (isOpen.value = false))

function onSelect(stage: any) {
  mixpanel.track(`${dealType.value} ${stage.value}`)

  isOpen.value = false
  selected.value = stage.value
  let data = JSON.parse(JSON.stringify(deal.value))
  data.current_stage_id = stage.id
  data.stage = stage.value
  deal.value = data

  emit('updateDeal', target.value, stage.value)
}

const dealType = computed(() => {
  let type = deal.value.parent_deal_id ? 'Combined ' : 'Single '

  switch (deal.value.type) {
    case 'buy':
      type += 'Buy'
      break
    case 'sell':
      type += 'Sell'
      break
    case 'fixed_fee':
      type = 'Fixed Fee'
      break
    default:
      type = ''
      break
  }

  return type
})
</script>

<template>
  <div ref="target" class="relative">
    <button
      type="button"
      @click="toggle"
      class="inline-flex w-full items-center rounded border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-600 hover:bg-gray-100"
    >
      <span v-if="selected">{{ selected }}</span>
      <span v-else class="text-slate-400">{{
        $t('deals.selectDealStage')
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
        <DealStageFilter autofocus @select="onSelect" />
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
