<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Head } from '@vueuse/head'
import { useAuth0 } from '@auth0/auth0-vue'
// import { useStore } from '@/store'
// import { sleep } from '@/utils'
// import { Btn, Loading } from '@/components'
import { useMixpanel } from '@/plugins/mixpanel'
import { useFullStory } from '@/plugins/fullstory'

const router = useRouter()
// const store = useStore()
const { logout: authLogout } = useAuth0()
const mixpanel = useMixpanel()
const fullStory = useFullStory()

// must match one of the "Allowed Logout URLs" in auth0
const returnTo = window.location.origin + router.resolve({ name: 'login' }).path

const loading = ref(false)

const logout = async () => {
  mixpanel.track('Sign out')

  loading.value = true

  // await sleep(500)

  // await store.setAccount(null)

  // clear the user session created by fullstory.identity()
  fullStory.anonymize()

  await authLogout({ returnTo })

  loading.value = false
}
</script>

<template>
  <Head>
    <title>{{ $t('pages.signout.title') }} - {{ $t('title') }}</title>
  </Head>

  <div class="mx-auto max-w-md rounded border p-5 text-center">
    <header class="mb-8">
      <img src="@/assets/images/logo-arternal.svg" class="mb-8 inline-block" />

      <h1>{{ $t('pages.signout.title') }}</h1>
    </header>

    <p class="mb-8">{{ $t('pages.signout.confirm') }}</p>

    <hr class="mb-8" />

    <button
      variant="danger"
      class="!block w-full"
      :disabled="loading"
      @click="logout"
    >
      <Loading v-if="loading" />
      {{ $t('actions.signoutConfirm') }}
    </button>
  </div>
</template>
