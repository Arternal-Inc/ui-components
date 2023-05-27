<script setup lang="ts">
import { ref } from 'vue'
import { SelectDropdown } from '@@/types'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useDealStore } from '@/stores/deals'
import { storeToRefs } from 'pinia'
import { useMixpanel } from '@/plugins/mixpanel'

const mixpanel = useMixpanel()

const dealStore = useDealStore()
const { deal } = storeToRefs(dealStore)

const props = withDefaults(
  defineProps<{
    placeholder: string
    options: string
    value: string
    disabled?: boolean
    ibStatus: string[]
    fieldName: string
  }>(),
  {
    options: '',
  }
)

const emit = defineEmits<{
  (e: 'updateDeal', event: any): void
}>()

const selectOptions = ref<SelectDropdown[]>()
const optionName = ref(props.options)

if (props.ibStatus.length > 0) {
  if (deal.value.type === 'buy' && !deal.value.parent_deal_id) {
    optionName.value = props.ibStatus[0]
  } else {
    optionName.value = props.ibStatus[1]
  }
}

const query = gql`
  query getDealCustomField($name: String!) {
    getDealCustomField(name: $name) {
      id
      attributes
    }
  }
`

const { onResult } = useQuery(query, {
  name: optionName,
})

onResult((res) => {
  selectOptions.value = res.data.getDealCustomField?.attributes?.options
})

const onSelect = ($event: any) => {
  if (props.fieldName === 'Probability' && $event.target.value) {
    const prob =
      $event.target.value[0].toUpperCase() + $event.target.value.slice(1)

    mixpanel.track(`Deal Probability ${prob}`)
  } else if (props.fieldName === 'IB Status' && !deal.value.parent_deal_id) {
    const ibStatus = selectOptions.value?.find(
      (option) => option.value === $event.target.value
    )?.name

    mixpanel.track(
      `Single ${deal.value.type === 'buy' ? 'Buy' : 'Sell'} ${ibStatus}`
    )
  }

  emit('updateDeal', $event)
}
</script>

<template>
  <select
    class="text-sm"
    id="select-dropdown"
    :value="value"
    :disabled="disabled"
    @change="onSelect"
  >
    <option selected value="" disabled>{{ placeholder }}</option>
    <option
      v-for="option in selectOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>
