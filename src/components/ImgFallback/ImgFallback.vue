<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'

const attrs = useAttrs()

const showOriginal = ref(true)

watch(
  () => attrs.src,
  () => (showOriginal.value = true)
)

const onError = () => {
  showOriginal.value = false
}
</script>

<template>
  <component
    :is="showOriginal ? 'img' : 'div'"
    height="1"
    width="1"
    :class="{ 'bg-gray-200': !showOriginal }"
    @error="onError"
  />
</template>
