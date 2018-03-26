<template>
  <div
    ref="sidebar"
    class="ph-sidebar"
    :class="{
      attach: attach,
      cover: (open && cover && closable),
      open: open,
    }"
    @click="handleLayerClick"
  >
    <slot name="icon">
      <template v-if="closable">
        <div
          ref="attach-icon"
          v-if="attach"
          class="ph-sidebar-attach-icon"
          :class="{ open: open }"
          @click="handleIconClick"
        >
          <ph-arrow-icon
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
      v-if="$slots.icon"
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
        attach: attach,
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
    }
  },

  props: {
    closable: Boolean,
    cover: Boolean,
    attach: Boolean,
    zBaseIndex: [String, Number],
  },

  computed: {
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
    handleItemClick() {
      this.open = false
      this.$emit('item-click')
    },

    handleLayerClick(ev) {
      if (ev.target === this.$el) {
        this.open = false
      }
    },

    handleAsideClick(ev) {
      if (ev.target === this.$refs.aside) {
        this.$emit('aside-click')
      }
    },

    handleIconClick() {
      this.open = !this.open
    },

    setZIndex($el, i) {
      $el.style['z-index'] = i
    },
  },

  created() {
    this.$on('__item-click', this.handleItemClick)
    this.$on('icon-click', this.handleIconClick)
  },

  mounted() {
    let i = this.baseIndex
    let $refs = this.$refs
    this.setZIndex($refs.sidebar, i++)
    this.setZIndex($refs.aside, i++)
    if ($refs['default-icon']) {
      this.setZIndex($refs['default-icon'].$el, i++)
    }
    if ($refs['attach-icon']) {
      this.setZIndex($refs['attach-icon'], i++)
    }
    if ($refs['close-btn']) {
      this.setZIndex($refs['close-btn'], i++)
    }
  },
}
</script>

<style lang="scss">
$open-width: 280px;
$open-width-md: 16pc;
$attach-open-width: 16rem;
$transition-time: .5s;

.ph-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;

  &.attach:after {
    transition: $transition-time;
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    box-shadow: 2px 0 15px 2px rgba(0, 0, 0,.35);
    background-color: red;
    z-index: 900;
    left: 0;
  }

  &.cover {
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
  }

  &.open:after {
    left: $attach-open-width;
  }
}

.ph-sidebar-default-icon {
  position: absolute;
  left: 1.5rem;
  top: 2.3rem;
}

.ph-sidebar-attach-icon {
  transition: $transition-time;
  cursor: pointer;
  padding: 3rem 1.5rem;
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  left: -1.5rem;
  top: 50%;
  transform: translateY(-50%);
  box-shadow:
    0 0 0 0 transparent,
    0 0 0 0 transparent,
    2px 0 15px rgba(0, 0, 0,.35);

  & > * {
    position: absolute;
    left: 2rem;
  }

  &.open {
    left: -1.5rem + $attach-open-width;
  }
}

.ph-sidebar-close-btn {
  transition: $transition-time;
  cursor: pointer;
  position: absolute;
  left: -3rem;
  top: 2rem;
  padding: 1.5rem;
  border-radius: 50%;
  background-color: #eee;

  & > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.open {
    left: $open-width - 24px;

    @media screen and (max-width: 768px) {
      left: $open-width-md - 1.5pc;
    }
  }
}

.ph-sidebar-content {
  transition: $transition-time;
  position: absolute;
  box-shadow: 2px 0 15px rgba(0, 0, 0,.35);
  top: 0;
  bottom: 0;
  width: 0;
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
