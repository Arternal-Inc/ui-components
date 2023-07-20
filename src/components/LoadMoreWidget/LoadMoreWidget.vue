<script lang='coffee'>
  exports.default =
    name: 'LoadMoreWidget'
    props:
      syncing:
        type: Boolean
        default: false
      hasMore:
        type: Boolean
        default: false
      view:
        type: String
        default: 'grid'
      hideEmptyState:
        type: [Boolean, String]
        default: null

    computed:
      statusText: ->
        if @syncing
          'Loading...'
        else if @hasMore
          'Load More'
        else if @hideEmptyState
          ''
        else
          'No more items'

    methods:
      startLoad: -> @$emit 'load' if @hasMore

</script>

<template>
  <div class="LoadMoreWidget" :class="[view, { hasMore: hasMore }]" @click="startLoad">
    <i v-if="syncing" class="mdi mdi-loading mdi-spin">
      <p>loading...</p>
    </i>
    <span v-else :class="{ disabled: !hasMore }">{{ statusText }}</span>
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

  .LoadMoreWidget i {
    font-size: 2rem;
    text-transform: uppercase;
    color: darkGray;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
  .LoadMoreWidget i:hover {
    color: #2F80ED;
  }
  .LoadMoreWidget i:disabled {
    color: darkGray;
    opacity: 0.6;
    cursor: default;
  }

  .LoadMoreWidget i p {
    margin: 5px 0;
    font-size: 15px;
    text-transform: lowercase;
    color: darkGray;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
  .LoadMoreWidget i p:hover {
    color: #2F80ED;
  }
  .LoadMoreWidget i p:disabled {
    color: darkGray;
    opacity: 0.6;
    cursor: default;
  }

  .LoadMoreWidget span {
    text-transform: none;
    color: darkGray;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
  .LoadMoreWidget span:hover {
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
