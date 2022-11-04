<script lang="ts" setup>
import { Head } from '@vueuse/head'
import { useAuth0 } from '@auth0/auth0-vue'
import { useMixpanel } from '@/plugins/mixpanel'

const { loginWithRedirect } = useAuth0()
const mixpanel = useMixpanel()

const login = () => {
  mixpanel.track('Sign in')

  loginWithRedirect()
}
</script>

<template>
  <Head>
    <title>{{ $t('pages.signin.title') }} - {{ $t('title') }}</title>
  </Head>

  <div class="mx-auto max-w-md rounded border p-5">
    <header class="mb-8 text-center">
      <img src="@/assets/images/logo-arternal.svg" class="mb-8 inline-block" />

      <h1>{{ $t('pages.signin.title') }}</h1>
    </header>

    <hr class="mb-8" />

    <button variant="primary" class="!block w-full" @click="login">{{
      $t('actions.signin')
    }}</button>
  </div>
</template>
