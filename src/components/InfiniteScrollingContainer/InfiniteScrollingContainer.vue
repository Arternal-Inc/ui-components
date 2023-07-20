<script lang="ts">
  import LoadMoreWidget from '@/components/LoadMoreWidget'
  import VirtualList from 'vue-virtual-scroll-list'
  import Vue from 'vue'

  export default Vue.extend({
    name: 'InfiniteScrollingContainer',
    components: { LoadMoreWidget, VirtualList },
    props: {
      externalScroll: {
        type: Number,
        default: 0.
      },
      syncOffset: {
        type: Number,
        default: 200,
      },
      view: {
        type: String,
        default: 'list',
      },
      rowHeight: {
        type: Number,
        default: 30,
      },
      count: {
        type: Number,
        default: 0,
      },
      available: {
        type: Number,
        default: 0,
      },
      syncing: {
        type: Boolean,
        default: false,
      },
      noLoading: {
        type: Boolean,
        default: false,
      },
      hideEmptyState: {
        type: [Boolean, String],
        default: null,
      },
      novirtualList: {
        type: String,
        default: null,
      },
      maxHeightVirtualList: {
        type: String,
        default: null,
      },
    },
    data: () => {
      return {
        viewportHeight: 0,
        viewportWidth: 0,
        scroll: 0,
      }
    },
    mounted() {
      this.viewportWidth = this.$refs.container?.clientWidth
      this.viewportHeight = this.$refs.container?.clientHeight
    },
    computed: {
      moreItems(): Boolean {
        return this.available > this.count && !this.noLoading
      },
      target(): Number {
        return (this.rowHeight * this.count) - (this.viewportHeight + this.syncOffset)
      },
      numShownItems(): Number {
        if (this.viewportHeight)
          return Math.round(this.viewportHeight / this.rowHeight)
        else return 9
      },
    },
    watch: {
      scroll(scroll: Number) {
        if (this.syncing || !this.moreItems) return
        if (scroll > this.target)
          this.loadMore()
      },
      syncing(syncing: Boolean) {
        if (syncing || !this.moreItems) return
        if (this.scroll > this.target)
          this.loadMore()
      },
      externalScroll(scroll: Number) {
        this.setScroll({ srcElement: { scrollTop: scroll }})
      },
    },
    methods: {
      setScroll(event: Event): void {
        if (event?.target instanceof HTMLElement)
          this.scroll = event?.target?.scrollTop ?? 0
      },
      loadMore(): void {
        if (!this.noLoading) this.$emit('loadMore')
      },
    },
  })
</script>

<template>
  <div ref="container" class="InfiniteScrollingContainer">
    <VirtualList class="virtualList"
      v-if="!this.novirtualList"
      :size="this.rowHeight"
      :remain="this.numShownItems"
      :onscroll="this.setScroll"
      :class="{ maxHeight: this.maxHeightVirtualList }"
    >
      <slot />
      <LoadMoreWidget
        :hideEmptyState="this.hideEmptyState"
        :view="this.view"
        :syncing="this.syncing"
        :hasMore="this.moreItems"
        @load="this.loadMore"
      />
    </VirtualList>

    <div v-else class="noVirtualList">
      <slot />
      <LoadMoreWidget
        :hideEmptyState="this.hideEmptyState"
        :view="this.view"
        :syncing="this.syncing"
        :hasMore="this.moreItems"
        @load="this.loadMore"
      />
    </div>
  </div>
</template>

<style scoped>
  .InfiniteScrollingContainer {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 60px;
  }

  .virtualList {
    overflow-x: hidden;
  }

  .virtualList.maxHeight {
    height: 100% !important;
  }
</style>
