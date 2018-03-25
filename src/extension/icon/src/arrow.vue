<template>
  <span
    class="ph-arrow-icon"
    :class="active ? activeStatus : initStatus"
  >
    <span></span>
    <span></span>
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
  },
}
</script>

<style lang="scss">
.ph-arrow-icon {
  span {
    transition: .5s;
    border-top: 2px solid rgba(0, 0, 0, .6);
    width: .5rem;
    display: block;

    &:first-child {
      position: absolute;
    }

    &:last-child {
      position: relative;
    }
  }

  &.down, &.up {
    span:first-child {
      left: -3px;
    }

    span:last-child {
      left: 3px;
    }
  }

  &.left, &.right {
    span:first-child {
      top: -3px;
    }

    span:last-child {
      top: 3px;
    }
  }

  &.down, &.right {
    span:first-child {
      transform: rotate(45deg);
    }

    span:last-child {
      transform: rotate(-45deg);
    }
  }

  &.up, &.left {
    span:first-child {
      transform: rotate(-45deg);
    }

    span:last-child {
      transform: rotate(45deg);
    }
  }
}
</style>
