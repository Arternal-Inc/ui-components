<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronRightIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { Contact } from '@@/types'
import ContactFilter from '@/components/Filters/ContactFilter.vue'
import { useMixpanel } from '@/plugins/mixpanel'
import { useDealStore } from '@/stores/deals'
import { storeToRefs } from 'pinia'

const mixpanel = useMixpanel()

const dealStore = useDealStore()
const { deal } = storeToRefs(dealStore)

const props = defineProps<{
  selected?: any
  isCodeName: Boolean
  customName?: string
  fieldName: string
  displayName?: string
  codeDisplayName?: string
  imageUrl?: string
}>()

const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)
const target = ref(null)
const selected = ref(props.selected)
const isCodeName = ref(props.isCodeName)

const displayName = ref(props.displayName)
const codeDisplayName = ref(props.codeDisplayName)
const imageUrl = ref(props.imageUrl)

const emit = defineEmits<{
  (e: 'updateDeal', target: any, contact: any): void
}>()

onClickOutside(target, () => (isOpen.value = false))

function onSelect(contact: Contact) {
  if (['buy', 'sell'].includes(deal.value.type ?? '')) {
    let label = props.fieldName
    if (label.includes('Buyer')) label = 'Buyer'
    else if (label === 'Seller (Name on invoice)') label = 'Seller on invoice'

    mixpanel.track(`Create a Deal ${label}`)
  }

  isOpen.value = false
  selected.value = contact.id
  displayName.value = contact.display_name
  codeDisplayName.value = contact.code_name
  imageUrl.value = contact.image_url
  emit('updateDeal', target.value, contact)
}

function openContact() {
  if (!selected) return

  mixpanel.track('Deal Form Go To Contact Button')

  const domain = import.meta.env.VITE_CRM_URL
  window.open(domain + `contacts/${selected.value}`, '_blank')
}
</script>

<template>
  <div class="relative flex items-center gap-x-2">
    <div ref="target" class="relative grow" :id="customName">
      <button
        type="button"
        @click="toggle"
        class="inline-flex w-full items-center rounded border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-400 hover:bg-gray-100"
      >
        <UserCircleIcon v-if="!imageUrl" class="mr-2 w-6" />
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="mr-2 h-6 w-6 rounded-full border border-gray-300"
          loading="lazy"
        />
        <span v-if="displayName && !isCodeName" class="text-black">{{
          displayName
        }}</span>
        <span v-else-if="codeDisplayName && isCodeName" class="text-black">{{
          codeDisplayName
        }}</span>
        <span v-else>{{ $t('deals.selectContact') }}</span>
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
          <ContactFilter
            :isCodeName="isCodeName"
            autofocus
            @select="onSelect"
          />
        </div>
      </Transition>
    </div>

    <button
      type="button"
      class="tooltip-trigger overflow-visible rounded border border-solid border-slate-300 p-1 text-slate-300 hover:border-transparent hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-300"
      :disabled="!selected"
      @click="openContact()"
    >
      <ChevronRightIcon class="h-3.5 w-3.5 stroke-[2.5]" />
      <div
        v-if="selected"
        class="tooltip invisible absolute right-[-40px] top-12 z-20 whitespace-nowrap rounded bg-black py-1 px-2 text-sm"
      >
        {{ $t('actions.goContact') }}
      </div>
    </button>
  </div>
</template>

<style scoped>
:deep(input[type='search']) {
  padding: 7px 10px 7px 30px;
  border-radius: 7px;
}

.tooltip-trigger:hover .tooltip {
  visibility: visible;
}
</style>
