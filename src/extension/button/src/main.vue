<template>
  <button
    class="ph-btn ph-btn--ripple"
    :class="{ active: active }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PhButton',

  data() {
    return {
      active: false,
    }
  },

  methods: {
    handleClick(ev) {
      this.active = true
      setTimeout(() => {
        this.active = false
      }, 300)
      this.$emit('click', ev)
    },
  },
}
</script>

<style lang="scss">
.ph-btn {
  cursor: pointer;
  border: 1px solid #ddd;

  &:focus {
    outline: 0;
  }
}

.ph-btn--ripple {
  padding: 1.5rem;
  border-radius: 50%;
  border-color: transparent;
  background: #f0f0f0;
  color: #666;
  transition: background-color 0.1s, color 0.1s;
  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: #ddd;
  }

  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    bottom: -20px;
    right: -20px;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 50%;
    z-index: -1;
    opacity: .8;
    transform: scale3d(0.5, 0.5, 1);
  }

  &.active {
    transition: background-color 0.1s 0.1s, color 0.1s 0.1s;
    background-color: #cfcfcf;
    animation: anim-ripple-1 0.3s forwards;
  }

  &.active:before {
    animation: anim-ripple-2 0.3s forwards;
  }
}

@keyframes anim-ripple-1 {
  60% {
    transform: scale3d(0.8, 0.8, 1);
  }
  85% {
    transform: scale3d(1.1, 1.1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes anim-ripple-2 {
  to {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}
</style>
