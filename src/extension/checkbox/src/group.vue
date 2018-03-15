<template>
  <div :style="styleObj" role="group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'PhCheckboxGroup',

  componentName: 'PhCheckBoxGroup',

  mixins: [Emitter],

  props: {
    value: {},
    textColor: String,
  },

  computed: {
    styleObj() {
      return {
        color: this.textColor,
      }
    },
  },
}
</script>

<style>

</style>
