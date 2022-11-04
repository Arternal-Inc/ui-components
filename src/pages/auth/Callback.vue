<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useFullStory } from '@/plugins/fullstory'
import { useModelClient } from '@/plugins/model'
// import { useAccountModel } from '@/models'
// import { Loading } from '@/components'
import { cleanJoin } from '@/utils'

const router = useRouter()
const { handleRedirectCallback } = useAuth0()
const fullStory = useFullStory()

const modelClient = useModelClient()
// const accountModel = useAccountModel(modelClient)

const res = await handleRedirectCallback()

// const account = await accountModel.get()

// fullStory.identify(account.id, {
//   displayName: cleanJoin([account.firstName, account.lastName]),
//   email: account.email,
// })

// TODO: wait for this PR https://github.com/auth0/auth0-spa-js/pull/885
//       otherwise create top-level domain cookie here

router.replace(res.appState?.target ?? { name: 'DealDashboard' })
</script>

<template>
  <div class="mx-auto max-w-md rounded border p-5">
    <header class="mb-8 text-center">
      <h1>{{ $t('pages.callback.title') }}</h1>
    </header>

    <hr class="mb-8" />

    <div class="mb-3 flex items-center justify-center">
      <Loading class="mr-2" />
      <div>{{ $t('messages.wait') }}</div>
    </div>
  </div>
</template>
