<template>
  <div class="flex mv-5">
    <i
      class="el-icon-loading mh-auto"
      :style="{ fontSize, color }"
    ></i>
  </div>
</template>

<script>
const sizeMappings = {
  'xs': '.8rem',
  'sm': '1rem',
  'md': '1.5rem',
  'lg': '2rem',
  'xl': '3rem',
}

export default {
  name: 'Loading',

  props: {
    size: {
      type: [String, Number],
      default: 'sm',
    },
    color: String,
  },

  computed: {
    fontSize() {
      let d = '1rem'
      let st = typeof this.size
      return st === 'string'
        ? (sizeMappings[this.size] || d)
        : (st === 'number')
          ? this.size + 'px'
          : d
    },
  },
}
</script>
