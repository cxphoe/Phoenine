<template>
  <aside class="p-aside hidden br bw1 b-gray pt4">
    <div class="mb4 ml-0 mt-0">
      <ph-checkbox-group
        v-model="checkList"
        @input=hangleInput>
        <ph-checkbox
          class="ma0 ph5 pv2 fw6 lh-title hover-bg-white hover-blue w-100"
          v-for="item in items"
          :key=item
          :label=item
          activeBgColor=white
        ></ph-checkbox>
      </ph-checkbox-group>
    </div>
  </aside>
</template>

<script>
import Bus from '../../bus'

export default {
  name: 'PageAside',

  data() {
    return {
      checkList: [],
    }
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    Bus.$on('item-remove', (tag) => {
      let i = this.checkList.indexOf(tag)
      this.checkList.splice(i, 1)
    })
  },

  methods: {
    hangleInput(checkList) {
      this.$emit('input', [...checkList])
    }
  }
}
</script>

<style lang="scss">
.p-aside {
  width: 16rem;
  background-color: $color-light;
}

@media screen and (max-width: 1046px) {
  .hidden {
    display: none;
  }
}
</style>
