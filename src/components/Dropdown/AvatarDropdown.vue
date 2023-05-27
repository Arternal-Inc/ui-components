<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from 'flowbite-vue'
import { onClickOutside } from '@vueuse/core'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth0()

const router = useRouter()
const env = import.meta.env
const target = ref(null)
const isOpen = ref<boolean>(false)
const toggle = () => (isOpen.value = !isOpen.value)

onClickOutside(target, () => (isOpen.value = false))

async function authLogout() {
  const returnTo = window.location.origin + router.resolve({ name: 'login' }).path
  await logout({ logoutParams: { returnTo } })
  // router.push({ name: 'login' })
}
</script>

<template>
  <div ref="target" class="flex items-end relative">
    <button type="button" @click="toggle" class="w-[49px] border-0 mx-1.5 focus:border-0">
      <Avatar
        :rounded="true"
        :initials="user.nickname"
        :img="user.picture"
        class="avatar"
      />
    </button>
    <!-- Dropdown menu -->

    <Transition>
      <div
        v-if="isOpen"
        class="z-10 w-44 bg-zinc-800 rounded divide-y divide-gray-100 shadow ml-2 -mb-1"
      >
        <ul class="py-1 text-sm text-gray-300 text-left">
          <li>
            <a
              :href="env.VITE_CRM_URL + '/settings/profile'"
              class="block py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >Settings</a
            >
          </li>
          <li>
            <a
              :href="env.VITE_CRM_URL + '/dashboard/import-export'"
              class="block py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >Import / Export</a
            >
          </li>
          <!-- <li>
          <a
            href="//sync.arternal.com/"
            target="_blank"
            class="block py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
            >Contact Sync Portal</a
          >
        </li> -->
          <li>
            <a
              href="//intercom.help/arternal/en/"
              target="_blank"
              class="block py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >Help Center</a
            >
          </li>
          <li>
            <a
              href="//intercom.help/arternal/en/articles/4785386-arternal-release-notes"
              target="_blank"
              class="block py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >What's New?</a
            >
          </li>
          <li>
            <button
              type="button"
              @click="authLogout()"
              class="text-left w-full py-2 px-4 hover:bg-zinc-700 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
:deep(.avatar) {
  border-radius: 100%;
  border: 2px solid #fcfcfc;
  padding: 2px;
  overflow: hidden;
}
:deep(.avatar img) {
  height: 43px !important;
  width: 43px !important;
}
</style>
