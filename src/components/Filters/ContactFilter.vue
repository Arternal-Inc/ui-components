<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import gql from 'graphql-tag'
import { Contact } from '@@/types'
import { useQuery } from '@vue/apollo-composable'

const emit = defineEmits<{
  (e: 'select', value: Contact): void
}>()

const props = defineProps<{
  autofocus?: boolean
  isCodeName?: Boolean
}>()

const contacts = ref<any[]>()
const isLoading = ref<boolean>(true)
const searchKeyword = ref<string>('')
const selected = ref()
const input = ref<HTMLElement>()

onMounted(async () => {
  if (props.autofocus) {
    input.value?.focus()
  }
})

let query: any

if (!props.isCodeName) {
  query = gql`
    query searchContactsByName($search: String!, $offset: Int!, $limit: Int!) {
      contacts: searchContactsByName(
        search: $search
        offset: $offset
        limit: $limit
      ) {
        id
        display_name
        image_url
      }
    }
  `
} else {
  query = gql`
    query searchContactsByCodeName(
      $search: String!
      $offset: Int!
      $limit: Int!
    ) {
      contacts: searchContactsByCodeName(
        search: $search
        offset: $offset
        limit: $limit
      ) {
        id
        image_url
        code_name
      }
    }
  `
}

const { onResult, refetch } = useQuery(query, {
  search: '',
  offset: 0,
  limit: 10,
})

onResult((result: any) => {
  contacts.value = result.data?.contacts || []
  isLoading.value = false
})

function search() {
  // if the keyword is 2 chars or less
  if (!searchKeyword.value.length) {
    return
  }

  // @ts-ignore
  refetch({ search: searchKeyword.value })
}

function onSubmit(e: any) {
  e.preventDefault()

  // @ts-ignore
  refetch({ search: searchKeyword.value })

  return false
}

function onSelect(contact: Contact) {
  selected.value = contact
  emit('select', contact)
}

function clear(e: any) {
  // @ts-ignore
  refetch({ search: '' })
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
          @keyup.esc="clear"
          type="search"
          placeholder="search ..."
          autofocus
          ref="input"
        />
      </form>
    </li>
    <li v-if="!isLoading" class="w-full">
      <button
        v-for="contact in contacts"
        @click="onSelect(contact)"
        type="button"
        class="flex w-full items-center truncate py-2 px-3 text-[16px] hover:bg-slate-200"
      >
        <img
          v-if="contact.image_url"
          class="mr-2 h-6 w-6 rounded-full border border-gray-300"
          :src="contact.image_url"
          loading="lazy"
        />
        <UserCircleIcon v-else class="mr-2 w-6" />
        {{ contact.display_name ?? contact.code_name }}
      </button>
    </li>
    <li v-else-if="!isLoading && !contacts?.length">
      <div class="p-3 text-center">no results found</div>
    </li>
    <li v-else>
      <div class="p-3 text-center">loading...</div>
    </li>
  </ul>
</template>
