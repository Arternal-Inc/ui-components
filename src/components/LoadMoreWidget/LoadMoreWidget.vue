<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'load'): void
}>()

const props = withDefaults(
  defineProps<{
    syncing?: boolean
    hasMore?: boolean
    view?: string
    hideEmptyState?: boolean
    hideSyncState?: boolean
  }>(),
  {
    syncing: false,
    hasMore: false,
    view: 'grid',
    hideEmptyState: false,
    hideSyncState: false,
  }
)

const statusText = computed(() => {
  if (props.syncing)
      return 'Loading...'
    else if (props.hasMore)
      return props.hideSyncState ? '' : 'Load More'
    else if (props.hideEmptyState)
      return ''
    else
      return 'No more items'
})

const startLoad = () => {
  if (props.hasMore) emit('load')
}
</script>

<template>
  <div class="LoadMoreWidget" :class="[view, { hasMore: hasMore }]" @click="startLoad">
    <span :class="{ disabled: !hasMore, 'loadMoreText': hasMore && !syncing }">{{ statusText }}</span>
  </div>
</template>

<style scoped>
.LoadMoreWidget {
  vertical-align: top;
  position: relative;
  background: transparent;
  margin-bottom: 36px;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
}

.LoadMoreWidget span {
  text-transform: none;
  color: darkGray;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
.LoadMoreWidget span.loadMoreText:hover {
  color: #2F80ED;
}
.LoadMoreWidget span:disabled {
  color: darkGray;
  opacity: 0.6;
  cursor: default;
}

.LoadMoreWidget.grid {
  display: inline-block;
  margin-right: 10px;
  padding-bottom: 10px;
  width: 264px;
  height: 250px;
  border: 2px solid transparent;
}

.LoadMoreWidget.list {
  box-sizing: border-box;
  padding: 15px 0;
  height: 60px;
}

.LoadMoreWidget.hasMore {
  cursor: pointer;
}

.LoadMoreWidget.hasMore:hover span {
  color: #2F80ED;
}
</style>
