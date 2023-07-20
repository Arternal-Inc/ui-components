<script lang='coffee'>
  LoadingSpinner = require '@/components/LoadingSpinner'

  exports.default =
    name: 'LoadMoreWidget'
    components: { LoadingSpinner }
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

<template lang='pug'>
  .LoadMoreWidget(:class = '[view, { hasMore: hasMore }]', @click = 'startLoad')
    i.mdi.mdi-loading.mdi-spin(v-if="syncing")
      p loading...
    span(v-else :class = '{ disabled: !hasMore }') {{ statusText }}
</template>

<style lang='stylus' scoped>
  @import '~assets/styles/theme'

  .LoadMoreWidget
    vertical-align top
    position relative
    background transparent
    margin-bottom 36px
    border-radius 5px
    opacity 1
    text-align center

    i
      font-size 2rem
      actionText()
      p
        actionText()
        margin 5px 0
        font-size 15px
        text-transform lowercase

    span
      actionText()
      align both
      font-weight 600
      text-transform none

    &.grid
      display inline-block
      margin-right 10px
      padding-bottom 10px
      width 264px
      height 250px
      border 2px solid transparent

    &.list
      box-sizing border-box
      padding 15px 0
      center(100%)
      height 60px

    &.hasMore
      cursor pointer

      &:hover span
        color accent

</style>
