<script setup lang="ts">
import { computed } from 'vue'
import { ImgFallback } from '@/components'
import { thumbnailUrl } from '@/utils'

const props = withDefaults(
  defineProps<{
    src: string
    thumbnailWidth?: number | string
    thumbnailHeight?: number | string
  }>(),
  {
    thumbnailWidth: 256,
    thumbnailHeight: 256,
  }
)

const _width = computed(() => parseInt(props.thumbnailWidth.toString()))
const _height = computed(() => parseInt(props.thumbnailHeight.toString()))

const src = computed(() =>
  thumbnailUrl(
    props.src,
    import.meta.env.VITE_THUMBNAIL_BASE_URL,
    _width.value,
    _height.value
  )
)
</script>

<template>
  <ImgFallback :src="src" loading="lazy" />
</template>
