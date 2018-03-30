<template>
  <span
    class="ph-menu-icon"
    :class="{ active: isActived }"
    @click="handleClick"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </span>
</template>

<script>
export default {
  name: 'PhMenuIcon',

  data() {
    return {
      open: false,
    }
  },

  props: {
    value: {},
  },

  computed: {
    isActived() {
      return this.value === undefined ? this.open : this.value
    },
  },

  methods: {
    handleClick() {
      this.open = !this.isActived
      this.$emit('input', this.open)
    },
  }
}
</script>

<style lang="scss">
$bar-gap: .35rem;

.ph-menu-icon {
  cursor: pointer;

  span {
    transition: .5s;
    border: 1px solid #000;
    width: 1.5rem;
    display: block;
    position: relative;

    &:nth-child(2) {
      position: absolute;
    }

    &:nth-child(2), &:nth-child(3) {
      margin-top: $bar-gap;
    }

    &:last-child {
      width: .75rem;
      margin-top: $bar-gap;
    }
  }

  &.active {
    span {
      &:first-child, &:last-child {
        opacity: 0;
      }

      &:first-child {
        transform: translateY(-25px);
      }

      &:last-child {
        transform: translateY(25px);
      }

      &:nth-child(2) {
        transform: rotate(40deg);
      }

      &:nth-child(3) {
        transform: rotate(-40deg);
      }
    }
  }
}
</style>
