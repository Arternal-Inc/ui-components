<script lang="coffee">
  LoadMoreWidget = require '@/components/LoadMoreWidget'
  VirtualList = require 'vue-virtual-scroll-list'

  exports.default =
    name: 'InfiniteScrollingContainer'
    components: { LoadMoreWidget, VirtualList }
    props:
      externalScroll:
        type: Number
        default: null
      syncOffset:
        type: Number
        default: 200
      view:
        type: String
        default: 'list'
      rowHeight:
        type: Number
        default: 30
      count:
        type: Number
        default: 0
      available:
        type: Number
        default: 0
      syncing:
        type: Boolean
        default: false
      noLoading:
        type: Boolean
        default: false
      hideEmptyState:
        type: [Boolean, String]
        default: null
      novirtualList:
        type: String
        default: null
      maxHeightVirtualList:
        type: String
        default: null

    data: ->
      viewportHeight: 0
      viewportWidth: 0
      scroll: 0

    mounted: ->
      @viewportWidth = @$refs.container?.clientWidth
      @viewportHeight = @$refs.container?.clientHeight

    computed:
      moreItems: -> @available > @count and !@noLoading
      target: -> (@rowHeight * @count) - (@viewportHeight + @syncOffset)
      numShownItems: -> if @viewportHeight then Math.round @viewportHeight / @rowHeight else 9

    watch:
      scroll: (scroll) ->
        return if @syncing or not @moreItems
        if scroll > @target
          @loadMore()

      syncing: (syncing) ->
        return if syncing or not @moreItems
        if @scroll > @target
          @loadMore()

      externalScroll: (scroll) -> @setScroll { srcElement: { scrollTop: scroll }}

    methods:
      setScroll: (event) -> @scroll = event?.srcElement?.scrollTop ? 0
      loadMore: -> @$emit 'loadMore' unless @noLoading
</script>

<template>
  <div ref="container" class="InfiniteScrollingContainer">
    <VirtualList class="virtualList"
      v-if="!novirtualList"
      :size="rowHeight"
      :remain="numShownItems"
      :onscroll="setScroll"
      :class="{ maxHeight: maxHeightVirtualList }"
    >
      <slot />
      <LoadMoreWidget
        :hideEmptyState="hideEmptyState"
        :view="view"
        :syncing="syncing"
        :hasMore="moreItems"
        @load="loadMore"
      />
    </VirtualList>

    <div v-else class="noVirtualList">
      <slot />
      <LoadMoreWidget
        :hideEmptyState="hideEmptyState"
        :view="view"
        :syncing="syncing"
        :hasMore="moreItems"
        @load="loadMore"
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
