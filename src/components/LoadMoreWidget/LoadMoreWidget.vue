<script lang='ts'>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'LoadMoreWidget',
    props: {
      syncing: {
        type: Boolean,
        default: false,
      },
      hasMore: {
        type: Boolean,
        default: false,
      },
      view: {
        type: String,
        default: 'grid',
      },
      hideEmptyState: {
        type: [Boolean, String],
        default: null,
      },
    },
    computed: {
      statusText(): String {
        if (this.syncing)
          return 'Loading...'
        else if (this.hasMore)
          return 'Load More'
        else if (this.hideEmptyState)
          return ''
        else
          return 'No more items'
      },
    },
    methods: {
      startLoad(): void {
        if (this.hasMore) this.$emit('load')
      },
    },
  })
</script>

<template>
  <div class="LoadMoreWidget" :class="[this.view, { hasMore: this.hasMore }]" @click="this.startLoad">
    <i v-if="this.syncing" class="mdi mdi-loading mdi-spin">
      <p>loading...</p>
    </i>
    <span v-else :class="{ disabled: !this.hasMore }">{{ this.statusText }}</span>
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
