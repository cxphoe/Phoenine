<template>
  <span
    class="ph-arrow-icon"
    :class="active ? activeStatus : initStatus"
    @click="handleClick"
  >
    <span :style="{ borderColor: color }"></span>
    <span :style="{ borderColor: color }"></span>
  </span>
</template>

<script>
export default {
  name: 'PhArrowIcon',

  props: {
    initStatus: {
      type: String,
      default: 'down',
    },
    activeStatus: String,
    active: Boolean,
    color: String,
  },

  methods: {
    handleClick(ev) {
      this.$emit('click', ev)
    },
  },
}
</script>

<style lang="scss">
.ph-arrow-icon {
  padding: .5rem;
  position: relative;

  span {
    transition: .5s;
    border-top: 2px solid rgba(0, 0, 0, .6);
    width: .5rem;
    display: block;
    position: absolute;
  }

  &.down, &.up {
    span:first-child {
      left: calc(50% - 3px);
    }

    span:last-child {
      left: calc(50% + 3px);
    }
  }

  &.left, &.right {
    span:first-child {
      top: calc(50% - 3px);
    }

    span:last-child {
      top: calc(50% + 3px);
    }
  }

  &.down, &.right {
    span:first-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    span:last-child {
      transform: translate(-50%, -50%)rotate(-45deg);
    }
  }

  &.up, &.left {
    span:first-child {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    span:last-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
