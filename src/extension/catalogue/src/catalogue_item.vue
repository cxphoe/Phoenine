<template>
  <span
    class="ph-catalogue-item"
    @click="handleClick"
  >{{ title }}</span>
</template>

<script>
import { scrollTo } from '../../../utils/position'

export default {
  name: 'PhCatalogueItem',

  componentName: 'PhCatalogueItem',

  props: {
    level: {
      type: [String, Number],
      default: 1,
    },
    title: {
      type: String,
      default: '--',
    },
    id: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleClick() {
      scrollTo(document.getElementById(this.id))
    },
  },
}
</script>

<style lang="scss">
$a-color: rgba(#000, .8);

.ph-catalogue-item {
  cursor: pointer;
  color: $a-color;
  font-size: 15px;
  line-height: 15px;
  margin: .25rem 0;

  &:hover {
    text-decoration-line: underline;
  }
}
</style>
