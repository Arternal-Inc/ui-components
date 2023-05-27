<script setup lang="ts">
import { ref } from 'vue'
import { SelectDropdown } from '@@/types'
import gql from 'graphql-tag'
import { useDealStore } from '@/stores/deals'
import { storeToRefs } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/graphql'
import { useMixpanel } from '@/plugins/mixpanel'

provideApolloClient(apolloClient)

const mixpanel = useMixpanel()

const dealStore = useDealStore()
const { deal } = storeToRefs(dealStore)

const props = defineProps<{
  placeholder: string
  options: string
  value: string
}>()

const selectOptions = ref<SelectDropdown[]>()
const optionName = ref(props.options)

const query = gql`
  query getDealCustomField($name: String!) {
    getDealCustomField(name: $name) {
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

const auctionFields = [
  'Auction Title',
  'Auction Date',
  'Lot No.',
  'Estimate',
  'Hammer Price',
  "Buyer's Premium",
  'Overhead Premium (1%)',
  'All-in Price (Hammer + BP)',
  "VAT on Buyer's Premium",
]

const financialFields = ['Asking Price', 'Sold Price']

const deepReplace = (obj: any, id: any, value: any) => {
  for (const item in obj) {
    for (const section of obj[item].sections) {
      for (const field of section.fields) {
        if (field.id == id) {
          field.value = value
        }
        if (financialFields.includes(field.label)) {
          if (value === 'auction') {
            field.containerClass = 'hidden'
          } else field.containerClass = ''
        }
        if (auctionFields.includes(field.label)) {
          if (value !== 'auction') {
            field.containerClass = 'hidden'
          } else field.containerClass = ''
        }
      }
    }
  }
  return obj
}

const updateDeal = async (event: any) => {
  let data = JSON.parse(JSON.stringify(deal.value))

  const id = event.target.id
  const value = event.target.value

  const label = selectOptions.value?.find(
    (option) => option.value === value
  )?.name
  mixpanel.track(`Consignor Type ${label}`)

  deepReplace(data.deal_fields, id, value)
  deal.value = data
}
</script>

<template>
  <select
    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    id="select-dropdown"
    :value="value"
    @change="updateDeal"
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
