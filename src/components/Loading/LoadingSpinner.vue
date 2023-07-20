<script lang='coffee'>
  Spinner = require 'spin'

  exports.default =
    name: 'loadingSpinner'

    props:
      length:
        type: Number
        default: 6
      width:
        type: Number
        default: 2
      radius:
        type: Number
        default: 6
      lines:
        type: Number
        default: 13

    mounted: ->
      @spinner = new Spinner
        lines: @lines
        length: @length
        width: @width
        radius: @radius
        color: '#777'
        corners: 1
        animation: 'spinner-line-fade-default'
        fadeColor: '#fff'
        direction: 1
        rotate: 0
        speed: 1
        shadow: false
        hwaccel: true

      @spinner.spin @$refs.spinner

</script>

<template lang='pug'>
  .loadingSpinner(ref = 'spinner')
</template>

<style lang='stylus'>
  @import '~theme'

  .loadingSpinner
    display inline-block
    position relative 
    

</style>
