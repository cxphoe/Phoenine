<template>
  <div
    ref="sidebar"
    class="ph-sidebar"
    :class="{
      attach: isAttached,
      open: open,
    }"
    :style="{
      'z-index': isAttached ? baseIndex : '',
    }"
  >
    <div
      ref="layer"
      v-if="cover"
      class="ph-sidebar-layer"
      :class="{ cover: open && closable }"
      @click="handleLayerClick"
    ></div>
    <slot name="icon">
      <template v-if="closable">
        <div
          ref="attach-icon"
          v-if="isAttached"
          class="ph-sidebar-attach-icon"
          :class="{ open: open }"
          @click="handleIconClick"
        >
          <ph-arrow-icon
            class="ph-sidebar-attach-indicator"
            initStatus="right"
            activeStatus="left"
            :active="open"
          ></ph-arrow-icon>
        </div>
        <ph-menu-icon
          ref="default-icon"
          v-else
          class="ph-sidebar-default-icon"
          v-model="open"
        ></ph-menu-icon>
      </template>
    </slot>
    <span
      ref="close-btn"
      v-if="!attach"
      class="ph-sidebar-close-btn"
      :class="{ open: open }"
      @click="handleIconClick"
    >
      <ph-arrow-icon initStatus="left"></ph-arrow-icon>
    </span>
    <aside
      ref="aside"
      class="ph-sidebar-content"
      :class="{
        attach: isAttached,
        open: open,
      }"
      @click="handleAsideClick"
    >
      <slot></slot>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'PhSidebar',

  componentName: 'PhSidebar',

  data() {
    return {
      active: !this.closable,
      hasCustomizedIcon: false,
    }
  },

  props: {
    closable: Boolean,
    cover: Boolean,
    attach: Boolean,
    zBaseIndex: [String, Number],
  },

  computed: {
    isAttached() {
      return this.attach && !this.$slots.icon
    },

    open: {
      get() {
        return this.closable ? this.active : true
      },
      set(val) {
        if (this.closable) {
          this.active = val
        }
      },
    },

    baseIndex() {
      let index = this.zBaseIndex
      let type = typeof index

      if (type === 'string') {
        let i = +index
        if (typeof i === 'number') {
          return i
        }
      } else if (type === 'number') {
        return index
      }
      return 1000
    },
  },

  methods: {
    findCustomizedIcon() {
      let iconSlot = this.$slots.icon
      if (iconSlot === undefined) {
        return null
      }

      let icon = iconSlot[0]
      return icon
        ? icon.$el || icon.elm
        : null
    },

    handleItemClick() {
      this.open = false
      this.$emit('item-click')
    },

    handleLayerClick(ev) {
      this.open = false
    },

    handleAsideClick(ev) {
      if (ev.target === this.$refs.aside) {
        this.$emit('aside-click')
      }
    },

    handleIconClick() {
      this.open = !this.open
    },
  },

  created() {
    this.$on('__item-click', this.handleItemClick)
  },

  mounted() {
    let i = this.baseIndex

    let $cIcon = this.findCustomizedIcon()
    if ($cIcon) {
      $cIcon.onclick = this.handleIconClick
      $cIcon.style.cursor = 'pointer'
    }

    let $refs = this.$refs
    let orderedList = [
      $refs.layer,
      $refs['attach-icon'],
      $refs['default-icon'] && $refs['default-icon'].$el,
      $refs.aside,
    ]

    for (let $el of orderedList) {
      if ($el) {
        $el.style['z-index'] = i++
      }
    }
  },
}
</script>

<style lang="scss">
$open-width: 280px;
$open-width-md: 16pc;
$attach-open-width: 16rem;
$transition-time: .4s;

.ph-sidebar {
  &.attach {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    &.open {
      width: 100%;

      &:after {
        left: $attach-open-width;
      }
    }

    &:after {
      transition: $transition-time;
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      box-shadow: 2px 0 15px 2px rgba(0, 0, 0,.35);
      left: 0;
    }
  }
}

.ph-sidebar-layer {
  position: absolute;
  width: 0;
  top: 0;
  left: 0;
  height: 100%;

  &.cover {
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
  }
}

.ph-sidebar-default-icon {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: #fff;
}

.ph-sidebar-attach-icon {
  transition: $transition-time;
  cursor: pointer;
  padding: 2.5rem 1.25rem;
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  left: -1.25rem;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 2px 0 15px rgba(0, 0, 0,.35);

  .ph-sidebar-attach-indicator {
    position: absolute;
    left: 1.35rem;
    top: 50%;
    transform: translateY(-50%);
  }

  &.open {
    left: -1.25rem + $attach-open-width;
  }
}

.ph-sidebar-close-btn {
  transition: $transition-time;
  cursor: pointer;
  position: fixed;
  left: -1.5rem;
  top: 2rem;
  opacity: 0;
  padding: 1.5rem;
  border-radius: 50%;
  background-color: #eee;
  z-index: 0;

  & > * {
    padding: 0 !important;
  }

  &.open {
    opacity: 1;
    left: $open-width - 24px;
    z-index: 10000;

    @media screen and (max-width: 768px) {
      left: $open-width-md - 1.5pc;
    }
  }
}

.ph-sidebar-content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  transition: $transition-time;
  box-shadow: 2px 0 15px rgba(0, 0, 0,.35);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;

  &.open, & > * {
    width: $open-width;

    @media screen and (max-width: 768px) {
      width: $open-width-md;
    }
  }

  & > * {
    overflow: hidden;
  }

  &.attach {
    box-shadow: 0 0 0 0 transparent;

    &.open {
      width: $attach-open-width;
    }
  }

  &::-webkit-scrollbar {
    width: .35rem;
    background-color: #f7f8f9;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #b9b8b8;
  }

  &::-webkit-scrollbar-track {
    border-radius: .25rem;
  }
}
</style>
